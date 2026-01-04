![KISS Logo](../kiss.jpg)

# Developer Guide

This document explains how the `@misterzik/create-kiss` CLI is structured, how the scaffolding process works, and how to contribute features safely.

## Repository layout

```
.
├── bin/
│   └── create-kiss.js      # Entry point for the CLI (published via package.json bin field)
├── template/
│   ├── package.json        # Project template manifest copied to new apps
│   ├── webpack.config.js   # Template build configuration
│   └── src/                # All files users customize (HTML, SCSS, JS, assets)
├── scripts/
│   └── flatten-template-src.js
├── tests/
│   └── create-kiss.test.js # Vitest suite covering CLI behaviour
├── README.md               # User-facing usage guide
├── docs/DEVELOPER.md       # (This file) internal contributor documentation
└── package.json            # CLI package manifest (bin, files, devDeps for tests)
```

## CLI flow (bin/create-kiss.js)

1. **Argument parsing** – takes the first CLI argument as the desired folder/project name. Defaults to `kiss-app` when omitted.
2. **Target directory check** – creates or validates the target directory. If it exists with files, the CLI throws to prevent overwriting user data.
3. **Template copy** – copies everything from `template/` into the target directory via `fs.cpSync`.
4. **Nested src cleanup** – if `template/src/src` exists (e.g., accidental double nesting), `flattenNestedSrc` moves the children up one level and removes the duplicate folder.
5. **Package normalization** – rewrites the generated `package.json` name to a sanitized/kebab-case version, sets a starter version (`0.1.0`), then prints next steps for users.

## Template specifics

- Users are expected to work exclusively in the scaffolded `src/` folder plus high-level configs.
- Webpack entries, HTML multipage setup, and asset loaders live inside the template and are copied verbatim.
- Any changes to the template should be made in `template/` and reflected in README instructions.

## Scripts

- `scripts/flatten-template-src.js` is a small helper to fix a nested `src/src` issue if it appears again. It is safe to re-run before publishing to ensure the template folder structure is clean.

## Testing

- Framework: [Vitest](https://vitest.dev/)
- `npm test` runs `tests/create-kiss.test.js`, which:
  - Spawns the CLI in a temporary directory and verifies that template files exist, `src/src` is absent, and Webpack config is copied.
  - Ensures the package name in generated projects is normalized to kebab-case.
- Add tests when modifying CLI behavior or template automation. Prefer end-to-end style tests (spawn CLI) to ensure real-world behavior is covered.

## Local development workflow

1. `npm install` to fetch dev dependencies (Vitest only).
2. Make changes to `bin/create-kiss.js`, `template/`, or scripts/tests.
3. Run `npm test` to validate the CLI behavior.
4. For manual verification, run `node bin/create-kiss.js demo-app` and inspect the generated output.
5. Ensure `template/src` has the exact files intended for end users before publishing.

## Publishing checklist

1. Run `npm test`.
2. Optionally run `node scripts/flatten-template-src.js` if you touched template paths.
3. Bump version in `package.json` and update changelog/README if needed.
4. `npm publish --access public`.
5. Verify `npx @misterzik/create-kiss <project-name>` installs the latest version.

## Future improvements (ideas)

- Add template customization flags (e.g., `--no-bootstrap`).
- Provide a `--skip-install` flag to run `npm install` automatically after scaffolding.
- Include smoke tests that run `npm run build` inside the generated project to catch template regressions.
