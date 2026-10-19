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
  const allNodes = REACTOR_NODE_IDS.map((id) => ({
    ...getReactorNodeMetadata(id, locale),
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
        backgroundColor: "#07080B",
        border: "1px solid #1E222B",
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
          padding: "8px 12px",
          backgroundColor: "#0E1015",
          borderBottom: "1px solid #161920",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        <code
          style={{
            color: "#00E5FF",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          {stripMiddleDots(activeMeta.horizonBadge)} / {activeMeta.wireProtocol}
        </code>
        <code
          style={{
            color: "#A8B3C4",
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
          backgroundColor: "#07080B",
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
          backgroundColor: "#0E1015",
          borderTop: "1px solid #161920",
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
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
            gap: "6px",
            backgroundColor: "#07080B",
            padding: "5px",
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
                  flex: "1 1 120px",
                  padding: "6px 10px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  gap: "2px",
                  backgroundColor: isSelected ? "#F2F4F8" : "#161920",
                  border: "none",
                  borderRadius: "4px",
                  color: isSelected ? "#07080B" : "#A8B3C4",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: isSelected ? 500 : 400,
                    color: isSelected ? "#07080B" : "#F2F4F8",
                  }}
                >
                  {node.label}
                </span>
                <code
                  style={{
                    fontSize: "14px",
                    color: isSelected ? "#07080B" : "#A8B3C4",
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
            gap: "8px",
            backgroundColor: "#07080B",
            padding: "7px 10px",
            borderRadius: "6px",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#00E5FF",
              whiteSpace: "pre-wrap",
            }}
          >
            <code>$ {stripMiddleDots(activeMeta.sampleCommand, " ")}</code>
          </pre>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {activeMeta.telemetryMetrics.map((metric) => (
              <div
                key={metric.label}
                style={{ display: "flex", alignItems: "baseline", gap: "5px" }}
              >
                <span style={{ fontSize: "14px", color: "#A8B3C4" }}>
                  {metric.label}
                </span>
                <code
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#F2F4F8",
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
