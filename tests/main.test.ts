import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { main, type Io } from "../src/main.js";

/** Collects output instead of printing it. */
function fakeIo() {
  const out: string[] = [];
  const err: string[] = [];
  const io: Io = { out: (m) => out.push(m), err: (m) => err.push(m) };
  return { io, out, err };
}

describe("main", () => {
  it("prints help and exits 0", async () => {
    const { io, out } = fakeIo();
    assert.equal(await main(["--help"], io), 0);
    assert.match(out.join("\n"), /Usage:/);
  });

  it("prints the package version", async () => {
    const { io, out } = fakeIo();
    assert.equal(await main(["--version"], io), 0);
    assert.match(out[0] ?? "", /^\d+\.\d+\.\d+/);
  });

  it("shows validated options for a normal run", async () => {
    const { io, out } = fakeIo();
    assert.equal(await main(["--pages", "/journal"], io), 0);
    assert.match(out.join("\n"), /pages: {2}\/journal/);
  });

  it("explains bad input and exits 1", async () => {
    const { io, err } = fakeIo();
    assert.equal(await main(["--mode", "nope"], io), 1);
    assert.match(err.join("\n"), /--mode must be one of/);
  });
});
