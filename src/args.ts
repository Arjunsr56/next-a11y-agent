import { parseArgs } from "node:util";

/** The two ways the tool can run. `report` never changes files. */
export const MODES = ["report", "fix"] as const;
export type Mode = (typeof MODES)[number];

/** Fully validated options the rest of the program can trust. */
export interface CliOptions {
  url: string;
  pages: string[];
  mode: Mode;
  budget: number;
  model: string;
}

export const DEFAULTS: CliOptions = {
  url: "http://localhost:3000",
  pages: ["/"],
  mode: "report",
  budget: 0.1,
  model: "claude-haiku-5-5",
};

/** Hard ceiling so a typo like `--budget 50` can't burn through API credit. */
export const MAX_BUDGET_USD = 5;

export type ParseResult =
  { kind: "run"; options: CliOptions } | { kind: "help" } | { kind: "version" };

/** A user-facing input error (bad flag or bad value). */
export class CliError extends Error {
  override name = "CliError";
}

/**
 * Turns raw command-line arguments into validated options.
 * Pure function: no printing, no exiting, so it is easy to test.
 */
export function parseCliArgs(argv: string[]): ParseResult {
  let values;
  try {
    ({ values } = parseArgs({
      args: argv,
      strict: true,
      allowPositionals: false,
      options: {
        url: { type: "string", short: "u" },
        pages: { type: "string", short: "p" },
        mode: { type: "string", short: "m" },
        budget: { type: "string", short: "b" },
        model: { type: "string" },
        help: { type: "boolean", short: "h" },
        version: { type: "boolean", short: "v" },
      },
    }));
  } catch (err) {
    throw new CliError(err instanceof Error ? err.message : String(err));
  }

  if (values.help) return { kind: "help" };
  if (values.version) return { kind: "version" };

  return {
    kind: "run",
    options: {
      url: parseUrl(values.url ?? DEFAULTS.url),
      pages: values.pages === undefined ? DEFAULTS.pages : parsePages(values.pages),
      mode: parseMode(values.mode ?? DEFAULTS.mode),
      budget: values.budget === undefined ? DEFAULTS.budget : parseBudget(values.budget),
      model: values.model ?? DEFAULTS.model,
    },
  };
}

function parseUrl(raw: string): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new CliError(`--url must be a full URL like http://localhost:3000 (got "${raw}")`);
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new CliError(`--url must start with http:// or https:// (got "${raw}")`);
  }
  // Drop a trailing slash so "http://x/" + "/journal" doesn't become "//journal".
  return url.origin + url.pathname.replace(/\/+$/, "");
}

function parsePages(raw: string): string[] {
  const pages = raw
    .split(",")
    .map((p) => p.trim())
    .filter((p) => p.length > 0);
  if (pages.length === 0) {
    throw new CliError("--pages needs at least one path, e.g. --pages /,/journal");
  }
  for (const page of pages) {
    if (!page.startsWith("/")) {
      throw new CliError(`Each page must start with "/" (got "${page}")`);
    }
  }
  return [...new Set(pages)];
}

function parseMode(raw: string): Mode {
  if ((MODES as readonly string[]).includes(raw)) return raw as Mode;
  throw new CliError(`--mode must be one of: ${MODES.join(", ")} (got "${raw}")`);
}

function parseBudget(raw: string): number {
  const budget = Number(raw);
  if (!Number.isFinite(budget) || budget <= 0) {
    throw new CliError(`--budget must be a positive number of US dollars (got "${raw}")`);
  }
  if (budget > MAX_BUDGET_USD) {
    throw new CliError(`--budget is capped at $${MAX_BUDGET_USD} per run (got "${raw}")`);
  }
  return budget;
}
