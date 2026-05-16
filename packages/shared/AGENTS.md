# Agent Notes

- Inherit the repo-root `AGENTS.md`; this file only adds `packages/shared` specifics.
- This package exports runtime helpers consumed by both extensions as `@vue-devtools-unlocker/shared`.
- `main` is `build/main.js` and declarations go to `build/types`; run `pnpm build:shared` after changing exported helpers or types.
- Single extension builds do not build this package first, so from a clean tree run `pnpm build:shared` before `pnpm build:chrome` or `pnpm build:firefox`.
- Webpack outputs CommonJS (`library.type: commonjs2`), and `config/*` uses CommonJS rather than the ESM style used by extension packages.
- The `@` alias resolves to this package's own `src`, not the repo root.
- Focused checks: `pnpm --filter='./packages/shared' lint` and `pnpm build:shared`; there are no package-local tests.
