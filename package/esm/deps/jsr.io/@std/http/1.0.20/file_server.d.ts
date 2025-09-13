import * as dntShim from "../../../../../_dnt.shims.js";
/** Options for {@linkcode serveFile}. */
export interface ServeFileOptions {
    /**
     * The algorithm to use for generating the ETag.
     *
     * @default {"SHA-256"}
     */
    etagAlgorithm?: AlgorithmIdentifier;
    /**
     * An optional object returned by {@linkcode Deno.stat}. It is used for
     * optimization purposes.
     *
     * Defaults to the result of calling {@linkcode Deno.stat} with the provided
     * `filePath`.
     */
    fileInfo?: dntShim.Deno.FileInfo;
}
/**
 * Resolves a {@linkcode Response} with the requested file as the body.
 *
 * @example Usage
 * ```ts ignore
 * import { serveFile } from "@std/http/file-server";
 *
 * Deno.serve((req) => {
 *   return serveFile(req, "README.md");
 * });
 * ```
 *
 * @param req The server request context used to cleanup the file handle.
 * @param filePath Path of the file to serve.
 * @param options Additional options.
 * @returns A response for the request.
 */
export declare function serveFile(req: Request, filePath: string, options?: ServeFileOptions): Promise<Response>;
/** Interface for serveDir options. */
export interface ServeDirOptions {
    /** Serves the files under the given directory root. Defaults to your current directory.
     *
     * @default {"."}
     */
    fsRoot?: string;
    /** Specified that part is stripped from the beginning of the requested pathname.
     */
    urlRoot?: string;
    /** Enable directory listing.
     *
     * @default {false}
     */
    showDirListing?: boolean;
    /** Serves dotfiles.
     *
     * @default {false}
     */
    showDotfiles?: boolean;
    /** Serves `index.html` as the index file of the directory.
     *
     * @default {true}
     */
    showIndex?: boolean;
    /**
     * Enable CORS via the
     * {@linkcode https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Origin | Access-Control-Allow-Origin}
     * header.
     *
     * @default {false}
     */
    enableCors?: boolean;
    /** Do not print request level logs.
     *
     * @default {false}
     */
    quiet?: boolean;
    /** The algorithm to use for generating the ETag.
     *
     * @default {"SHA-256"}
     */
    etagAlgorithm?: AlgorithmIdentifier;
    /** Headers to add to each response
     *
     * @default {[]}
     */
    headers?: string[];
}
/**
 * Serves the files under the given directory root (opts.fsRoot).
 *
 * @example Usage
 * ```ts ignore
 * import { serveDir } from "@std/http/file-server";
 *
 * Deno.serve((req) => {
 *   const pathname = new URL(req.url).pathname;
 *   if (pathname.startsWith("/static")) {
 *     return serveDir(req, {
 *       fsRoot: "path/to/static/files/dir",
 *     });
 *   }
 *   // Do dynamic responses
 *   return new Response();
 * });
 * ```
 *
 * @example Changing the URL root
 *
 * Requests to `/static/path/to/file` will be served from `./public/path/to/file`.
 *
 * ```ts ignore
 * import { serveDir } from "@std/http/file-server";
 *
 * Deno.serve((req) => serveDir(req, {
 *   fsRoot: "public",
 *   urlRoot: "static",
 * }));
 * ```
 *
 * @param req The request to handle
 * @param opts Additional options.
 * @returns A response for the request.
 */
export declare function serveDir(req: Request, opts?: ServeDirOptions): Promise<Response>;
//# sourceMappingURL=file_server.d.ts.map