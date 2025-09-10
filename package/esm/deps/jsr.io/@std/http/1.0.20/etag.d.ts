/**
 * Just the part of {@linkcode Deno.FileInfo} that is required to calculate an `ETag`,
 * so partial or user generated file information can be passed.
 */
export interface FileInfo {
    /** The last modification time of the file. This corresponds to the `mtime`
     * field from `stat` on Linux/Mac OS and `ftLastWriteTime` on Windows. This
     * may not be available on all platforms. */
    mtime: Date | null;
    /** The size of the file, in bytes. */
    size: number;
}
/** Options for {@linkcode eTag}. */
export interface ETagOptions {
    /**
     * A digest algorithm to use to calculate the etag.
     *
     * @default {"SHA-256"}
     */
    algorithm?: AlgorithmIdentifier;
    /**
     * Override the default behavior of calculating the `ETag`, either forcing
     * a tag to be labelled weak or not.
     *
     * Defaults to `true` when the entity is a `FileInfo` and `false` otherwise.
     */
    weak?: boolean;
}
/**
 * Calculate an ETag for string or `Uint8Array` entities. This returns a
 * {@linkcode https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag#etag_value | strong tag}
 * of the form `"<ascii chars>"`, which guarantees the byte-for-byte equality of the resource.
 *
 * You can optionally set true to the `weak` option to get a weak tag.
 *
 * @example Usage
 * ```ts
 * import { eTag } from "@std/http/etag";
 * import { assert } from "@std/assert";
 *
 * const body = "hello deno!";
 *
 * const etag = await eTag(body);
 * assert(etag);
 *
 * const res = new Response(body, { headers: { etag } });
 * ```
 *
 * @param entity The entity to get the ETag for.
 * @param options Various additional options.
 * @returns The calculated ETag.
 */
export declare function eTag(entity: string | Uint8Array, options?: ETagOptions): Promise<string>;
/**
 * Calculate an ETag for file information entity. This returns a
 * {@linkcode https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag#w | weak tag}
 * of the form `W\"<ascii chars>"`, which guarantees the equivalence of the resource,
 * not the byte-for-byte equality.
 *
 * @example Usage
 * ```ts
 * import { eTag } from "@std/http/etag";
 * import { assert } from "@std/assert";
 *
 * const fileInfo = await Deno.stat("README.md");
 *
 * const etag = await eTag(fileInfo);
 * assert(etag);
 *
 * using file = await Deno.open("README.md");
 *
 * const res = new Response(file.readable, { headers: { etag } });
 * ```
 *
 * @param entity The entity to get the ETag for.
 * @param options Various additional options.
 * @returns The calculated ETag.
 */
export declare function eTag(entity: FileInfo, options?: ETagOptions): Promise<string | undefined>;
/** A helper function that takes the value from the `If-Match` header and a
 * calculated etag for the target. By using strong comparison, return `true` if
 * the values match, otherwise `false`.
 *
 * See MDN's [`If-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-Match)
 * article for more information on how to use this function.
 *
 * @example Usage
 * ```ts ignore
 * import {
 *   eTag,
 *   ifMatch,
 * } from "@std/http/etag";
 * import { assert } from "@std/assert";
 *
 * const body = "hello deno!";
 *
 * Deno.serve(async (req) => {
 *   const ifMatchValue = req.headers.get("if-match");
 *   const etag = await eTag(body);
 *   assert(etag);
 *   if (!ifMatchValue || ifMatch(ifMatchValue, etag)) {
 *     return new Response(body, { status: 200, headers: { etag } });
 *   } else {
 *     return new Response(null, { status: 412, statusText: "Precondition Failed"});
 *   }
 * });
 * ```
 *
 * @param value the If-Match header value.
 * @param etag the ETag to check against.
 * @returns whether or not the parameters match.
 */
export declare function ifMatch(value: string | null, etag: string | undefined): boolean;
/** A helper function that takes the value from the `If-None-Match` header and
 * a calculated etag for the target entity and returns `false` if the etag for
 * the entity matches the supplied value, otherwise `true`.
 *
 * See MDN's [`If-None-Match`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/If-None-Match)
 * article for more information on how to use this function.
 *
 * @example Usage
 * ```ts ignore
 * import {
 *   eTag,
 *   ifNoneMatch,
 * } from "@std/http/etag";
 * import { assert } from "@std/assert";
 *
 * const body = "hello deno!";
 *
 * Deno.serve(async (req) => {
 *   const ifNoneMatchValue = req.headers.get("if-none-match");
 *   const etag = await eTag(body);
 *   assert(etag);
 *   if (!ifNoneMatch(ifNoneMatchValue, etag)) {
 *     return new Response(null, { status: 304, headers: { etag } });
 *   } else {
 *     return new Response(body, { status: 200, headers: { etag } });
 *   }
 * });
 * ```
 *
 * @param value the If-None-Match header value.
 * @param etag the ETag to check against.
 * @returns whether or not the parameters do not match.
 */
export declare function ifNoneMatch(value: string | null, etag: string | undefined): boolean;
//# sourceMappingURL=etag.d.ts.map