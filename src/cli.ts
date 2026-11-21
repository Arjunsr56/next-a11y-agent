#!/usr/bin/env node
// Entry point for the `next-a11y-agent` command. Kept tiny on purpose:
// all real logic lives in main.ts so it can be tested.
import { main } from "./main.js";

process.exitCode = await main(process.argv.slice(2));
