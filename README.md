# create-kiss

![KISS Logo](kiss.jpg)

Scaffold a landing page, by Keepin' It Simply Stupid (KISS), with a Webpack + Sass starter. The CLI copies the ready-to-run template (HTML, SCSS, JS, and assets) so end users only focus on files inside `src/`.

## Quick start

```sh
npx @misterzik/create-kiss my-landing
cd my-landing
npm install
npm run start
```

What the command does:
1. Creates `my-landing/` (or fails if the folder already exists).
2. Copies the template (including Webpack config, assets, and scripts).
3. Normalizes the package name inside the generated `package.json` (e.g., `"My Cool App"` ➜ `"my-cool-app"`).
4. Prints the next steps you need to run locally.

> Tip: You can substitute `npx` with `npm create @misterzik/kiss@latest` or install globally via `npm install -g @misterzik/create-kiss`.

## Template contents

The generated project contains:

- `src/` with HTML pages, SCSS, JS, and assets.
- `webpack.config.js` configured for multi-page output.
- Scripts:
  - `npm run start` – launches `webpack-dev-server` with HMR.
  - `npm run build` – outputs optimized assets to `dist/`.

## Contributing / local development

1. Clone the repo and install dependencies: `npm install`.
2. Run tests: `npm test` (uses [Vitest](https://vitest.dev/)).
3. Make changes under `template/` or the CLI in `bin/create-kiss.js`.

When testing locally, you can link the package: `npm link` (or run `node bin/create-kiss.js demo-app` from the repo root and inspect the generated folder in a temporary directory).

## Releasing

1. Bump the version in `package.json`.
2. `npm publish --access public`
3. Verify `npx @misterzik/create-kiss <project-name>` pulls the new version.
