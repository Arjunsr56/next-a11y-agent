# next-a11y-agent: Project Plan

> A CLI that finds accessibility (a11y) issues in a running Next.js app,
> traces each one to its source file, fixes it, and re-scans to verify the fix.
>
> **Core design:** a deterministic scanner (axe-core in Playwright) _finds_ issues;
> a Claude agent (Agent SDK) _maps, explains and fixes_ them.

Owner: Arjun · Started: 2026-11 · License: MIT

---

## 1. Goals

- **Portfolio:** a professional-quality open-source project I can explain in interviews.
- **Learning:** understand agentic concepts by building them (tools, the agent loop, permissions, guardrails, verification).
- **Users:** published on npm; usable with `npx next-a11y-agent`.

### Non-goals (for v0.1)

- No paid version, no login, no hosted service.
- No claims of "WCAG/ADA compliance". We _find and help fix_ common issues.

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

| Mode               | What it does                                 | Tools                  |
| ------------------ | -------------------------------------------- | ---------------------- |
| `report` (default) | Scan, locate source, explain, write report   | Read, Glob, Grep       |
| `fix`              | Report, then edit code and re-scan to verify | + Edit (`acceptEdits`) |

**Safety rule:** `fix` mode refuses to run if git has uncommitted changes.

---

## 3. Tech stack (and why)

| Tool                                  | Why                                                           |
| ------------------------------------- | ------------------------------------------------------------- |
| TypeScript (strict)                   | Type safety; industry standard                                |
| Node.js 22+                           | Current LTS lines (Node 20 reached end of life in April 2026) |
| `@anthropic-ai/claude-agent-sdk`      | The agent loop, tools, permissions, cost caps (M2)            |
| `playwright` + `@axe-core/playwright` | Real-browser scan with the standard a11y engine (M1)          |
| `zod`                                 | Validates custom-tool inputs (M2)                             |
| `node:util` `parseArgs`               | CLI flag parsing, built into Node (no dependency)             |
| `tsc`                                 | Builds TS into `dist/` (no bundler needed for a small CLI)    |
| `node:test` + `tsx`                   | Unit tests with Node's built-in test runner                   |
| ESLint + Prettier                     | Bug-catching and consistent formatting                        |
| GitHub Actions                        | CI: lint, format, typecheck, test, build on Node 22 and 24    |
| Changesets                            | Versioning + CHANGELOG (M5)                                   |

> **Why built-ins over libraries?** A CLI that people run with `npx` should have as few
> dependencies as possible: faster installs and a smaller supply-chain attack surface.

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
  - [x] Confirm npm name is free (`npm view next-a11y-agent` → 404)
  - [x] Create GitHub repo `next-a11y-agent` (public, MIT)
  - [ ] `package.json` with `bin`, `type: module`, scripts
  - [ ] TypeScript strict, ESLint, Prettier, node:test, tsc build
  - [ ] `.gitignore`, `.env.example`, `LICENSE`, basic `README.md`
  - [ ] CI workflow: lint, format, typecheck, test, build
  - [ ] `src/cli.ts` with validated flags and `--help` (17 unit tests)
- **Done when:** `npx tsx src/cli.ts --help` works and CI is green on GitHub.

### M1: Scanner, no AI (≈ 3 hrs) · cost $0

- **Goal:** scan a page with Playwright + axe and print issues.
- **Learn:** what deterministic tools are and why agents need them.
- **Tasks:**
  - [ ] `src/scan.ts`: open URL, run axe, return trimmed violations (rule, impact, help, selector, short HTML)
  - [ ] Add `/a11y-demo` page with deliberate bugs to claude-dev-journal
  - [ ] Unit test for the "trim violations" function
- **Done when:** scanning `/a11y-demo` lists the planted bugs.

### M2: Agent, report mode (≈ 3 hrs) · ~1–3¢ per run

- **Goal:** the agent explains each issue and finds the JSX file and line.
- **Learn:** custom tools, `query()`, the message stream, read-only permissions, cost caps.
- **Tasks:**
  - [ ] `src/tools.ts`: `scan_page`, `list_routes` with `tool()` + `createSdkMcpServer()`
  - [ ] `src/agent.ts`: `query()` with Haiku, `allowedTools`, `maxTurns`, `maxBudgetUsd`
  - [ ] `src/report.ts`: write `a11y-report.md`, print summary + cost
- **Done when:** report mode produces a correct report for `/a11y-demo`.

### M3: Fix mode with a verify loop (≈ 3 hrs) · ~2–5¢ per run

- **Goal:** the agent fixes issues and re-scans to prove them fixed.
- **Learn:** write permissions, the verify loop, git-clean safety checks.
- **Tasks:**
  - [ ] `src/checks.ts`: refuse if git is dirty; check URL reachable
  - [ ] Fix-mode prompt: fix → re-scan → report fixed / needs-human
  - [ ] Summary: "Fixed X/Y (verified)"
- **Done when:** fix mode fixes most demo bugs and `git diff` looks right.

### M4: Polish (≈ 2 hrs) · cost $0

- [ ] Great README: what, why, install, usage, how it works, safety, cost
- [ ] Demo GIF (before → after)
- [ ] CONTRIBUTING.md, issue templates

### M5: Release v0.1.0 (≈ 1 hr) · cost $0

- [ ] Changeset + CHANGELOG
- [ ] `npm publish` (with provenance via GitHub Actions)
- [ ] Test: `npx next-a11y-agent --help` from a fresh folder

### M6: GitHub Action (≈ 4 hrs) · ~1–3¢ per PR

- [ ] Action runs report mode on PRs and posts a comment

### M7: Launch (≈ 2 hrs)

- [ ] LinkedIn post + demo GIF, r/nextjs, Show HN

---

## 6. Cost rules

- Default model: Haiku. `--model` flag to opt into Sonnet (with a warning).
- Default `--budget 0.10` (USD per run), plus `maxTurns`.
- Check the Claude Console balance after each weekend.

## 7. Risks

| Risk                               | Mitigation                                                     |
| ---------------------------------- | -------------------------------------------------------------- |
| Bad code changes                   | Fix mode only on a clean git tree; human reviews `git diff`    |
| Prompt injection from repo content | No Bash, no web tools; least-privilege tools                   |
| Cost overrun                       | `maxBudgetUsd`, `maxTurns`, Haiku default, trimmed scan output |
| Leaked API key                     | Env vars / GitHub Secrets only; never committed                |
| Over-promising                     | Never claim legal compliance                                   |
| Future job IP clause               | Build on own time and laptop; declare as prior work on offer   |
