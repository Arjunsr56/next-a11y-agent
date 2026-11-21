# CLAUDE.md: next-a11y-agent

Read `docs/PLAN.md` (the plan) and `docs/PROGRESS.md` (current status) before doing anything.

## About the developer
Arjun is a senior frontend engineer (React, Next.js, TypeScript) who is **new to agentic concepts**.
- Explain *what* and *why* before *how*.
- Give numbered steps and say what he should see.
- Introduce one new concept at a time.

## Project rules
- TypeScript strict. ES modules. Node 20+.
- Conventional commits (`feat:`, `fix:`, `docs:`, `test:`, `chore:`).
- One milestone per branch and per PR. CI must pass.
- Never commit secrets. API key comes from `ANTHROPIC_API_KEY` env var.
- Agent guardrails are mandatory: no `Bash`, no web tools, `maxTurns`, `maxBudgetUsd`.
- Default model: Haiku tier. Keep test runs cheap.
- Never claim "WCAG/ADA compliance" in code, docs or output.

## Commands
(fill in during M0)
- `npm run dev`:
- `npm run lint`:
- `npm run typecheck`:
- `npm test`:
- `npm run build`:

## End of every session
Update the "Current status", "Next step" and "Session log" sections in `docs/PROGRESS.md`.