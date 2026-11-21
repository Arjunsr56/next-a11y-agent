# CLAUDE.md: next-a11y-agent

Read `docs/PLAN.md` (the plan) and `docs/PROGRESS.md` (current status) before doing anything.

## About the developer

Arjun is a senior frontend engineer (React, Next.js, TypeScript) who is **new to agentic concepts**.

- Explain _what_ and _why_ before _how_.
- Give numbered steps and say what he should see.
- Introduce one new concept at a time.

## Project rules

- TypeScript strict. ES modules. Node 22+.
- Relative imports use the `.js` extension (e.g. `import { main } from "./main.js"`). This is required by NodeNext.
- Keep logic in pure, testable functions; `src/cli.ts` stays tiny.
- Prefer Node built-ins over new dependencies; justify any new dependency.
- Conventional commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).
- One milestone per branch and per PR. CI must pass.
- Never commit secrets. API key comes from `ANTHROPIC_API_KEY` env var.
- Agent guardrails are mandatory: no `Bash`, no web tools, `maxTurns`, `maxBudgetUsd`.
- Default model: Haiku tier. Keep test runs cheap.
- Never claim "WCAG/ADA compliance" in code, docs or output.

## Commands

- `npm run dev -- <flags>`: run the CLI from source (e.g. `npm run dev -- --help`)
- `npm run lint`: ESLint
- `npm run format`: auto-format with Prettier (`format:check` only checks)
- `npm run typecheck`: TypeScript, no output
- `npm test`: unit tests (node:test via tsx)
- `npm run build`: compile to `dist/`
- `npm run check`: everything CI runs; run before every commit

## End of every session

Update the "Current status", "Next step" and "Session log" sections in `docs/PROGRESS.md`.
