"use client";

import React, { useEffect, useState } from "react";
import type { WokReactorStageProps } from "../../types/portal";
import {
  NEO_TOKYO_NODE_HEX,
  renderDeterministicFallbackSvg,
} from "./fallback-svg";
import {
  getReactorNodeMetadata,
  REACTOR_NODE_IDS,
  REACTOR_NODES,
} from "./reactor-nodes";
import { ThreeWokCanvas } from "./three-wok-canvas";

export {
  getReactorNodeMetadata,
  NEO_TOKYO_NODE_HEX,
  REACTOR_NODE_IDS,
  REACTOR_NODES,
  renderDeterministicFallbackSvg,
};

function stripMiddleDots(input: string, replacement = " / "): string {
  return input.replace(/\s*·\s*/g, replacement);
}

export function WokReactorStage({
  activeHarness,
  activeHorizon = "all",
  reducedMotion = false,
  locale = "en",
  onSelectNode,
}: WokReactorStageProps): React.JSX.Element {
  const [mountedOnClient, setMountedOnClient] = useState(false);
  const [osPrefersReducedMotion, setOsPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMountedOnClient(true);
    if (
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function"
    ) {
      const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
      setOsPrefersReducedMotion(mql.matches);
      const listener = (e: MediaQueryListEvent) =>
        setOsPrefersReducedMotion(e.matches);
      mql.addEventListener("change", listener);
      return () => mql.removeEventListener("change", listener);
    }
    return undefined;
  }, []);

  const shouldUseFallback =
    Boolean(reducedMotion) || osPrefersReducedMotion || !mountedOnClient;
  const activeMeta = getReactorNodeMetadata(activeHarness, locale);
  const activeAccentHex = NEO_TOKYO_NODE_HEX[activeHarness];
  const allNodes = REACTOR_NODE_IDS.map((id) => ({
    ...getReactorNodeMetadata(id, locale),
    cyberAccentHex: NEO_TOKYO_NODE_HEX[id],
  }));

  const fallbackSvgMarkup = shouldUseFallback
    ? renderDeterministicFallbackSvg({
        activeHarness,
        activeHorizon,
        reducedMotion: true,
        locale,
      })
    : "";

  return (
    <div
      data-ui="wok-reactor-stage"
      data-testid="wok-reactor-stage"
      data-active-harness={activeHarness}
      data-active-horizon={activeHorizon}
      data-reduced-motion={
        Boolean(reducedMotion) || osPrefersReducedMotion ? "true" : "false"
      }
      data-locale={locale}
      style={{
        minHeight: "520px",
        aspectRatio: "16 / 10",
        width: "100%",
        backgroundColor: "#05060A",
        border: `1px solid ${activeAccentHex}44`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        borderRadius: "8px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
          padding: "10px 14px",
          backgroundColor: "#0B0E17",
          borderBottom: "1px solid #151C2C",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <code
          style={{
            color: activeAccentHex,
            fontSize: "14px",
            fontWeight: 700,
          }}
        >
          {stripMiddleDots(activeMeta.horizonBadge)} / {activeMeta.wireProtocol}
        </code>
        <code
          style={{
            color: "#94A3B8",
            fontSize: "14px",
          }}
        >
          {locale === "vi"
            ? "Kéo xoay quỹ đạo 3D / Chọn nút khóa tín hiệu"
            : "Drag 3D orbital core / Select node"}
        </code>
      </div>

      <div
        style={{
          position: "relative",
          width: "100%",
          height: "300px",
          overflow: "hidden",
          backgroundColor: "#05060A",
          flexShrink: 0,
        }}
      >
        {shouldUseFallback ? (
          <div
            data-testid="wok-deterministic-fallback-container"
            style={{ width: "100%", height: "100%" }}
            dangerouslySetInnerHTML={{ __html: fallbackSvgMarkup }}
          />
        ) : (
          <ThreeWokCanvas
            activeHarness={activeHarness}
            activeHorizon={activeHorizon}
            locale={locale}
            onSelectNode={onSelectNode}
          />
        )}
      </div>

      <div
        style={{
          backgroundColor: "#0B0E17",
          borderTop: "1px solid #151C2C",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div
          role="group"
          aria-label={
            locale === "vi"
              ? "Bộ chọn nút Lõi Chỉ Huy Neo-Tokyo"
              : "Neo-Tokyo Orbital Command Core Node Selector"
          }
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            backgroundColor: "#05060A",
            border: "1px solid #151C2C",
            padding: "6px",
            borderRadius: "6px",
          }}
        >
          {allNodes.map((node) => {
            const isSelected = node.id === activeHarness;
            return (
              <button
                key={node.id}
                type="button"
                aria-pressed={isSelected}
                data-node-selector={node.id}
                onClick={() => onSelectNode?.(node.id)}
                className="touch-target focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]"
                style={{
                  minHeight: "44px",
                  minWidth: "44px",
                  flex: "1 1 130px",
                  padding: "6px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "4px",
                  backgroundColor: isSelected
                    ? "rgba(11, 14, 23, 0.95)"
                    : "transparent",
                  border: "none",
                  borderBottom: `3px solid ${
                    isSelected ? node.cyberAccentHex : "transparent"
                  }`,
                  color: "#F8FAFC",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: isSelected ? node.cyberAccentHex : "#F8FAFC",
                  }}
                >
                  {node.label}
                </span>
                <code
                  style={{
                    fontSize: "14px",
                    color: isSelected ? "#E2E8F0" : "#94A3B8",
                  }}
                >
                  {node.modelIds.join(" / ")}
                </code>
              </button>
            );
          })}
        </div>

        <div
          data-testid="wok-active-telemetry"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            backgroundColor: "#05060A",
            border: "1px solid #151C2C",
            padding: "8px 12px",
            borderRadius: "6px",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#00E5A3",
              whiteSpace: "pre-wrap",
            }}
          >
            <code>$ {stripMiddleDots(activeMeta.sampleCommand, " ")}</code>
          </pre>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
            {activeMeta.telemetryMetrics.map((metric) => (
              <div
                key={metric.label}
                style={{ display: "flex", alignItems: "baseline", gap: "6px" }}
              >
                <span style={{ fontSize: "14px", color: "#94A3B8" }}>
                  {metric.label}
                </span>
                <code
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: activeAccentHex,
                  }}
                >
                  {metric.value}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
