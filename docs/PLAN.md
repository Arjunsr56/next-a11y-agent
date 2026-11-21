# next-a11y-agent: Project Plan

> A CLI that finds accessibility (a11y) issues in a running Next.js app,
> traces each one to its source file, fixes it, and re-scans to verify the fix.
>
> **Core design:** a deterministic scanner (axe-core in Playwright) *finds* issues;
> a Claude agent (Agent SDK) *maps, explains and fixes* them.

Owner: Arjun · Started: 2026-11 · License: MIT

---

## 1. Goals

- **Portfolio:** a professional-quality open-source project I can explain in interviews.
- **Learning:** understand agentic concepts by building them (tools, the agent loop, permissions, guardrails, verification).
- **Users:** published on npm; usable with `npx next-a11y-agent`.

### Non-goals (for v0.1)
- No paid version, no login, no hosted service.
- No claims of "WCAG/ADA compliance". We *find and help fix* common issues.

---

## 2. How it works

```
CLI flags ──► Safety checks (plain Node) ──► Agent SDK query()
                                              ├─ custom tool: scan_page(url)  → Playwright + axe
                                              ├─ custom tool: list_routes()   → app/**/page.tsx
                                              ├─ built-ins: Read, Glob, Grep (+ Edit in fix mode)
                                              └─ guardrails: no Bash, no web, maxTurns, maxBudgetUsd
                                           ──► a11y-report.md (+ code changes in fix mode)
```

| Mode | What it does | Tools |
|---|---|---|
| `report` (default) | Scan, locate source, explain, write report | Read, Glob, Grep |
| `fix` | Report, then edit code and re-scan to verify | + Edit (`acceptEdits`) |

**Safety rule:** `fix` mode refuses to run if git has uncommitted changes.

---

## 3. Tech stack (and why)

| Tool | Why |
|---|---|
| TypeScript (strict) | Type safety; industry standard |
| Node.js 20+ | Required by the Agent SDK and Playwright |
| `@anthropic-ai/claude-agent-sdk` | The agent loop, tools, permissions, cost caps |
| `playwright` + `@axe-core/playwright` | Real-browser scan with the standard a11y engine |
| `zod` | Validates custom-tool inputs |
| `commander` | CLI flag parsing |
| `tsup` | Builds TS into a publishable package |
| `vitest` | Unit tests |
| ESLint + Prettier | Consistent, clean code |
| GitHub Actions | CI: lint, typecheck, test, build on every PR |
| Changesets | Versioning + CHANGELOG |

---

## 4. Professional workflow (how we work)

1. **One milestone = one branch = one Pull Request.** Example: `git checkout -b feat/m1-scanner`.
2. **Conventional commits:** `feat: ...`, `fix: ...`, `docs: ...`, `test: ...`, `chore: ...`.
3. **CI must pass** before merging a PR.
4. **No secrets in git.** `.env` is in `.gitignore`; `.env.example` shows variable names only.
5. **Update `docs/PROGRESS.md` at the end of every session.**

---

## 5. Milestones

Each milestone lists: the goal, the concept you'll learn, the tasks, and the definition of done.

### M0: Foundation (≈ 2 hrs) · cost $0
- **Goal:** a clean, professional repo skeleton.
- **Learn:** how a TypeScript CLI package is structured.
- **Tasks:**