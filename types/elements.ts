declare module 'preact/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'element-counter': HTMLAttributes<HTMLElement>;
      'element-button': HTMLAttributes<HTMLElement>/*  & { hydrate?: boolean } */;
    }
  }
}
