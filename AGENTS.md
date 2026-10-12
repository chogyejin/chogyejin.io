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
