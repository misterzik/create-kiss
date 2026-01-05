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

All feature work happens on the `dev` branch. Please avoid pushing directly to `main`.

1. Clone the repo and install dependencies: `npm install`.
2. Create a feature branch off `dev`: `git checkout dev && git pull && git checkout -b feat/my-change`.
3. Run tests: `npm test` (uses [Vitest](https://vitest.dev/)).
4. Make your changes under `template/` or the CLI in `bin/create-kiss.js`.
5. Rebuild to ensure the scaffold still works: `npm run build`.
6. Push your branch to `origin` and open a pull request into `dev`.

When you're ready to merge to `main`, open a PR from `dev` → `main`. The PR workflow runs lint/build/test gates before merging.

For local smoke testing, you can link the package: `npm link` (or run `node bin/create-kiss.js demo-app` from the repo root and inspect the generated folder in a temporary directory).

## Releasing

1. Bump the version in `package.json`.
2. `npm publish --access public`
3. Verify `npx @misterzik/create-kiss <project-name>` pulls the new version.
