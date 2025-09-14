declare module 'preact/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      'element-counter': HTMLAttributes<HTMLElement> & { hydrate?: boolean };
      'element-button': HTMLAttributes<HTMLElement> & { hydrate?: boolean };
    }
  }
}

// This empty export is important! It tells TS to treat this as a module
export {};