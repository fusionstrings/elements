# Declarative Shadow DOM with Preact

This project demonstrates the use of Declarative Shadow DOM (DSD) with Preact, showcasing reusable components like buttons and counters. It includes a server-side rendering setup and a build pipeline for packaging the project.

## Features

- **Declarative Shadow DOM**: Implements DSD for encapsulated components.
- **Preact Integration**: Uses Preact for lightweight and fast UI rendering.
- **Reusable Components**: Includes components like `Button`, `Counter`, and `DSDButton`.
- **Server-Side Rendering**: Renders HTML on the server using `preact-render-to-string`.
- **Build Pipeline**: Supports bundling and packaging with tools like `esbuild` and `@deno/dnt`.

## Project Structure

```
.
├── components/         # Reusable Preact components
├── dom/               # DOM-related scripts
├── elements/          # Custom elements with Declarative Shadow DOM
├── elements.html      # HTML template for elements
├── functions/         # Build and bundling scripts
├── package/           # Packaged output for npm
├── signals/           # Signal-related utilities
├── templates/         # HTML and CSS templates
├── main.tsx          # Entry point for the server
├── importmap.json    # Import map for module resolution
├── deno.json         # Deno configuration
└── .gitignore        # Git ignore file
```

## Getting Started

### Prerequisites

- [Deno](https://deno.land/) installed on your system.
- Node.js (if you plan to use the npm package).

### Development

To start the development server:

```sh
deno task dev
```

This will serve the application and watch for changes.

### Build
To build the project for npm:

The output will be available in the package/ directory.

## Usage

### Components

- **Button:** A simple button component.
- **Counter:** A counter component using @preact/signals.
- **DSDButton:** A custom element with Declarative Shadow DOM.

## Server
The server serves the application and static files. Access the application at http://localhost:8000.

## Import Map
The project uses an import map for module resolution.
