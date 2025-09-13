/**
 * HTTP Methods derived from IANA Hypertext Transfer Protocol (HTTP) Method Registry
 *
 * @experimental **UNSTABLE**: New API, yet to be vetted.
 *
 * @see {@link https://www.iana.org/assignments/http-methods/http-methods.xhtml#methods | IANA Hypertext Transfer Protocol (HTTP) Method Registry}
 */
export declare const METHOD: {
    /**
     * ACL (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3744 | RFC3744, Section 8.1}
     */
    readonly Acl: "ACL";
    /**
     * BASELINE-CONTROL (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 12.6}
     */
    readonly BaselineControl: "BASELINE-CONTROL";
    /**
     * BIND (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc5842 | RFC5842, Section 4}
     */
    readonly Bind: "BIND";
    /**
     * CHECKIN (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 4.4, Section 9.4}
     */
    readonly Checkin: "CHECKIN";
    /**
     * CHECKOUT (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 4.3, Section 8.8}
     */
    readonly Checkout: "CHECKOUT";
    /**
     * CONNECT (Safe: no; Idempotent: no)
     *
     * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.6}
     */
    readonly Connect: "CONNECT";
    /**
     * COPY (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4918 | RFC4918, Section 9.8}
     */
    readonly Copy: "COPY";
    /**
     * DELETE (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.5}
     */
    readonly Delete: "DELETE";
    /**
     * GET (Safe: yes; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.1}
     */
    readonly Get: "GET";
    /**
     * HEAD (Safe: yes; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.2}
     */
    readonly Head: "HEAD";
    /**
     * LABEL (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 8.2}
     */
    readonly Label: "LABEL";
    /**
     * LINK (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc2068 | RFC2068, Section 19.6.1.2}
     */
    readonly Link: "LINK";
    /**
     * LOCK (Safe: no; Idempotent: no)
     *
     * @see {@link https://www.iana.org/go/rfc4918 | RFC4918, Section 9.10}
     */
    readonly Lock: "LOCK";
    /**
     * MERGE (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 11.2}
     */
    readonly Merge: "MERGE";
    /**
     * MKACTIVITY (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 13.5}
     */
    readonly Mkactivity: "MKACTIVITY";
    /**
     * MKCALENDAR (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4791 | RFC4791, Section 5.3.1}
     * @see {@link https://www.iana.org/go/rfc8144 | RFC8144, Section 2.3}
     */
    readonly Mkcalendar: "MKCALENDAR";
    /**
     * MKCOL (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4918 | RFC4918, Section 9.3}
     * @see {@link https://www.iana.org/go/rfc5689 | RFC5689, Section 3}
     * @see {@link https://www.iana.org/go/rfc8144 | RFC8144, Section 2.3}
     */
    readonly Mkcol: "MKCOL";
    /**
     * MKREDIRECTREF (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4437 | RFC4437, Section 6}
     */
    readonly Mkredirectref: "MKREDIRECTREF";
    /**
     * MKWORKSPACE (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 6.3}
     */
    readonly Mkworkspace: "MKWORKSPACE";
    /**
     * MOVE (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4918 | RFC4918, Section 9.9}
     */
    readonly Move: "MOVE";
    /**
     * OPTIONS (Safe: yes; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.7}
     */
    readonly Options: "OPTIONS";
    /**
     * ORDERPATCH (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3648 | RFC3648, Section 7}
     */
    readonly Orderpatch: "ORDERPATCH";
    /**
     * PATCH (Safe: no; Idempotent: no)
     *
     * @see {@link https://www.iana.org/go/rfc5789 | RFC5789, Section 2}
     */
    readonly Patch: "PATCH";
    /**
     * POST (Safe: no; Idempotent: no)
     *
     * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.3}
     */
    readonly Post: "POST";
    /**
     * PRI (Safe: yes; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc9113 | RFC9113, Section 3.4}
     */
    readonly Pri: "PRI";
    /**
     * PROPFIND (Safe: yes; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4918 | RFC4918, Section 9.1}
     * @see {@link https://www.iana.org/go/rfc8144 | RFC8144, Section 2.1}
     */
    readonly Propfind: "PROPFIND";
    /**
     * PROPPATCH (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4918 | RFC4918, Section 9.2}
     * @see {@link https://www.iana.org/go/rfc8144 | RFC8144, Section 2.2}
     */
    readonly Proppatch: "PROPPATCH";
    /**
     * PUT (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.4}
     */
    readonly Put: "PUT";
    /**
     * REBIND (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc5842 | RFC5842, Section 6}
     */
    readonly Rebind: "REBIND";
    /**
     * REPORT (Safe: yes; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 3.6}
     * @see {@link https://www.iana.org/go/rfc8144 | RFC8144, Section 2.1}
     */
    readonly Report: "REPORT";
    /**
     * SEARCH (Safe: yes; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc5323 | RFC5323, Section 2}
     */
    readonly Search: "SEARCH";
    /**
     * TRACE (Safe: yes; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc9110 | RFC9110, Section 9.3.8}
     */
    readonly Trace: "TRACE";
    /**
     * UNBIND (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc5842 | RFC5842, Section 5}
     */
    readonly Unbind: "UNBIND";
    /**
     * UNCHECKOUT (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 4.5}
     */
    readonly Uncheckout: "UNCHECKOUT";
    /**
     * UNLINK (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc2068 | RFC2068, Section 19.6.1.3}
     */
    readonly Unlink: "UNLINK";
    /**
     * UNLOCK (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4918 | RFC4918, Section 9.11}
     */
    readonly Unlock: "UNLOCK";
    /**
     * UPDATE (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 7.1}
     */
    readonly Update: "UPDATE";
    /**
     * UPDATEREDIRECTREF (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc4437 | RFC4437, Section 7}
     */
    readonly Updateredirectref: "UPDATEREDIRECTREF";
    /**
     * VERSION-CONTROL (Safe: no; Idempotent: yes)
     *
     * @see {@link https://www.iana.org/go/rfc3253 | RFC3253, Section 3.5}
     */
    readonly VersionControl: "VERSION-CONTROL";
};
/**
 * A HTTP Method
 *
 * @experimental **UNSTABLE**: New API, yet to be vetted.
 */
export type Method = typeof METHOD[keyof typeof METHOD];
//# sourceMappingURL=unstable_method.d.ts.map