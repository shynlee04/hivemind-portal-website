"use client";

import type {
  ReactorNodeId,
  WokReactorStageProps,
} from "../../types/portal";
import { renderDeterministicFallbackSvg } from "./fallback-svg";
import {
  getReactorNodeMetadata,
  REACTOR_NODE_IDS,
  REACTOR_NODES,
} from "./reactor-nodes";
import { ThreeWokCanvas } from "./three-wok-canvas";

export {
  getReactorNodeMetadata,
  REACTOR_NODE_IDS,
  REACTOR_NODES,
  renderDeterministicFallbackSvg,
};

export function WokReactorStage({
  activeHarness,
  activeHorizon = "all",
  reducedMotion = false,
  locale = "en",
  onSelectNode,
}: WokReactorStageProps) {
  const activeMeta = getReactorNodeMetadata(activeHarness, locale);
  const stageHeader =
    locale === "vi"
      ? "BUỒNG LÒ CYBER-WOK 3D · ĐỒNG BỘ ĐA HARNESS"
      : "3D CYBER-WOK REACTOR · MULTI-HARNESS TELEMETRY";

  const modelsLabel = locale === "vi" ? "MÔ HÌNH:" : "MODELS:";
  const wireLabel = locale === "vi" ? "GIAO THỨC:" : "WIRE SEAM:";
  const commandLabel = locale === "vi" ? "LỆNH TUI:" : "TUI COMMAND:";

  return (
    <section
      aria-label={stageHeader}
      data-testid="wok-reactor-stage"
      data-active-harness={activeHarness}
      data-active-horizon={activeHorizon}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      data-locale={locale}
      className="cyber-chamfer"
      style={{
        minHeight: "520px",
        aspectRatio: "16 / 10",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "var(--bg-wok-iron)",
        border: "1px solid var(--border-forge-brass)",
        borderRadius: "2px",
        padding: "1rem",
        gap: "0.85rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5rem",
          borderBottom: "1px solid var(--border-forge-brass)",
          paddingBottom: "0.65rem",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            fontWeight: 700,
            color: "var(--accent-wok-gold)",
          }}
        >
          {stageHeader}
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            padding: "0.15rem 0.5rem",
            backgroundColor: "var(--bg-smoked-basalt)",
            border: `1px solid ${activeMeta.accentHex}`,
            color: activeMeta.accentHex,
          }}
        >
          {activeMeta.horizonBadge}
        </span>
      </div>

      <div
        role="group"
        aria-label={
          locale === "vi" ? "Chọn nút Lò phản ứng" : "Reactor Node Selector"
        }
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(135px, 1fr))",
          gap: "0.5rem",
        }}
      >
        {REACTOR_NODE_IDS.map((nodeId: ReactorNodeId) => {
          const meta = getReactorNodeMetadata(nodeId, locale);
          const isSelected = nodeId === activeHarness;
          return (
            <button
              key={nodeId}
              type="button"
              aria-pressed={isSelected}
              data-node-selector={nodeId}
              onClick={() => onSelectNode?.(nodeId)}
              className="touch-target focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
              style={{
                minHeight: "44px",
                minWidth: "44px",
                padding: "0.45rem 0.65rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                backgroundColor: isSelected
                  ? "var(--bg-scroll-lacquer)"
                  : "var(--bg-smoked-basalt)",
                border: isSelected
                  ? `1px solid ${meta.accentHex}`
                  : "1px solid var(--border-forge-brass)",
                borderRadius: "2px",
                color: "var(--text-parchment)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: isSelected ? meta.accentHex : "var(--text-parchment)",
                }}
              >
                {meta.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--text-ash-slate)",
                }}
              >
                {meta.modelIds.join(" · ")}
              </span>
            </button>
          );
        })}
      </div>

      <div
        style={{
          flex: 1,
          minHeight: "250px",
          border: "1px solid var(--border-forge-brass)",
          borderRadius: "2px",
          backgroundColor: "#080B10",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <ThreeWokCanvas
          activeHarness={activeHarness}
          activeHorizon={activeHorizon}
          reducedMotion={reducedMotion}
          locale={locale}
          onSelectNode={onSelectNode}
        />
      </div>

      <div
        data-testid="reactor-telemetry-readout"
        style={{
          backgroundColor: "var(--bg-smoked-basalt)",
          border: "1px solid var(--border-forge-brass)",
          borderRadius: "2px",
          padding: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: activeMeta.accentHex,
            }}
          >
            {activeMeta.roleBadge}
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--text-parchment)",
            }}
          >
            {modelsLabel} {activeMeta.modelIds.join(", ")}
          </span>
        </div>

        <p
          style={{
            margin: 0,
            fontSize: "0.875rem",
            color: "var(--text-parchment)",
          }}
        >
          {activeMeta.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(175px, 1fr))",
            gap: "0.45rem",
            paddingTop: "0.25rem",
          }}
        >
          {activeMeta.telemetryMetrics.map((metric) => (
            <div
              key={metric.label}
              style={{
                padding: "0.35rem 0.5rem",
                backgroundColor: "var(--bg-wok-iron)",
                border: "1px solid var(--border-forge-brass)",
                borderRadius: "2px",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6875rem",
                  color: "var(--text-ash-slate)",
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "var(--accent-jade-wire)",
                }}
              >
                {metric.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "0.5rem",
            borderTop: "1px solid var(--border-forge-brass)",
            paddingTop: "0.45rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-ash-slate)",
          }}
        >
          <span>
            {wireLabel}{" "}
            <strong style={{ color: "var(--text-parchment)" }}>
              {activeMeta.wireProtocol}
            </strong>
          </span>
          <span>
            {commandLabel}{" "}
            <code style={{ color: "var(--accent-wok-gold)" }}>
              {activeMeta.sampleCommand}
            </code>
          </span>
        </div>
      </div>
    </section>
  );
}
