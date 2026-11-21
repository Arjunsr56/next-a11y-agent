# next-a11y-agent

> Find, explain and fix accessibility issues in a Next.js app with a Claude agent.

**Status:** early development (milestone M0). Not on npm yet.

## How it will work

1. A real browser (Playwright) loads your pages and **axe-core**, the standard accessibility engine, finds issues.
2. A Claude agent ([Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview)) traces each issue to your JSX, explains it and, in `fix` mode, fixes it.
3. The agent **re-scans to verify** each fix.

The scanner finds the problems and Claude fixes them, so the model never guesses what's wrong.

## Usage (preview)

```bash
next-a11y-agent --pages /,/journal               # report mode: read-only
next-a11y-agent --pages /a11y-demo --mode fix    # edits code, then re-scans
next-a11y-agent --help
```

## Safety by design

- `report` mode never changes files.
- `fix` mode only runs on a clean git tree, so every change is reviewable with `git diff`.
- The agent has no shell and no web access, plus turn and budget caps (default $0.10 per run).

> This tool helps find and fix common accessibility issues. It does not guarantee WCAG, ADA or any legal compliance.

## Development

Requires Node.js 22+.

```bash
npm install
npm run dev -- --help   # run from source
npm test                # unit tests
npm run check           # everything CI runs: lint, format, typecheck, test, build
```

## License

[MIT](./LICENSE)
