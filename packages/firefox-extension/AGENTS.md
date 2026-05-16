# Agent Notes

- Inherit the repo-root `AGENTS.md`; this file only adds `packages/firefox-extension` specifics.
- This package is ESM (`"type": "module"`), including `config/*`; keep imports/exports in that style.
- Webpack entries are `popup`, `contentScript`, `background`, `injectedScript`, and `options`; `@` resolves to this package's own `src`.
- The build copies root `public/firefox-manifest.json` to `build/manifest.json` and copies the rest of root `public/` except both browser manifest files.
- The Firefox manifest uses `background.scripts` plus `browser_specific_settings.gecko`; do not replace it with Chrome's `service_worker` shape.
- `background.ts` intentionally checks allowed sites on any tab update; Chrome differs by waiting for `changeInfo.status === 'complete'`.
- When changing shared extension behavior, mirror the change in `packages/chrome-extension` unless the browser difference is intentional.
- If `@vue-devtools-unlocker/shared` changed or `build/` is clean, run `pnpm build:shared` before `pnpm build:firefox` or `pnpm pack:firefox`.
- Focused checks: `pnpm --filter='./packages/firefox-extension' lint`, `pnpm build:firefox`, and `pnpm pack:firefox` for release zip changes.
