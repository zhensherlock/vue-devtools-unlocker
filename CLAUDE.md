# CLAUDE.md

Use `AGENTS.md` as the primary project instruction file.

When working in a subdirectory, also follow the nearest nested `AGENTS.md`.

Claude-specific behavior:

- Prefer making small, reviewable changes.
- Before large refactors, summarize the impact.
- After code changes, run the most relevant `pnpm` checks from `AGENTS.md`.
