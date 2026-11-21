import { readFileSync } from "node:fs";

/**
 * Reads the version from package.json so there is only one source of truth.
 * Works from both src/ (dev) and dist/ (published): each is one level below the root.
 */
export function getVersion(): string {
  const pkgUrl = new URL("../package.json", import.meta.url);
  const pkg = JSON.parse(readFileSync(pkgUrl, "utf8")) as { version?: string };
  return pkg.version ?? "0.0.0";
}
