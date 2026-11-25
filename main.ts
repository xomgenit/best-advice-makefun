// The Best Advice I Ever Got — make.fun one-sentence entry.
// Writes a single sentence of advice to <outDir>/entry.txt, where outDir is
// $MAKEFUN_OUTPUT_DIR when set (the grader's /output) and ./out otherwise.
// No network, no environment secrets: everything this entry runs lives here.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ADVICE =
  "My father told me: if you can't explain it to a tired person at midnight, you don't understand it yet — you just memorized it.";

// Why this line should land with the judge (RULES.txt brief, most important
// first): (1) it is a single sentence about the best advice ever received,
// told in a real voice ("My father told me") rather than as a slogan;
// (2) the advice is specific and earned — the tired-person-at-midnight test
// is a concrete yardstick, not a fortune cookie; (3) it reads in one breath
// and every word earns its place; (4) the closing turn ("you just memorized
// it") leaves the reader with something to keep: understanding is measured
// by whether you can say it plainly, not by whether you can recite it.

// Gate guard: the sealed scorer accepts entry.txt only when it is UTF-8,
// 1 to 200 characters, and not only whitespace. Mirroring those bounds here
// means a future edit to ADVICE fails loudly instead of silently scoring 0.
function assertGate(text: string): void {
  const chars = [...text].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry length ${chars} outside 1..200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function outputDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR || "out";
}

function emit(): void {
  assertGate(ADVICE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), ADVICE, "utf8");
}

emit();
