import * as ts from "typescript";
import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname, relative } from "node:path";
import process from "node:process";

interface ImportMap {
  imports: Record<string, string>;
}

interface BundleOptions {
  entryPoint: string;
  importMapPath?: string;
  outFile: string;
  compilerOptions?: ts.CompilerOptions;
}

class TypeScriptBundler {
  private program!: ts.Program;
  private checker!: ts.TypeChecker;
  private importMap: ImportMap = { imports: {} };
  private resolvedModules = new Map<string, string>();
  private cssModules = new Map<string, string>();

  constructor(private options: BundleOptions) {
    this.loadImportMap();
  }

  private loadImportMap() {
    if (this.options.importMapPath && existsSync(this.options.importMapPath)) {
      try {
        const content = readFileSync(this.options.importMapPath, 'utf-8');
        const config = JSON.parse(content);
        this.importMap = { imports: config.imports || {} };
      } catch (error) {
        console.warn(`Failed to load import map: ${error}`);
      }
    }
  }

  private resolveImport(importPath: string, fromFile: string): string {
    // Handle import map resolution
    if (this.importMap.imports[importPath]) {
      const resolved = this.importMap.imports[importPath];
      
      // Convert relative paths to absolute paths
      if (resolved.startsWith('./') || resolved.startsWith('../')) {
        return resolve(process.cwd(), resolved);
      }
      
      return resolved;
    }

    // Handle relative imports
    if (importPath.startsWith('./') || importPath.startsWith('../')) {
      const basePath = dirname(fromFile);
      const resolved = resolve(basePath, importPath);
      
      // Try different extensions
      for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
        if (existsSync(resolved + ext)) {
          return resolved + ext;
        }
      }
      
      return resolved;
    }

    // Return as-is for external modules
    return importPath;
  }

  private createCompilerHost(): ts.CompilerHost {
    const host = ts.createCompilerHost(this.getCompilerOptions());

    host.resolveModuleNames = (moduleNames: string[], containingFile: string) => {
      return moduleNames.map((moduleName) => {
        // Handle external npm packages - skip resolution
        if (moduleName.startsWith('preact') || 
            moduleName.startsWith('npm:') || 
            moduleName.includes('/jsx-runtime') ||
            !moduleName.startsWith('.') && !moduleName.startsWith('#') && !moduleName.startsWith('/')) {
          return undefined;
        }
        
        const resolved = this.resolveImport(moduleName, containingFile);
        
        // Handle CSS modules
        if (resolved.endsWith('.css')) {
          this.cssModules.set(moduleName, resolved);
          return {
            resolvedFileName: resolved,
            isExternalLibraryImport: false,
          } as ts.ResolvedModule;
        }

        // Store resolved module
        this.resolvedModules.set(moduleName, resolved);

        // For TypeScript files, let TypeScript handle resolution
        if (existsSync(resolved)) {
          return {
            resolvedFileName: resolved,
            isExternalLibraryImport: false,
          } as ts.ResolvedModule;
        }

        // External module - return undefined to let TypeScript skip it
        return undefined;
      });
    };

    return host;
  }

  private getCompilerOptions(): ts.CompilerOptions {
    return {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      jsx: ts.JsxEmit.ReactJSX,
      jsxImportSource: "preact",
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      strict: false,
      skipLibCheck: true,
      allowJs: true,
      declaration: false,
      sourceMap: false,
      noEmit: false,
      noResolve: false,
      suppressImplicitAnyIndexErrors: true,
      ...this.options.compilerOptions,
    };
  }

  private transformCSSImports(): ts.TransformerFactory<ts.SourceFile> {
    return (context: ts.TransformationContext) => {
      return (sourceFile: ts.SourceFile) => {
        const visitor = (node: ts.Node): ts.Node => {
          // Handle import declarations
          if (ts.isImportDeclaration(node) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
            const moduleName = node.moduleSpecifier.text;
            
            // Check if this is a CSS import with type assertion
            const isCSSImport = node.attributes?.elements?.some(element => 
              ts.isImportAttribute(element) && 
              element.name.text === "type" &&
              ts.isStringLiteral(element.value) &&
              element.value.text === "css"
            );
            
            if (isCSSImport && this.cssModules.has(moduleName)) {
              const cssPath = this.cssModules.get(moduleName)!;
              const cssContent = this.readCSSFile(cssPath);
              
              // Transform CSS import to CSSStyleSheet creation
              if (node.importClause?.name) {
                const importName = node.importClause.name.text;
                
                // Create variable declaration with CSS content
                const cssStyleSheet = ts.factory.createVariableStatement(
                  undefined,
                  ts.factory.createVariableDeclarationList([
                    ts.factory.createVariableDeclaration(
                      importName,
                      undefined,
                      undefined,
                      ts.factory.createCallExpression(
                        ts.factory.createParenthesizedExpression(
                          ts.factory.createArrowFunction(
                            undefined,
                            undefined,
                            [],
                            undefined,
                            ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
                            ts.factory.createBlock([
                              ts.factory.createVariableStatement(
                                undefined,
                                ts.factory.createVariableDeclarationList([
                                  ts.factory.createVariableDeclaration(
                                    "sheet",
                                    undefined,
                                    undefined,
                                    ts.factory.createNewExpression(
                                      ts.factory.createIdentifier("CSSStyleSheet"),
                                      undefined,
                                      []
                                    )
                                  )
                                ], ts.NodeFlags.Const)
                              ),
                              ts.factory.createExpressionStatement(
                                ts.factory.createCallExpression(
                                  ts.factory.createPropertyAccessExpression(
                                    ts.factory.createIdentifier("sheet"),
                                    "replaceSync"
                                  ),
                                  undefined,
                                  [ts.factory.createStringLiteral(cssContent)]
                                )
                              ),
                              ts.factory.createReturnStatement(
                                ts.factory.createIdentifier("sheet")
                              )
                            ], true)
                          )
                        ),
                        undefined,
                        []
                      )
                    )
                  ], ts.NodeFlags.Const)
                );
                
                return cssStyleSheet;
              }
            }
          }

          return ts.visitEachChild(node, visitor, context);
        };

        return ts.visitNode(sourceFile, visitor) as ts.SourceFile;
      };
    };
  }

  private readCSSFile(cssPath: string): string {
    try {
      return readFileSync(cssPath, 'utf-8');
    } catch (error) {
      console.warn(`Failed to read CSS file ${cssPath}: ${error}`);
      return '';
    }
  }

  private createProgram() {
    const host = this.createCompilerHost();
    const compilerOptions = this.getCompilerOptions();
    
    this.program = ts.createProgram([this.options.entryPoint], compilerOptions, host);
    this.checker = this.program.getTypeChecker();
  }

  private emitBundle(): string {
    const sourceFiles = this.program.getSourceFiles().filter(
      sf => !sf.isDeclarationFile && 
           !sf.fileName.includes('node_modules') &&
           !sf.fileName.includes('typescript/lib')
    );

    let bundledCode = '';
    
    // Process each source file
    for (const sourceFile of sourceFiles) {
      const relativePath = relative(process.cwd(), sourceFile.fileName);
      
      // Skip if this is not part of our project
      if (sourceFile.fileName === this.options.entryPoint || 
          Object.values(this.importMap.imports).some(path => 
            sourceFile.fileName.endsWith(path) || 
            resolve(process.cwd(), path) === sourceFile.fileName
          )) {
        
        const result = ts.transform(sourceFile, [this.transformCSSImports()]);
        const printer = ts.createPrinter({ 
          removeComments: false,
          newLine: ts.NewLineKind.LineFeed
        });
        
        let transformedCode = printer.printFile(result.transformed[0]);
        
        // Remove import declarations for external modules (npm packages)
        transformedCode = transformedCode.replace(
          /import\s+.*?\s+from\s+['"][^'"]*npm:[^'"]*['"];?\s*\n?/g, 
          ''
        );
        
        // Replace import map imports with direct references
        for (const [importName, importPath] of Object.entries(this.importMap.imports)) {
          const regex = new RegExp(`from\\s+['"]${importName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`, 'g');
          transformedCode = transformedCode.replace(regex, `from "./${relative(dirname(this.options.entryPoint), resolve(process.cwd(), importPath))}"`);
        }
        
        bundledCode += `// File: ${relativePath}\n`;
        bundledCode += transformedCode + '\n\n';
        
        result.dispose();
      }
    }

    return bundledCode;
  }

  async bundle(): Promise<string> {
    this.createProgram();
    
    // Check for compilation errors
    const diagnostics = ts.getPreEmitDiagnostics(this.program);
    if (diagnostics.length > 0) {
      const formatHost: ts.FormatDiagnosticsHost = {
        getCanonicalFileName: (fileName: string) => fileName,
        getCurrentDirectory: ts.sys.getCurrentDirectory,
        getNewLine: () => ts.sys.newLine,
      };
      
      const formattedDiagnostics = ts.formatDiagnosticsWithColorAndContext(diagnostics, formatHost);
      console.warn('TypeScript compilation warnings:');
      console.warn(formattedDiagnostics);
    }

    const bundledCode = this.emitBundle();
    
    // Write output file
    await Deno.writeTextFile(this.options.outFile, bundledCode);
    
    return bundledCode;
  }
}

export { TypeScriptBundler, type BundleOptions };