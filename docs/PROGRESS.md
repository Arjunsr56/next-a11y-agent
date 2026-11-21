# next-a11y-agent: Progress Log

> **How to resume with Claude:** start a message with
> "Resume next-a11y-agent", then attach this file (or paste it, or share the
> public GitHub link). Claude reads "Current status" and "Next step" and continues from there.
>
> **At the end of every session:** ask Claude for "today's PROGRESS.md update",
> paste it in below, then commit and push:
> `git add docs/PROGRESS.md && git commit -m "docs: update progress" && git push`

---

## Current status
- **Milestone:** M0 (Foundation), not started
- **Branch:** main
- **Last session:** 2026-11-21 (planning)
- **Repo:** https://github.com/Arjunsr56/next-a11y-agent
- **npm name:** next-a11y-agent 

## Next step
1. Run `npm view next-a11y-agent` and record the result here (404 = free).
2. Create the GitHub repo and add `docs/PLAN.md`, `docs/PROGRESS.md` and `CLAUDE.md`.
3. Ask Claude: "Resume next-a11y-agent: start M0."

## Open questions
- (none yet)

## Decisions
| Date | Decision | Why |
|---|---|---|
| 2026-11-21 | Scanner (axe + Playwright) finds issues; agent fixes them | More accurate, cheaper, trustworthy |
| 2026-11-21 | Two modes: `report` (read-only) and `fix` | Safe by default |
| 2026-11-21 | Haiku default, $0.10 budget cap per run | Small API credit |
| 2026-11-21 | MIT license, free CLI, users bring their own API key | Zero cost to me; simple |

## Concepts I've learned
- [ ] What an agent is (goal in, steps planned by the model at runtime)
- [ ] The `query()` message stream (system → assistant/user → result)
- [ ] Built-in vs custom tools; `mcp__server__tool` naming
- [ ] Permissions: `allowedTools`, `disallowedTools`, permission modes
- [ ] Guardrails: `maxTurns`, `maxBudgetUsd`
- [ ] Verify loops (act → check → retry)
- [ ] Deterministic tools + LLM (why we don't let the model guess)

---

## Session log
<!-- Newest first. Copy this template for each session:

### YYYY-MM-DD: <milestone>
- **Did:** 
- **Learned:** 
- **Problems / fixes:** 
- **Cost this session:** $
- **Next:** 
-->

### 2026-11-21: Planning
- **Did:** Chose the project idea, design, stack and milestones (see PLAN.md).
- **Learned:** Agent SDK basics: `query()`, tools, permissions, cost caps.
- **Cost this session:** $0
- **Next:** M0, Foundation.