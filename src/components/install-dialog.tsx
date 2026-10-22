"use client";

import { useState } from "react";
import {
  buildInstallPlan,
  type InstallScope,
  type PluginChoice,
} from "@/modules/ecosystem";
import type { PortalDictionary } from "@/modules/locale-dictionary";
import { CopyButton } from "./copy-button";
import styles from "./install-dialog.module.css";

type InstallDict = PortalDictionary["home"]["install"];
type CommonDict = PortalDictionary["common"];

const PLUGIN_CHOICES: ReadonlyArray<PluginChoice> = [
  "steward",
  "substrate",
  "both",
];
const SCOPES: ReadonlyArray<InstallScope> = ["global", "project"];

export function InstallDialog({
  install,
  common,
  initialPlugin = "both",
  initialScope = "global",
}: {
  readonly install: InstallDict;
  readonly common: CommonDict;
  readonly initialPlugin?: PluginChoice;
  readonly initialScope?: InstallScope;
}) {
  const [plugin, setPlugin] = useState<PluginChoice>(initialPlugin);
  const [scope, setScope] = useState<InstallScope>(initialScope);

  const steps = buildInstallPlan(plugin, scope);
  const allText = steps.map((step) => step.text).join("\n");

  return (
    <div className={styles.dialog} data-ui>
      <p className={styles.title}>{install.dialogTitle}</p>

      <p className={styles.groupLabel}>{install.pluginLabel}</p>
      <div className={styles.segmented} role="group" aria-label={install.pluginLabel}>
        {PLUGIN_CHOICES.map((choice) => (
          <button
            key={choice}
            type="button"
            className={styles.segment}
            aria-pressed={plugin === choice}
            data-selected={plugin === choice ? "" : undefined}
            onClick={() => setPlugin(choice)}
          >
            {install.plugins[choice]}
          </button>
        ))}
      </div>

      <p className={styles.groupLabel}>{install.scopeLabel}</p>
      <div className={styles.segmented} role="group" aria-label={install.scopeLabel}>
        {SCOPES.map((option) => (
          <button
            key={option}
            type="button"
            className={styles.segment}
            aria-pressed={scope === option}
            data-selected={scope === option ? "" : undefined}
            onClick={() => setScope(option)}
          >
            {install.scopes[option]}
          </button>
        ))}
      </div>

      <p className={styles.groupLabel}>{install.stepsLabel}</p>
      <ol className={styles.steps}>
        {steps.map((step) => (
          <li key={`${step.kind}-${step.text}`} className={styles.step}>
            <div className={styles.stepCode}>
              <pre>
                <code>{step.text}</code>
              </pre>
              <CopyButton
                text={step.text}
                label={common.copy}
                copiedLabel={common.copied}
                ariaLabel={common.copyAria}
                className={styles.stepCopy}
              />
            </div>
            <p className={styles.stepNote}>{install.notes[step.note]}</p>
          </li>
        ))}
      </ol>

      <CopyButton
        text={allText}
        label={common.copyAll}
        copiedLabel={common.copied}
        ariaLabel={common.copyAll}
        className={`btn-hex btn-hex--invert ${styles.copyAll}`}
      />
    </div>
  );
}
