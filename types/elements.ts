declare module 'preact/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'element-counter': HTMLAttributes<HTMLElement>;
      'element-button': HTMLAttributes<HTMLElement>;
      'dsd-counter-preact': HTMLAttributes<HTMLElement>;
      'dsd-button-preact': HTMLAttributes<HTMLElement>;
      'element-button2': HTMLAttributes<HTMLElement> & { hydrate?: boolean };
      'element-counter2': HTMLAttributes<HTMLElement>;
    }
  }
}
