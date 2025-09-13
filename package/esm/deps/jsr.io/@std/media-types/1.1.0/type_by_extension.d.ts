/**
 * Returns the media type associated with the file extension, or `undefined` if
 * no media type is found.
 *
 * Values are normalized to lower case and matched irrespective of a leading
 * `.`.
 *
 * @param extension The file extension to get the media type for.
 *
 * @returns The media type associated with the file extension, or `undefined` if
 * no media type is found.
 *
 * @example Usage
 * ```ts
 * import { typeByExtension } from "@std/media-types/type-by-extension";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(typeByExtension("js"), "text/javascript");
 * assertEquals(typeByExtension(".HTML"), "text/html");
 * assertEquals(typeByExtension("foo"), undefined);
 * assertEquals(typeByExtension("file.json"), undefined);
 * ```
 */
export declare function typeByExtension(extension: string): string | undefined;
//# sourceMappingURL=type_by_extension.d.ts.map