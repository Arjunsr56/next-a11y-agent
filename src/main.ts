import { CliError, parseCliArgs } from "./args.js";
import { HELP_TEXT } from "./help.js";
import { getVersion } from "./version.js";

/** Where output goes. Injected so tests can capture it instead of printing. */
export interface Io {
  out: (message: string) => void;
  err: (message: string) => void;
}

const consoleIo: Io = {
  out: (message) => console.log(message),
  err: (message) => console.error(message),
};

/**
 * The whole program. Returns an exit code (0 = success) instead of calling
 * process.exit(), which keeps it testable.
 */
export async function main(argv: string[], io: Io = consoleIo): Promise<number> {
  try {
    const result = parseCliArgs(argv);

    if (result.kind === "help") {
      io.out(HELP_TEXT);
      return 0;
    }
    if (result.kind === "version") {
      io.out(getVersion());
      return 0;
    }

    const { options } = result;
    io.out("next-a11y-agent: options OK");
    io.out(`  url:    ${options.url}`);
    io.out(`  pages:  ${options.pages.join(", ")}`);
    io.out(`  mode:   ${options.mode}`);
    io.out(`  budget: $${options.budget.toFixed(2)}`);
    io.out(`  model:  ${options.model}`);
    io.out("\nScanning is not built yet. It arrives in milestone M1.");
    return 0;
  } catch (err) {
    if (err instanceof CliError) {
      io.err(`Error: ${err.message}`);
      io.err("Run with --help to see all options.");
      return 1;
    }
    // Unexpected bug: show the full error so it can be reported.
    io.err(err instanceof Error ? (err.stack ?? err.message) : String(err));
    return 2;
  }
}
