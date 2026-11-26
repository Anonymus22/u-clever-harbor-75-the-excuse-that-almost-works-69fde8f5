import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line a gamer texts the boss to skip work on GTA 6 launch week.
// Mundane, specific, almost believable: a clamped car and a release office
// that doesn't open till Friday. The car trouble is the quiet GTA wink.
const EXCUSE =
  "Sorry, my car's been clamped and the release office doesn't open till Friday, working from home today.";

// Competition gate (RULES.txt): a one-line excuse, at most 140 chars and
// at most 20 words. These constants are the single source of truth for
// both the checks and the error messages below.
const MAX_CHARS = 140;
const MAX_WORDS = 20;

function main(): void {
  // Gate: 1-140 chars, at most 20 words, single line, not only whitespace.
  if (EXCUSE.length < 1 || EXCUSE.length > MAX_CHARS) {
    throw new Error(`excuse must be 1-${MAX_CHARS} chars, got ${EXCUSE.length}`);
  }
  if (EXCUSE.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  const words = EXCUSE.trim().split(/\s+/);
  if (words.length > MAX_WORDS) {
    throw new Error(`excuse must be at most ${MAX_WORDS} words, got ${words.length}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), EXCUSE + "\n", "utf8");
}

main();
