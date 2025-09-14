import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, relative, dirname } from "node:path";
import process from "node:process";

interface ImportMap {
  imports: Record<string, string>;
}

interface SimpleBundle {
  entryPoint: string;
  importMapPath?: string;
  outFile: string;
}

class SimpleBundler {
  private importMap: ImportMap = { imports: {} };
  private processedFiles = new Set<string>();
  private cssModules = new Map<string, string>();

  constructor(private options: SimpleBundle) {
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

  private resolveImport(importPath: string): string {
    // Handle import map resolution
    if (this.importMap.imports[importPath]) {
      const resolved = this.importMap.imports[importPath];
      
      // Convert relative paths to absolute paths
      if (resolved.startsWith('./') || resolved.startsWith('../')) {
        return resolve(process.cwd(), resolved);
      }
      
      return resolved;
    }

    return importPath;
  }

  private readCSSFile(cssPath: string): string {
    try {
      const content = readFileSync(cssPath, 'utf-8');
      // Escape backticks and backslashes for template literals
      return content.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
    } catch (error) {
      console.warn(`Failed to read CSS file ${cssPath}: ${error}`);
      return '';
    }
  }

  private transformFile(filePath: string): string {
    if (this.processedFiles.has(filePath)) {
      return '';
    }
    
    this.processedFiles.add(filePath);
    
    if (!existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return '';
    }

    let content = readFileSync(filePath, 'utf-8');
    let bundledContent = `// File: ${relative(process.cwd(), filePath)}\n`;

    // Transform import statements
    const importRegex = /import\s+([^;]+?)\s+from\s+["']([^"']+?)["'](\s+with\s+\{[^}]*type:\s*["']css["'][^}]*\})?;?/g;
    
    let match;
    const importedModules: string[] = [];
    
    while ((match = importRegex.exec(content)) !== null) {
      const [fullMatch, importSpecifier, modulePath] = match;
      const isCSSImport = fullMatch.includes('type: "css"') || fullMatch.includes("type: 'css'");
      const isTypeOnlyImport = importSpecifier.trim().startsWith('type ');
      
      if (isTypeOnlyImport) {
        // Remove TypeScript type-only imports entirely
        content = content.replace(fullMatch, '');
        continue;
      }
      
      if (isCSSImport) {
        // Handle CSS import
        const resolvedPath = this.resolveImport(modulePath);
        const cssContent = this.readCSSFile(resolvedPath);
        const importName = importSpecifier.trim();
        
        // Replace CSS import with CSSStyleSheet creation
        const cssReplacement = `const ${importName} = (() => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(\`${cssContent}\`);
  return sheet;
})();`;
        
        content = content.replace(fullMatch, cssReplacement);
        this.cssModules.set(modulePath, resolvedPath);
      } else {
        // Handle regular imports
        const resolvedPath = this.resolveImport(modulePath);
        
        // Skip external npm packages
        if (modulePath.startsWith('preact') || 
            modulePath.includes('npm:') || 
            modulePath.includes('jsr:') ||
            (!modulePath.startsWith('./') && !modulePath.startsWith('../') && !modulePath.startsWith('#'))) {
          // Keep external imports as-is
          continue;
        }
        
        // For local modules, add to processing queue
        if (resolvedPath !== modulePath) {
          // Try different extensions for TypeScript files
          let actualPath = resolvedPath;
          if (!existsSync(actualPath)) {
            for (const ext of ['.ts', '.tsx', '.js', '.jsx']) {
              if (existsSync(actualPath + ext)) {
                actualPath = actualPath + ext;
                break;
              }
            }
          }
          
          if (existsSync(actualPath)) {
            importedModules.push(actualPath);
          }
        }
      }
    }

    // Remove TypeScript-specific syntax
    content = this.removeTypeScriptSyntax(content);

    bundledContent += content + '\n\n';

    // Process imported modules recursively
    for (const importedModule of importedModules) {
      bundledContent += this.transformFile(importedModule);
    }

    return bundledContent;
  }

  private removeTypeScriptSyntax(content: string): string {
    // Remove JSX pragma comments
    content = content.replace(/\/\*\*\s*@jsxImportSource[^*]*\*\//g, '');
    
    // Remove type-only imports
    content = content.replace(/import\s+type\s+[^;]+;?\s*/g, '');
    
    // Remove object type annotations in function parameters
    // Pattern: }: { property: Type }
    content = content.replace(/\}\s*:\s*\{[^}]*\}/g, '}');
    
    // Remove simple type annotations like `: Type` but be more careful
    // Only match when followed by comma, closing paren, or equals
    content = content.replace(/:\s*[A-Za-z_][A-Za-z0-9_<>\[\]|&\?\s]*(\s*[,\)=])/g, '$1');
    
    // Remove return type annotations
    content = content.replace(/\)\s*:\s*[A-Za-z_][A-Za-z0-9_<>\[\]|&\s]*(\s*\{)/g, ')$1');
    
    // Fix boolean properties that got their values removed
    content = content.replace(/{ shadow,/g, '{ shadow: true,');
    
    // Clean up extra whitespace
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return content;
  }

  bundle(): string {
    console.log(`Bundling ${this.options.entryPoint}...`);
    
    const bundledCode = this.transformFile(this.options.entryPoint);
    
    // Ensure output directory exists
    const outputDir = dirname(this.options.outFile);
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
    
    // Write output file
    writeFileSync(this.options.outFile, bundledCode);
    
    console.log(`✅ Bundle written to ${this.options.outFile}`);
    console.log(`📊 Bundle size: ${bundledCode.length} characters`);
    console.log(`🎨 CSS modules processed: ${this.cssModules.size}`);
    
    return bundledCode;
  }
}

export { SimpleBundler };