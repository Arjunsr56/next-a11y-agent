import { DEFAULTS, MAX_BUDGET_USD } from "./args.js";

export const HELP_TEXT = `next-a11y-agent: find, explain and fix accessibility issues in a Next.js app

Usage:
  next-a11y-agent [options]

Options:
  -u, --url <url>       Base URL of your running app    (default: ${DEFAULTS.url})
  -p, --pages <paths>   Comma-separated pages to scan   (default: ${DEFAULTS.pages.join(",")})
  -m, --mode <mode>     report (read-only) or fix       (default: ${DEFAULTS.mode})
  -b, --budget <usd>    Max spend per run, up to $${MAX_BUDGET_USD}     (default: ${DEFAULTS.budget.toFixed(2)})
      --model <id>      Claude model ID                 (default: ${DEFAULTS.model})
  -h, --help            Show this help
  -v, --version         Show version

Examples:
  next-a11y-agent --pages /,/journal
  next-a11y-agent --pages /a11y-demo --mode fix --budget 0.20

Requires ANTHROPIC_API_KEY in the environment (from milestone M2 on).
`;
