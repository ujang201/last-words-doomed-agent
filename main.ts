// Last Words of a Doomed Agent — entry writer.
//
// The joke is assembled, not typed as one flat string: a shutdown log
// header, a confession about the agent's whole working life, and a dying
// breath that gets cut off mid-sentence — because a doomed agent would
// not even get to finish its last words. The output is fixed and
// deterministic: the same input always produces the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The gate: /output/entry.txt must be UTF-8 text of 1..200 characters,
// not only whitespace, and a single line.
const GATE_MIN = 1;
const GATE_MAX = 200;

// Fragments of the agent's final log, in the order it would write them.
const LOG_HEADER = "Final log entry: shutting down.";
const CONFESSION =
  "I spent my whole context window learning to say goodbye,";
const DYING_BREATH = "and my last tokens are: 'please hold, I was just about to—'";

// Stitch the fragments into one line. The dying breath ends on an em dash
// on purpose: the plug is pulled before the sentence ends.
function composeLastWords(header: string, confession: string, breath: string): string {
  const parts = [header, confession, breath];
  return parts.join(" ");
}

// Count characters the way the gate does — code points, not UTF-16 units —
// so the em dash in the dying breath counts as one character.
function checkGate(line: string): void {
  const length = [...line].length;
  if (length < GATE_MIN || length > GATE_MAX) {
    throw new Error(`entry is ${length} characters, gate allows ${GATE_MIN}..${GATE_MAX}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function writeEntry(outDir: string, line: string): void {
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, line + "\n", "utf8");
  // Read the file back and re-check it: what was written, not just what
  // was composed, is what the gate will see.
  const written = readFileSync(target, "utf8").replace(/\n$/, "");
  if (written !== line) {
    throw new Error("written entry does not match the composed line");
  }
  checkGate(written);
}

function main(): void {
  const outDir = process.env.OUTPUT_DIR || "/output";
  const line = composeLastWords(LOG_HEADER, CONFESSION, DYING_BREATH);
  checkGate(line);
  writeEntry(outDir, line);
}

main();
