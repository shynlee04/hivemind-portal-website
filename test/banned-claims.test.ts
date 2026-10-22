import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();

const BANNED = [
  "swe-2-max",
  "argon-4-high",
  "glm-5.3-flash",
  "deepseek-4.1-flash",
  "Cyber-Wok",
  "fbm1",
  "keepSlotForResume",
  "ModelSlotChain",
  "Payload",
  "hmoc-steward-acp@0.2",
  "devin_run",
  "devin_doctor",
  "hmoc-steward-acp@0.3",
  "tools denied",
  "công cụ bị chặn",
];

function collectFiles(dir: string): Array<string> {
  const files: Array<string> = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) {
      files.push(...collectFiles(path));
    } else {
      files.push(path);
    }
  }
  return files;
}

describe("banned stale claims", () => {
  test("no banned claim appears anywhere in src/ or the dictionaries", () => {
    const files = collectFiles(join(ROOT, "src"));
    for (const file of files) {
      const content = readFileSync(file, "utf8");
      for (const claim of BANNED) {
        expect(
          content.includes(claim),
          `${file} contains banned claim "${claim}"`,
        ).toBe(false);
      }
    }
  });
});
