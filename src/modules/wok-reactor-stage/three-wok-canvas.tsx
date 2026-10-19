"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { ReactorNodeId, WokReactorStageProps } from "../../types/portal";
import { renderDeterministicFallbackSvg } from "./fallback-svg";

function isReactorNodeId(value: unknown): value is ReactorNodeId {
  return (
    value === "devin" ||
    value === "antigravity" ||
    value === "freebuff" ||
    value === "substrate"
  );
}

export function ThreeWokCanvas(props: WokReactorStageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeHarnessRef = useRef<ReactorNodeId>(props.activeHarness);
  const onSelectNodeRef = useRef(props.onSelectNode);
  const [webglFailed, setWebglFailed] = useState(false);

  activeHarnessRef.current = props.activeHarness;
  onSelectNodeRef.current = props.onSelectNode;

  useEffect(() => {
    if (props.reducedMotion) {
      return;
    }
    const container = containerRef.current;
    if (!container || typeof window === "undefined") {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      const probeCanvas = document.createElement("canvas");
      const gl =
        probeCanvas.getContext("webgl2") ?? probeCanvas.getContext("webgl");
      if (!gl) {
        setWebglFailed(true);
        return;
      }
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const initialWidth = Math.max(container.clientWidth, 480);
    const initialHeight = Math.max(container.clientHeight, 300);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialWidth, initialHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = "";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#080B10");
    scene.fog = new THREE.FogExp2("#080B10", 0.06);

    const camera = new THREE.PerspectiveCamera(
      44,
      initialWidth / initialHeight,
      0.1,
      100
    );
    camera.position.set(0, 4.4, 6.8);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight("#F4EFE6", 0.7);
    const forgeLight = new THREE.PointLight("#F5A623", 18, 20);
    forgeLight.position.set(3.2, 4.5, 3.2);
    const jadeLight = new THREE.PointLight("#22D3EE", 14, 20);
    jadeLight.position.set(-3.4, 3.6, -2.4);
    const emberLight = new THREE.PointLight("#EF4444", 10, 14);
    emberLight.position.set(0, -1.2, 0);
    scene.add(ambientLight, forgeLight, jadeLight, emberLight);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    const wokGroup = new THREE.Group();
    scene.add(wokGroup);

    const lathePoints = [
      new THREE.Vector2(0.0, -1.05),
      new THREE.Vector2(1.0, -0.95),
      new THREE.Vector2(2.05, -0.52),
      new THREE.Vector2(2.75, 0.12),
      new THREE.Vector2(3.05, 0.55),
    ];
    const wokBasinGeo = new THREE.LatheGeometry(lathePoints, 48);
    geometries.push(wokBasinGeo);
    const wokBasinMat = new THREE.MeshStandardMaterial({
      color: "#111622",
      roughness: 0.42,
      metalness: 0.78,
      side: THREE.DoubleSide,
    });
    materials.push(wokBasinMat);
    const wokBasinMesh = new THREE.Mesh(wokBasinGeo, wokBasinMat);
    wokGroup.add(wokBasinMesh);

    const wokRimGeo = new THREE.TorusGeometry(3.05, 0.075, 18, 72);
    geometries.push(wokRimGeo);
    const wokRimMat = new THREE.MeshStandardMaterial({
      color: "#F5A623",
      emissive: "#3A2E1E",
      emissiveIntensity: 0.65,
      roughness: 0.28,
      metalness: 0.88,
    });
    materials.push(wokRimMat);
    const wokRimMesh = new THREE.Mesh(wokRimGeo, wokRimMat);
    wokRimMesh.rotation.x = Math.PI / 2;
    wokRimMesh.position.y = 0.55;
    wokGroup.add(wokRimMesh);

    const substrateGeo = new THREE.CylinderGeometry(1.18, 0.96, 0.44, 6, 1);
    geometries.push(substrateGeo);
    const substrateMat = new THREE.MeshStandardMaterial({
      color: "#171F2E",
      emissive: "#EF4444",
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.72,
    });
    materials.push(substrateMat);
    const substrateMesh = new THREE.Mesh(substrateGeo, substrateMat);
    substrateMesh.position.set(0, -0.25, 0);
    substrateMesh.userData.nodeId = "substrate";
    wokGroup.add(substrateMesh);

    const honeycombEdgesGeo = new THREE.EdgesGeometry(substrateGeo);
    geometries.push(honeycombEdgesGeo);
    const honeycombEdgesMat = new THREE.LineBasicMaterial({
      color: "#22D3EE",
    });
    materials.push(honeycombEdgesMat);
    const honeycombWire = new THREE.LineSegments(
      honeycombEdgesGeo,
      honeycombEdgesMat
    );
    substrateMesh.add(honeycombWire);

    const orbitGroup = new THREE.Group();
    orbitGroup.position.y = 0.52;
    wokGroup.add(orbitGroup);

    const devinGeo = new THREE.OctahedronGeometry(0.42, 1);
    const antigravityGeo = new THREE.IcosahedronGeometry(0.42, 0);
    const freebuffGeo = new THREE.DodecahedronGeometry(0.42, 0);
    geometries.push(devinGeo, antigravityGeo, freebuffGeo);

    const devinMat = new THREE.MeshStandardMaterial({
      color: "#F5A623",
      emissive: "#F5A623",
      emissiveIntensity: 0.45,
      roughness: 0.22,
      metalness: 0.82,
    });
    const antigravityMat = new THREE.MeshStandardMaterial({
      color: "#22D3EE",
      emissive: "#22D3EE",
      emissiveIntensity: 0.45,
      roughness: 0.2,
      metalness: 0.8,
    });
    const freebuffMat = new THREE.MeshStandardMaterial({
      color: "#10B981",
      emissive: "#EF4444",
      emissiveIntensity: 0.42,
      roughness: 0.25,
      metalness: 0.76,
    });
    materials.push(devinMat, antigravityMat, freebuffMat);

    const devinMesh = new THREE.Mesh(devinGeo, devinMat);
    devinMesh.userData.nodeId = "devin";

    const antigravityMesh = new THREE.Mesh(antigravityGeo, antigravityMat);
    antigravityMesh.userData.nodeId = "antigravity";

    const freebuffMesh = new THREE.Mesh(freebuffGeo, freebuffMat);
    freebuffMesh.userData.nodeId = "freebuff";

    orbitGroup.add(devinMesh, antigravityMesh, freebuffMesh);

    const highlightRingGeo = new THREE.TorusGeometry(0.62, 0.035, 12, 48);
    geometries.push(highlightRingGeo);
    const highlightRingMat = new THREE.MeshBasicMaterial({
      color: "#F5A623",
    });
    materials.push(highlightRingMat);
    const highlightRing = new THREE.Mesh(highlightRingGeo, highlightRingMat);
    highlightRing.rotation.x = Math.PI / 2;
    scene.add(highlightRing);

    const interactiveMeshes: THREE.Mesh[] = [
      devinMesh,
      antigravityMesh,
      freebuffMesh,
      substrateMesh,
    ];

    const nodeMaterialMap: Record<
      ReactorNodeId,
      THREE.MeshStandardMaterial
    > = {
      devin: devinMat,
      antigravity: antigravityMat,
      freebuff: freebuffMat,
      substrate: substrateMat,
    };

    const nodeMeshMap: Record<ReactorNodeId, THREE.Mesh> = {
      devin: devinMesh,
      antigravity: antigravityMesh,
      freebuff: freebuffMesh,
      substrate: substrateMesh,
    };

    const nodeAccentMap: Record<ReactorNodeId, string> = {
      devin: "#F5A623",
      antigravity: "#22D3EE",
      freebuff: "#10B981",
      substrate: "#EF4444",
    };

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const updatePointerFromEvent = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return false;
      }
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      return true;
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!updatePointerFromEvent(event)) {
        return;
      }
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, false);
      const hitNodeId = hits[0]?.object?.userData?.nodeId;
      if (isReactorNodeId(hitNodeId)) {
        onSelectNodeRef.current?.(hitNodeId);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!updatePointerFromEvent(event)) {
        return;
      }
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, false);
      renderer.domElement.style.cursor = hits.length > 0 ? "pointer" : "grab";
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }
      const nextWidth = Math.max(Math.floor(entry.contentRect.width), 320);
      const nextHeight = Math.max(Math.floor(entry.contentRect.height), 240);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(nextWidth, nextHeight);
    });
    resizeObserver.observe(container);

    const targetWorldPos = new THREE.Vector3();
    let animationFrameId = 0;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) * 0.001;
      const orbitRadius = 2.05;

      const angles: Record<Exclude<ReactorNodeId, "substrate">, number> = {
        devin: elapsed * 0.55,
        antigravity: elapsed * 0.55 + (Math.PI * 2) / 3,
        freebuff: elapsed * 0.55 + (Math.PI * 4) / 3,
      };

      devinMesh.position.set(
        Math.cos(angles.devin) * orbitRadius,
        Math.sin(elapsed * 1.6) * 0.14,
        Math.sin(angles.devin) * orbitRadius
      );
      devinMesh.rotation.y = elapsed * 0.9;

      antigravityMesh.position.set(
        Math.cos(angles.antigravity) * orbitRadius,
        Math.sin(elapsed * 1.6 + 2.1) * 0.14,
        Math.sin(angles.antigravity) * orbitRadius
      );
      antigravityMesh.rotation.y = -elapsed * 0.85;

      freebuffMesh.position.set(
        Math.cos(angles.freebuff) * orbitRadius,
        Math.sin(elapsed * 1.6 + 4.2) * 0.14,
        Math.sin(angles.freebuff) * orbitRadius
      );
      freebuffMesh.rotation.x = elapsed * 0.75;

      substrateMesh.rotation.y = elapsed * 0.28;

      const currentActive = activeHarnessRef.current;
      (Object.keys(nodeMaterialMap) as ReactorNodeId[]).forEach((nodeId) => {
        const mat = nodeMaterialMap[nodeId];
        const mesh = nodeMeshMap[nodeId];
        const isSelected = nodeId === currentActive;
        mat.emissiveIntensity = isSelected ? 0.92 : 0.32;
        const targetScale = isSelected ? 1.22 : 1.0;
        mesh.scale.setScalar(targetScale);
      });

      const activeMesh = nodeMeshMap[currentActive];
      activeMesh.getWorldPosition(targetWorldPos);
      highlightRing.position.copy(targetWorldPos);
      highlightRing.scale.setScalar(
        currentActive === "substrate" ? 1.85 : 1.08
      );
      highlightRingMat.color.set(nodeAccentMap[currentActive]);

      renderer.render(scene, camera);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      for (const geo of geometries) {
        geo.dispose();
      }
      for (const mat of materials) {
        mat.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [props.reducedMotion]);

  if (props.reducedMotion || webglFailed) {
    const svgMarkup = renderDeterministicFallbackSvg(props);
    return (
      <div
        data-testid="wok-fallback-svg-container"
        style={{ width: "100%", height: "100%" }}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      data-testid="three-wok-webgl-stage"
      data-active-harness={props.activeHarness}
      style={{
        width: "100%",
        height: "100%",
        minHeight: "340px",
        position: "relative",
      }}
    />
  );
}
