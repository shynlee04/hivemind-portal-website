"use client";

import { useState } from "react";
import {
  exampleChangePackage,
  openLeaf,
  type TraceLeaf,
} from "@/modules/trace-explorer";
import type { Locale, PortalDictionary } from "@/modules/locale-dictionary";
import styles from "./substrate.module.css";

function LeafPanel({ leaf }: { readonly leaf: TraceLeaf }) {
  if (leaf.kind === "diff") {
    return (
      <div>
        {leaf.files.map((file) => (
          <div key={file.path} className={styles.leafFile}>
            <p className={styles.leafPath}>{file.path}</p>
            <p className={styles.leafMeta}>
              {file.sha256} · {file.actor}
            </p>
            {file.lines.map((line, index) => (
              <p
                key={index}
                className={`${styles.diffLine} ${line.op === "+"
                  ? styles.diffAdd
                  : line.op === "-"
                    ? styles.diffDel
                    : line.op === "@"
                      ? styles.diffHunk
                      : ""
                  }`}
              >
                {line.op === " " ? " " : line.op === "@" ? "" : line.op}
                {line.text}
              </p>
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (leaf.kind === "actors") {
    return (
      <div>
        {leaf.actors.map((actor) => (
          <div key={actor.session} className={styles.leafActor}>
            <p className={styles.leafActorName}>
              {actor.session} · {actor.harness}
            </p>
            <p className={styles.leafMeta}>{actor.touched.join(", ")}</p>
            {actor.checks.map((check) => (
              <p key={check.name} className={styles.leafCheck}>
                <span
                  className={check.result === "pass" ? styles.checkPass : ""}
                >
                  {check.name} · {check.result}
                </span>
              </p>
            ))}
            <p className={styles.leafConclusion}>{actor.conclusion}</p>
          </div>
        ))}
      </div>
    );
  }

  if (leaf.kind === "evidence") {
    return (
      <div>
        {leaf.checks.map((check) => (
          <div key={check.name} className={styles.evidenceCheck}>
            <p
              className={
                check.state === "stale"
                  ? styles.evidenceStale
                  : styles.evidenceCurrent
              }
            >
              {check.name} · {check.state}
            </p>
            <p className={styles.evidenceReason}>{check.reason}</p>
          </div>
        ))}
      </div>
    );
  }

  return <p className={styles.leafMeta}>{leaf.handle}</p>;
}

export function SubstrateTrace({
  dict,
  locale,
}: {
  readonly dict: PortalDictionary;
  readonly locale: Locale;
}) {
  const section = dict.substrate.trace;
  const change = exampleChangePackage(locale);
  const defaultHandle =
    change.rows.find((row) => row.branch === "evidence")?.handle ??
    change.rows[0]!.handle;
  const [handle, setHandle] = useState<string>(defaultHandle);
  const leaf = openLeaf(handle, locale);

  return (
    <section className={styles.trace} id="trace">
      <div className="shell">
        <div className={styles.traceLeft}>
          <h2 className={styles.traceHeading} data-reveal>
            {section.heading}
          </h2>
          <p className={styles.traceBody} data-reveal style={{ "--rd": 1 } as import("react").CSSProperties}>
            {section.body}
          </p>
        </div>
        <div className={styles.traceRight} data-reveal style={{ "--rd": 2 } as import("react").CSSProperties}>
          <pre className={styles.demo} data-ui>
            <p className={styles.demoTitle}>{section.demoTitle}</p>
            <p className={styles.demoSignal}>{change.signal}</p>
            <p className={styles.demoCall}>{change.call}</p>
            <p className={styles.demoSection}>{section.packageLabel}</p>
            {change.rows.map((row) => (
              <button
                key={row.handle}
                type="button"
                className={styles.branchRow}
                data-selected={row.handle === handle ? "" : undefined}
                aria-pressed={row.handle === handle}
                onClick={() => setHandle(row.handle)}
              >
                <span className={styles.branchLabel}>{row.label}</span>
                <span className={styles.branchCount}>{row.count}</span>
                <span className={styles.branchSummary}>{row.summary}</span>
              </button>
            ))}
            <p className={styles.demoSection}>{section.leafLabel}</p>
            <div className={styles.leaf}>
              <LeafPanel leaf={leaf} />
            </div>
            <p className={styles.demoNote}>{section.demoNote}</p>
          </pre>
        </div>
      </div>
    </section>
  );
}
