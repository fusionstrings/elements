declare module 'preact/jsx-runtime' {
    namespace JSX {
        interface IntrinsicElements {
            'element-counter': HTMLAttributes<HTMLElement>;
            'element-button': HTMLAttributes<HTMLElement>;
            'dsd-counter-preact': HTMLAttributes<HTMLElement>;
            'dsd-button-preact': HTMLAttributes<HTMLElement>;
            'element-button2': HTMLAttributes<HTMLElement>;
            'element-counter2': HTMLAttributes<HTMLElement>;
        }
    }
}
declare function documentHome(): Promise<string>;
declare const _default: {
    fetch(request: Request): Promise<Response>;
};
export default _default;
export { documentHome };
//# sourceMappingURL=main.d.ts.map