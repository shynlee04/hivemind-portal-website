"use client";

import React, { useEffect, useState } from "react";
import type { WokReactorStageProps } from "../../types/portal";
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
  const allNodes = REACTOR_NODE_IDS.map((id) =>
    getReactorNodeMetadata(id, locale)
  );

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
        backgroundColor: "#080B10",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "360px",
          backgroundColor: "#080B10",
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

        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "14px",
            right: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            pointerEvents: "none",
            gap: "8px",
            flexWrap: "wrap",
          }}
        >
          <code
            style={{
              padding: "6px 10px",
              backgroundColor: "rgba(8, 11, 16, 0.88)",
              color: activeMeta.accentHex,
              fontSize: "14px",
              fontWeight: 600,
              borderRadius: "4px",
            }}
          >
            {activeMeta.horizonBadge} · {activeMeta.wireProtocol}
          </code>
          <code
            style={{
              padding: "6px 10px",
              backgroundColor: "rgba(8, 11, 16, 0.88)",
              color: "#94A3B8",
              fontSize: "14px",
              borderRadius: "4px",
            }}
          >
            {locale === "vi"
              ? "Kéo để xoay 3D · Chạm nút để đổi Harness"
              : "Drag to orbit 3D · Select node to inspect wire"}
          </code>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#0D131D",
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
              ? "Bộ chọn nút Lò phản ứng Cyber-Wok"
              : "Cyber-Wok Reactor Node Selector"
          }
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            backgroundColor: "#080B10",
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
                  justifyContent: "center",
                  gap: "2px",
                  backgroundColor: "transparent",
                  border: "none",
                  borderBottom: `3px solid ${
                    isSelected ? node.accentHex : "transparent"
                  }`,
                  color: "#EEF2F6",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: isSelected ? node.accentHex : "#EEF2F6",
                  }}
                >
                  {node.label}
                </span>
                <code
                  style={{
                    fontSize: "14px",
                    color: "#94A3B8",
                  }}
                >
                  {node.modelIds.join(" · ")}
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
            backgroundColor: "#080B10",
            padding: "8px 12px",
            borderRadius: "6px",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontSize: "14px",
              color: "#10B981",
              whiteSpace: "pre-wrap",
            }}
          >
            <code>$ {activeMeta.sampleCommand}</code>
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
                    color: activeMeta.accentHex,
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
