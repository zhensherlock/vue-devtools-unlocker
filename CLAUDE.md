# Agent Notes

## Setup

- Use Node 22+ from `.nvmrc` and `pnpm@10.33.4` from `packageManager`; CI builds extension packages on Node 24.
- Install with `pnpm install`. Workspace members are only `packages/*` and `apps/*`.

## Commands

- `pnpm build` builds extension packages only (`packages/shared`, `chrome-extension`, `firefox-extension`) in dependency order.
- `pnpm build:docs` builds the VitePress docs; `pnpm dev:docs` runs the docs server.
- `pnpm dev` watches only `packages/*`; use `pnpm dev:chrome`, `pnpm dev:firefox`, or `pnpm dev:shared` for focused package watches.
- `pnpm pack` builds both extensions and writes ignored zip files under each extension package's `release/` directory.
- There is no root lint/test/typecheck script. Lint package TS with `pnpm -r --aggregate-output --filter='./packages/*' lint`; quote `--filter` values in interactive `zsh`.
- For one package, prefer root shortcuts for builds (`pnpm build:chrome`, `pnpm build:firefox`, `pnpm build:shared`) and `pnpm --filter='./packages/chrome-extension' lint` for focused lint.

## Architecture

- `packages/shared` exports the runtime helpers used by both extensions; extensions import it as `@vue-devtools-unlocker/shared`, whose `main` is `packages/shared/build/main.js`.
- If building a single extension from a clean tree or after shared changes, run `pnpm build:shared` first; `pnpm build` already handles this ordering.
- Chrome and Firefox extension source trees are mostly duplicated. Keep browser-specific differences intentional: manifest copied by webpack, zip suffix in `pack.js`, and Firefox `background.ts` checks allowed-sites on any tab update while Chrome waits for `changeInfo.status === 'complete'`.
- Root `public/` contains shared HTML/assets plus `chrome-manifest.json` and `firefox-manifest.json`; each extension webpack config copies its browser manifest to `build/manifest.json`.
- Docs live in `apps/docs`; VitePress uses `/vue-devtools-unlocker/` as `base` unless `VERCEL` is set, and docs nav version comes from `packages/chrome-extension/package.json`.
- Extension release versions are duplicated in `packages/*-extension/package.json` and `public/*-manifest.json`; zips read the manifest version, and docs read the Chrome package version.

## Style and Workflow

- Extension package configs are ESM because their package.json has `"type": "module"`; `packages/shared/config/*` is CommonJS.
- Package `lint` scripts use ESLint on `src/`; Husky pre-commit calls `npx lint-staged`, whose config runs `biome check --write` only for staged `packages/**/*.{ts,js}`.
- `lint-staged` is not in `package.json` or `pnpm-lock.yaml`; `pnpm exec lint-staged` currently fails unless that dependency is added.
- Package `format` scripts use Prettier over `config`, `public`, and `src`; generated `build/`, `release/`, and `apps/docs/.vitepress/{cache,dist}/` are ignored outputs.
- CI currently verifies builds and extension packaging, not tests; no repo-local test files or test scripts are present.
