# Agent Notes

## Setup

- When working inside a workspace package, also follow that package's nested `AGENTS.md`.
- Use Node 22+ from `.nvmrc` and `pnpm@10.33.4` from `packageManager`; CI builds extension packages on Node 24 and docs on Node 22.
- Install with `pnpm install`. The workspace is only `packages/*` and `apps/*`.

## Commands

- `pnpm build` runs only `packages/*` (`shared`, `chrome-extension`, `firefox-extension`) in dependency order; it does not build docs.
- `pnpm pack` runs each extension's `build:zip` and writes ignored zips under `packages/*-extension/release/`.
- PR-like verification is `pnpm build && pnpm pack`; add `pnpm build:docs` when docs changed.
- `pnpm dev` watches only extension packages; use `pnpm dev:chrome`, `pnpm dev:firefox`, `pnpm dev:shared`, or `pnpm dev:docs` for focused watches.
- `pnpm build:chrome` and `pnpm build:firefox` do not build `shared`; from a clean tree or after shared changes, run `pnpm build:shared` first.
- There is no root lint/test/typecheck script and no repo-local tests. Lint package TS with `pnpm -r --aggregate-output --filter='./packages/*' lint`.
- For focused lint in interactive `zsh`, quote filters: `pnpm --filter='./packages/chrome-extension' lint`.

## Architecture

- `packages/shared` exports runtime helpers imported by both extensions as `@vue-devtools-unlocker/shared`; its package `main` is `build/main.js`.
- Webpack aliases `@` to each package's own `src`, so `@/...` is not a repo-root alias.
- Chrome and Firefox source trees are mostly duplicated; update both unless the browser difference is intentional.
- Known intentional browser differences: copied manifest, manifest background shape (`service_worker` vs `scripts`), zip suffix, and `background.ts` allowed-site checks (Chrome waits for `changeInfo.status === 'complete'`; Firefox checks any tab update).
- Root `public/` holds shared HTML/assets plus `chrome-manifest.json` and `firefox-manifest.json`; extension webpack copies the selected browser manifest to `build/manifest.json`.
- The runtime flow is background allowed-site check -> content script injects `injectedScript.js` -> shared helpers unlock Vue DevTools -> popup displays the stored tab status; options edits `chrome.storage.sync.allowedSites`.
- Docs live in `apps/docs`; VitePress uses `/vue-devtools-unlocker/` unless `VERCEL` is set, and the docs nav version comes from `packages/chrome-extension/package.json`.
- Release versions are duplicated in `packages/*-extension/package.json` and `public/*-manifest.json`; zips read `name` and `version` from built `manifest.json`.

## Style and Workflow

- Extension package configs are ESM because their package.json has `"type": "module"`; `packages/shared/config/*` is CommonJS.
- Package `lint` scripts run ESLint only on `src/`; package `format` scripts run Prettier over `config`, `public`, and `src`.
- Husky pre-commit calls `npx lint-staged`, and `lint-staged.config.js` runs `biome check --write` for staged `packages/**/*.{ts,js}`.
- `lint-staged` is not in `package.json` or `pnpm-lock.yaml`; `pnpm exec lint-staged` fails unless that dependency is added.
- Generated `build/`, `release/`, and `apps/docs/.vitepress/{cache,dist}/` are ignored outputs.
