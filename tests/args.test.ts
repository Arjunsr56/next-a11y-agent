import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CliError, DEFAULTS, parseCliArgs } from "../src/args.js";

function run(argv: string[]) {
  const result = parseCliArgs(argv);
  assert.equal(result.kind, "run");
  return result.kind === "run" ? result.options : DEFAULTS;
}

describe("parseCliArgs", () => {
  it("uses safe defaults when no flags are given", () => {
    assert.deepEqual(run([]), DEFAULTS);
  });

  it("reads every flag", () => {
    const options = run([
      "--url",
      "https://example.com/",
      "--pages",
      "/, /journal ,/journal",
      "--mode",
      "fix",
      "--budget",
      "0.25",
      "--model",
      "claude-sonnet-4-6",
    ]);
    assert.deepEqual(options, {
      url: "https://example.com",
      pages: ["/", "/journal"],
      mode: "fix",
      budget: 0.25,
      model: "claude-sonnet-4-6",
    });
  });

  it("supports short flags", () => {
    const options = run(["-u", "http://localhost:4000", "-p", "/ask", "-m", "report", "-b", "1"]);
    assert.equal(options.url, "http://localhost:4000");
    assert.deepEqual(options.pages, ["/ask"]);
    assert.equal(options.budget, 1);
  });

  it("returns help and version requests", () => {
    assert.deepEqual(parseCliArgs(["--help"]), { kind: "help" });
    assert.deepEqual(parseCliArgs(["-v"]), { kind: "version" });
  });

  const badInputs: Array<[string, string[]]> = [
    ["an unknown flag", ["--colour", "red"]],
    ["an unknown mode", ["--mode", "delete"]],
    ["a non-numeric budget", ["--budget", "cheap"]],
    ["a zero budget", ["--budget", "0"]],
    ["a budget above the cap", ["--budget", "50"]],
    ["a URL without protocol", ["--url", "localhost:3000"]],
    ["a non-http URL", ["--url", "ftp://example.com"]],
    ["a page without a leading slash", ["--pages", "journal"]],
    ["empty pages", ["--pages", " , "]],
  ];

  for (const [label, argv] of badInputs) {
    it(`rejects ${label}`, () => {
      assert.throws(() => parseCliArgs(argv), CliError);
    });
  }
});
