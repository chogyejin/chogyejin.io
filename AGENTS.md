<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

## Project workflow

- Use Bun to install dependencies and run project scripts.
- Run `bun run dev` for local development.
- After code changes, run `bun run lint`, `bunx tsc --noEmit`, and `bun run build` as appropriate.
- Keep local agent worktrees under `.agents/worktrees/` and preserve existing uncommitted work.
- Agent instructions belong in this file. Runtime permissions and MCP connections are managed by the agent host, not by this document.

## Branching and CI

- Use `main` as the trunk and create short-lived `codex/` branches from the latest `main` for changes.
- Keep pull requests small and merge with squash after the required `lint-and-build` check passes.
- Do not push directly to `main`; delete merged branches instead of maintaining a separate development branch.
- CI runs lint and production build on pull requests targeting `main` and on pushes to `main`.
- Use the committed lockfile with `bun install --frozen-lockfile`. CI does not require production database or authentication secrets.
