# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Declarative Shadow DOM (DSD) with Preact** project that demonstrates modern web component architecture using Deno as the runtime. It showcases reusable components with encapsulation, server-side rendering (SSR), and dual packaging for both Deno and npm ecosystems.

## Development Commands

### Core Development
- `deno task dev` - Start development server with hot reload (serves on http://localhost:8000)
- `deno task serve` - Start production server without file watching
- `deno task build` - Build and package for npm distribution (outputs to `package/` directory)
- `deno task ssg` - Generate static site HTML files

### Build Pipeline Details
The build process (`deno task build`) performs multiple steps:
1. Uses `@deno/dnt` to transpile Deno TypeScript to Node.js compatible code
2. Generates static HTML using SSG (Static Site Generation)
3. Copies CSS templates to the package directory
4. Runs Vite build for optimized bundling
5. Uses JSPM to generate optimized import maps with integrity and preloading

## Architecture Overview

### Dual Component Strategy
The project implements components using **two complementary approaches**:

1. **Custom Elements** (`elements/` directory):
   - Native Web Components with Shadow DOM
   - TypeScript classes extending `HTMLElement`
   - Examples: `Button`, `Counter`, `ButtonPreact`, `CounterPreact`

2. **Preact Components** (`components/` directory):
   - Standard Preact functional components
   - Server-side renderable
   - Examples: `Button`, `Counter`, `DSDButton`, `DSDCounter`

### Key Architectural Patterns

#### Server-Side Rendering (SSR)
- `main.tsx` serves as the primary server entry point using Deno's native HTTP server
- Route-based file serving with explicit URL patterns for assets
- Full HTML document generation with `renderToStringAsync` from Preact
- Declarative Shadow DOM templates embedded in server-rendered HTML

#### Import Map Strategy
- **Development**: Uses `deno.json` imports with path aliases (e.g., `#button`, `#counter`)
- **Browser**: Uses `importmap.json` with CDN URLs for production dependencies
- **Build**: Transpiles and resolves all imports for npm compatibility

#### Signal-Based State Management
- Uses `@preact/signals` for reactive state management
- Shared state between components via `signals/counter.ts`
- Enables cross-component reactivity without prop drilling

### Directory Structure Significance

- `components/` - Preact components for SSR and composition
- `elements/` - Web Components (Custom Elements) for browser hydration  
- `templates/` - HTML templates and CSS for Shadow DOM styling
- `functions/` - Build scripts, bundling, and deployment configuration
- `dom/` - Browser-specific code that registers Custom Elements
- `package/` - Generated npm-compatible output (created by build process)

## Development Workflow

### Working with Components
1. **Adding new components**: Create both a Preact component (`components/`) and a Custom Element (`elements/`) if browser interactivity is needed
2. **Styling**: Place CSS in `templates/` directory - it gets copied to the package during build
3. **State**: Use signals from `signals/` for shared reactive state
4. **Import aliases**: Use the `#` prefix imports defined in `deno.json` (e.g., `#button`, `#home`)

### Testing Changes
- Use `deno task dev` for rapid iteration with hot reload
- Visit `/elements` route to see the component showcase
- Check `package/` directory after build to verify npm output

### Build Output Verification
After running `deno task build`, verify:
- `package/esm/` contains transpiled JavaScript modules
- `package/index.html` is generated with proper import maps
- CSS files are copied to `package/templates/`
- Vite and JSPM optimizations are applied

## Key Technologies

- **Runtime**: Deno (TypeScript-first, secure by default)
- **UI Framework**: Preact (lightweight React alternative)
- **State Management**: `@preact/signals` (fine-grained reactivity)
- **Web Standards**: Custom Elements, Shadow DOM, Declarative Shadow DOM
- **Build Tools**: `@deno/dnt`, Vite, JSPM
- **Server**: Native Deno HTTP server with URL pattern routing
- **Deployment**: Cloudflare Workers compatible (via Vite plugin)

## Important Implementation Details

### Declarative Shadow DOM
The project uses server-rendered Shadow DOM templates that hydrate on the client. Components like `DSDButton` and `DSDCounter` render with `<template shadowrootmode="open">` for immediate styling encapsulation.

### Custom Element Registration
Browser-side Custom Elements are registered in `dom/main.ts` and loaded via `package/esm/dom/main.js`. The server pre-renders the HTML structure while the client-side code adds interactivity.

### Import Resolution
The dual import map system allows the same component code to work in both server (Deno) and browser (CDN) environments. Path aliases in `deno.json` resolve to different targets during development vs. build.
