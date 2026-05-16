# Agent Notes

- Inherit the repo-root `AGENTS.md`; this file only adds `apps/docs` specifics.
- This is a VitePress app; use root shortcuts `pnpm dev:docs` and `pnpm build:docs`.
- The docs package has no lint script; verify docs changes with `pnpm build:docs`.
- English source pages live under `en/`; Chinese pages and locale overrides live under `zh/` and `zh/config.ts`.
- `apps/docs/.vitepress/config.ts` rewrites `en/*` to root paths, so new English pages may need matching `rewrites` and sidebar entries.
- The docs base is `/vue-devtools-unlocker/` unless `VERCEL` is set; avoid hard-coding deployment-root asset URLs.
- The docs nav version imports `packages/chrome-extension/package.json`, not `apps/docs/package.json`.
- The `vitepress-plugin-llms` sidebar is separate from the visible VitePress sidebar; update both when adding guide pages.
- Generated `.vitepress/cache/` and `.vitepress/dist/` are ignored outputs.
