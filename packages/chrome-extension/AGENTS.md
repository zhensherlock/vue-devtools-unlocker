# Agent Notes

- Inherit the repo-root `AGENTS.md`; this file only adds `packages/chrome-extension` specifics.
- This package is ESM (`"type": "module"`), including `config/*`; keep imports/exports in that style.
- Webpack entries are `popup`, `contentScript`, `background`, `injectedScript`, and `options`; `@` resolves to this package's own `src`.
- The build copies root `public/chrome-manifest.json` to `build/manifest.json` and copies the rest of root `public/` except both browser manifest files.
- The Chrome manifest uses a MV3 `background.service_worker`; do not replace it with Firefox's `background.scripts` shape.
- `background.ts` intentionally waits for `changeInfo.status === 'complete'` before checking allowed sites; Firefox differs here.
- When changing shared extension behavior, mirror the change in `packages/firefox-extension` unless the browser difference is intentional.
- If `@vue-devtools-unlocker/shared` changed or `build/` is clean, run `pnpm build:shared` before `pnpm build:chrome` or `pnpm pack:chrome`.
- Focused checks: `pnpm --filter='./packages/chrome-extension' lint`, `pnpm build:chrome`, and `pnpm pack:chrome` for release zip changes.
