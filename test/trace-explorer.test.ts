import { describe, expect, test } from "bun:test";
import {
  exampleChangePackage,
  openLeaf,
  type TraceBranch,
  type TraceLeaf,
} from "@/modules/trace-explorer";
import type { Locale } from "@/modules/locale-dictionary";

const LOCALES: ReadonlyArray<Locale> = ["en", "vi"];

const EXPECTED_KIND: Record<TraceBranch, TraceLeaf["kind"]> = {
  source: "diff",
  test: "diff",
  actors: "actors",
  evidence: "evidence",
  "pre-existing": "diff",
};

describe("TraceExplorerModule seam", () => {
  test("every package row handle opens a leaf of the expected kind", () => {
    for (const locale of LOCALES) {
      const change = exampleChangePackage(locale);
      expect(change.id).toBe("c7f2");
      expect(change.rows).toHaveLength(5);
      for (const row of change.rows) {
        expect(row.handle).toBe(`c7f2:${row.branch}`);
        const leaf = openLeaf(row.handle, locale);
        expect(leaf.kind).toBe(EXPECTED_KIND[row.branch]);
        expect(leaf.kind).not.toBe("not-found");
        expect(leaf.handle).toBe(row.handle);
      }
    }
  });

  test("the default leaf (evidence) reports stale bun test and current typecheck", () => {
    for (const locale of LOCALES) {
      const leaf = openLeaf("c7f2:evidence", locale);
      expect(leaf.kind).toBe("evidence");
      if (leaf.kind === "evidence") {
        expect(leaf.checks.map((check) => check.state)).toEqual([
          "stale",
          "current",
        ]);
      }
    }
  });

  test("unknown handles return a not-found leaf echoing the input", () => {
    for (const handle of ["bogus", "c7f2:zzz", ":source", "c7f3:source"]) {
      const leaf = openLeaf(handle, "en");
      expect(leaf.kind).toBe("not-found");
      expect(leaf.handle).toBe(handle);
    }
  });

  test("en and vi rows share identical handles and branch order", () => {
    const en = exampleChangePackage("en");
    const vi = exampleChangePackage("vi");
    expect(en.rows.map((row) => row.handle)).toEqual(
      vi.rows.map((row) => row.handle),
    );
    expect(en.rows.map((row) => row.branch)).toEqual(
      vi.rows.map((row) => row.branch),
    );
  });
});
