/** Options for {@linkcode format}. */
export interface FormatOptions {
    /**
     * Uses bits representation.
     *
     * @default {false}
     */
    bits?: boolean;
    /**
     * Uses binary bytes (e.g. kibibyte).
     *
     * @default {false}
     */
    binary?: boolean;
    /**
     * Include plus sign for positive numbers.
     *
     * @default {false}
     */
    signed?: boolean;
    /**
     * Uses localized number formatting. If it is set to true, uses default
     * locale on the system. If it's set to string, uses that locale. The given
     * string should be a
     * {@link https://en.wikipedia.org/wiki/IETF_language_tag | BCP 47 language tag}.
     * You can also give the list of language tags.
     */
    locale?: boolean | string | string[];
    /**
     * The minimum number of fraction digits to display. If neither
     * {@linkcode minimumFractionDigits} or {@linkcode maximumFractionDigits}
     * are set.
     *
     * @default {3}
     */
    minimumFractionDigits?: number;
    /**
     * The maximum number of fraction digits to display. If neither
     * {@linkcode minimumFractionDigits} or {@linkcode maximumFractionDigits}
     * are set.
     *
     * @default {3}
     */
    maximumFractionDigits?: number;
}
/**
 * Convert bytes to a human-readable string: 1337 → 1.34 kB
 *
 * Based on {@link https://github.com/sindresorhus/pretty-bytes | pretty-bytes}.
 * A utility for displaying file sizes for humans.
 *
 * @param num The bytes value to format
 * @param options The options for formatting
 * @returns The formatted string
 *
 * @example Basic usage
 * ```ts
 * import { format } from "@std/fmt/bytes";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(format(1337), "1.34 kB");
 * assertEquals(format(100), "100 B");
 * ```
 *
 * @example Include bits representation
 *
 * ```ts
 * import { format } from "@std/fmt/bytes";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(format(1337, { bits: true }), "1.34 kbit");
 * ```
 *
 * @example Include sign
 *
 * ```ts
 * import { format } from "@std/fmt/bytes";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(format(42, { signed: true }), "+42 B");
 * assertEquals(format(-42, { signed: true }), "-42 B");
 * ```
 *
 * @example Change locale
 *
 * ```ts
 * import { format } from "@std/fmt/bytes";
 * import { assertEquals } from "@std/assert";
 *
 * assertEquals(format(1337, { locale: "de" }), "1,34 kB");
 * ```
 */
export declare function format(num: number, options?: FormatOptions): string;
//# sourceMappingURL=bytes.d.ts.map