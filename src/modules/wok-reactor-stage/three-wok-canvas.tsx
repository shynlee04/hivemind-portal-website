"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type {
  HorizonTier,
  Locale,
  ReactorNodeId,
} from "../../types/portal";
import { renderDeterministicFallbackSvg } from "./fallback-svg";

export interface ThreeWokCanvasProps {
  readonly activeHarness: ReactorNodeId;
  readonly activeHorizon: HorizonTier | "all";
  readonly locale: Locale;
  readonly onSelectNode?: (id: ReactorNodeId) => void;
}

interface SatelliteRig {
  readonly id: ReactorNodeId;
  readonly root: THREE.Group;
  readonly coreMesh: THREE.Mesh;
  readonly innerGimbal: THREE.Mesh;
  readonly outerGimbal: THREE.Mesh;
  readonly haloMesh: THREE.Mesh;
  readonly coreMat: THREE.MeshPhysicalMaterial;
  readonly gimbalMat: THREE.MeshPhysicalMaterial;
  readonly conduitMat: THREE.MeshBasicMaterial;
  readonly curve: THREE.QuadraticBezierCurve3;
  readonly baseAngle: number;
  readonly orbitRadius: number;
  readonly baseY: number;
}

function buildForgeEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x06090e);

  const warmStripGeo = new THREE.PlaneGeometry(14, 4);
  const warmStripMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xf5a623),
    side: THREE.DoubleSide,
  });
  const warmStrip = new THREE.Mesh(warmStripGeo, warmStripMat);
  warmStrip.position.set(6, 7, 5);
  warmStrip.lookAt(0, 0, 0);
  envScene.add(warmStrip);

  const jadeStripGeo = new THREE.PlaneGeometry(12, 3.5);
  const jadeStripMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0x22d3ee),
    side: THREE.DoubleSide,
  });
  const jadeStrip = new THREE.Mesh(jadeStripGeo, jadeStripMat);
  jadeStrip.position.set(-7, 5, -5);
  jadeStrip.lookAt(0, 0, 0);
  envScene.add(jadeStrip);

  const emberDiscGeo = new THREE.CircleGeometry(5, 32);
  const emberDiscMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xef4444),
    side: THREE.DoubleSide,
  });
  const emberDisc = new THREE.Mesh(emberDiscGeo, emberDiscMat);
  emberDisc.position.set(0, -6, 0);
  emberDisc.lookAt(0, 0, 0);
  envScene.add(emberDisc);

  const target = pmrem.fromScene(envScene, 0.04);
  warmStripGeo.dispose();
  warmStripMat.dispose();
  jadeStripGeo.dispose();
  jadeStripMat.dispose();
  emberDiscGeo.dispose();
  emberDiscMat.dispose();
  pmrem.dispose();
  return target.texture;
}

export function ThreeWokCanvas({
  activeHarness,
  activeHorizon,
  locale,
  onSelectNode,
}: ThreeWokCanvasProps): React.JSX.Element {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const activeHarnessRef = useRef<ReactorNodeId>(activeHarness);
  const onSelectRef = useRef<((id: ReactorNodeId) => void) | undefined>(
    onSelectNode
  );
  const [webglFailed, setWebglFailed] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<ReactorNodeId | null>(null);

  activeHarnessRef.current = activeHarness;
  onSelectRef.current = onSelectNode;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) {
      return;
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglFailed(true);
      return;
    }

    const initialWidth = Math.max(container.clientWidth, 640);
    const initialHeight = Math.max(container.clientHeight, 400);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(initialWidth, initialHeight, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      geometries.push(g);
      return g;
    };
    const trackMat = <T extends THREE.Material>(m: T): T => {
      materials.push(m);
      return m;
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x080b10);
    scene.fog = new THREE.FogExp2(0x080b10, 0.068);

    const envTexture = buildForgeEnvironment(renderer);
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(
      40,
      initialWidth / initialHeight,
      0.1,
      80
    );
    camera.position.set(0, 3.15, 6.6);
    camera.lookAt(0, 0.1, 0);

    const hemiLight = new THREE.HemisphereLight(0xf4efe6, 0x080b10, 0.85);
    const forgeLight = new THREE.DirectionalLight(0xf5a623, 2.6);
    forgeLight.position.set(5, 7, 4);
    const jadeRimLight = new THREE.DirectionalLight(0x22d3ee, 2.1);
    jadeRimLight.position.set(-6, 4, -4);
    const coreBurnerLight = new THREE.PointLight(0xef4444, 4.5, 8, 1.6);
    coreBurnerLight.position.set(0, -0.35, 0);
    scene.add(hemiLight, forgeLight, jadeRimLight, coreBurnerLight);

    const reactorRoot = new THREE.Group();
    scene.add(reactorRoot);

    const lathePoints: THREE.Vector2[] = [];
    for (let i = 0; i <= 28; i++) {
      const t = i / 28;
      const r = 0.36 + Math.pow(t, 0.82) * 2.28;
      const y = -0.78 + Math.pow(t, 1.58) * 1.12;
      lathePoints.push(new THREE.Vector2(r, y));
    }
    lathePoints.push(new THREE.Vector2(2.74, 0.36));
    lathePoints.push(new THREE.Vector2(2.78, 0.31));
    lathePoints.push(new THREE.Vector2(2.62, 0.25));

    const wokGeo = trackGeo(new THREE.LatheGeometry(lathePoints, 72));
    const wokMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x101622,
        metalness: 0.9,
        roughness: 0.24,
        clearcoat: 0.72,
        clearcoatRoughness: 0.18,
        side: THREE.DoubleSide,
      })
    );
    const wokMesh = new THREE.Mesh(wokGeo, wokMat);
    reactorRoot.add(wokMesh);

    const rimGeo = trackGeo(new THREE.TorusGeometry(2.68, 0.055, 24, 96));
    const rimMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0xf5a623,
        emissive: 0xf5a623,
        emissiveIntensity: 0.38,
        metalness: 0.92,
        roughness: 0.16,
        clearcoat: 0.8,
      })
    );
    const rimMesh = new THREE.Mesh(rimGeo, rimMat);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.y = 0.34;
    reactorRoot.add(rimMesh);

    const innerThermalRingGeo = trackGeo(
      new THREE.TorusGeometry(1.88, 0.022, 16, 80)
    );
    const innerThermalRingMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        transparent: true,
        opacity: 0.65,
      })
    );
    const innerThermalRing = new THREE.Mesh(
      innerThermalRingGeo,
      innerThermalRingMat
    );
    innerThermalRing.rotation.x = Math.PI / 2;
    innerThermalRing.position.y = -0.14;
    reactorRoot.add(innerThermalRing);

    const emberThermalRingGeo = trackGeo(
      new THREE.TorusGeometry(1.22, 0.026, 16, 64)
    );
    const emberThermalRingMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0xef4444,
        transparent: true,
        opacity: 0.72,
      })
    );
    const emberThermalRing = new THREE.Mesh(
      emberThermalRingGeo,
      emberThermalRingMat
    );
    emberThermalRing.rotation.x = Math.PI / 2;
    emberThermalRing.position.y = -0.46;
    reactorRoot.add(emberThermalRing);

    for (const side of [-1, 1] as const) {
      const handleGeo = trackGeo(
        new THREE.TorusGeometry(0.38, 0.05, 16, 36, Math.PI * 1.15)
      );
      const handleMesh = new THREE.Mesh(handleGeo, rimMat);
      handleMesh.position.set(side * 2.74, 0.42, 0);
      handleMesh.rotation.z = side * -0.45;
      handleMesh.rotation.y = Math.PI / 2;
      reactorRoot.add(handleMesh);
    }

    const honeycombGroup = new THREE.Group();
    honeycombGroup.position.y = -0.68;
    honeycombGroup.userData = { reactorNodeId: "substrate" as ReactorNodeId };
    reactorRoot.add(honeycombGroup);

    const hexCoords: Array<{ q: number; r: number; dist: number; x: number; z: number }> = [];
    const hexSpacing = 0.41;
    for (let q = -2; q <= 2; q++) {
      for (let r = -2; r <= 2; r++) {
        const s = -q - r;
        const dist = Math.max(Math.abs(q), Math.abs(r), Math.abs(s));
        if (dist <= 2) {
          const x = hexSpacing * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
          const z = hexSpacing * (1.5 * r);
          hexCoords.push({ q, r, dist, x, z });
        }
      }
    }

    const hexCellGeo = trackGeo(new THREE.CylinderGeometry(0.21, 0.21, 0.34, 6));
    const hexCellMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: 0x0d1b2a,
        emissive: 0x22d3ee,
        emissiveIntensity: 0.42,
        metalness: 0.85,
        roughness: 0.2,
        clearcoat: 0.9,
      })
    );
    const hexInstanced = new THREE.InstancedMesh(
      hexCellGeo,
      hexCellMat,
      hexCoords.length
    );
    hexInstanced.userData = { reactorNodeId: "substrate" as ReactorNodeId };
    honeycombGroup.add(hexInstanced);

    const substrateHitGeo = trackGeo(
      new THREE.CylinderGeometry(1.12, 1.12, 0.52, 6)
    );
    const substrateHitMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x22d3ee,
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      })
    );
    const substrateHitMesh = new THREE.Mesh(substrateHitGeo, substrateHitMat);
    substrateHitMesh.userData = { reactorNodeId: "substrate" as ReactorNodeId };
    honeycombGroup.add(substrateHitMesh);

    const satelliteSpecs: ReadonlyArray<{
      id: ReactorNodeId;
      colorHex: number;
      angle: number;
      radius: number;
      baseY: number;
    }> = [
      {
        id: "devin",
        colorHex: 0xf5a623,
        angle: -Math.PI * 0.72,
        radius: 2.08,
        baseY: 0.92,
      },
      {
        id: "antigravity",
        colorHex: 0x22d3ee,
        angle: -Math.PI * 0.28,
        radius: 2.08,
        baseY: 0.92,
      },
      {
        id: "freebuff",
        colorHex: 0x10b981,
        angle: Math.PI * 0.5,
        radius: 1.95,
        baseY: 1.18,
      },
    ];

    const satellites: SatelliteRig[] = [];
    const pickTargets: THREE.Object3D[] = [substrateHitMesh];

    const packetCountPerConduit = 12;
    const totalPacketCount = satelliteSpecs.length * packetCountPerConduit;
    const packetPositions = new Float32Array(totalPacketCount * 3);
    const packetColors = new Float32Array(totalPacketCount * 3);

    satelliteSpecs.forEach((spec, sIdx) => {
      const root = new THREE.Group();
      const x = Math.cos(spec.angle) * spec.radius;
      const z = Math.sin(spec.angle) * spec.radius * 0.78;
      root.position.set(x, spec.baseY, z);
      root.userData = { reactorNodeId: spec.id };

      const coreGeo = trackGeo(new THREE.OctahedronGeometry(0.26, 1));
      const coreMat = trackMat(
        new THREE.MeshPhysicalMaterial({
          color: spec.colorHex,
          emissive: spec.colorHex,
          emissiveIntensity: 0.85,
          metalness: 0.55,
          roughness: 0.15,
          clearcoat: 1.0,
        })
      );
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.userData = { reactorNodeId: spec.id };
      root.add(coreMesh);
      pickTargets.push(coreMesh);

      const innerGimbalGeo = trackGeo(
        new THREE.TorusGeometry(0.39, 0.022, 16, 48)
      );
      const gimbalMat = trackMat(
        new THREE.MeshPhysicalMaterial({
          color: spec.colorHex,
          emissive: spec.colorHex,
          emissiveIntensity: 0.55,
          metalness: 0.88,
          roughness: 0.2,
        })
      );
      const innerGimbal = new THREE.Mesh(innerGimbalGeo, gimbalMat);
      innerGimbal.userData = { reactorNodeId: spec.id };
      root.add(innerGimbal);

      const outerGimbalGeo = trackGeo(
        new THREE.TorusGeometry(0.52, 0.016, 16, 64)
      );
      const outerGimbal = new THREE.Mesh(outerGimbalGeo, gimbalMat);
      outerGimbal.rotation.x = Math.PI / 3;
      outerGimbal.userData = { reactorNodeId: spec.id };
      root.add(outerGimbal);

      const haloGeo = trackGeo(new THREE.RingGeometry(0.6, 0.65, 32));
      const haloMat = trackMat(
        new THREE.MeshBasicMaterial({
          color: spec.colorHex,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.45,
        })
      );
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      root.add(haloMesh);

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, spec.baseY, z),
        new THREE.Vector3(x * 0.42, 0.48, z * 0.42),
        new THREE.Vector3(0, -0.52, 0)
      );
      const conduitGeo = trackGeo(
        new THREE.TubeGeometry(curve, 36, 0.018, 8, false)
      );
      const conduitMat = trackMat(
        new THREE.MeshBasicMaterial({
          color: spec.colorHex,
          transparent: true,
          opacity: 0.48,
        })
      );
      const conduitMesh = new THREE.Mesh(conduitGeo, conduitMat);
      reactorRoot.add(conduitMesh);
      reactorRoot.add(root);

      const c = new THREE.Color(spec.colorHex);
      for (let p = 0; p < packetCountPerConduit; p++) {
        const idx = (sIdx * packetCountPerConduit + p) * 3;
        packetColors[idx] = c.r;
        packetColors[idx + 1] = c.g;
        packetColors[idx + 2] = c.b;
      }

      satellites.push({
        id: spec.id,
        root,
        coreMesh,
        innerGimbal,
        outerGimbal,
        haloMesh,
        coreMat,
        gimbalMat,
        conduitMat,
        curve,
        baseAngle: spec.angle,
        orbitRadius: spec.radius,
        baseY: spec.baseY,
      });
    });

    const packetGeo = trackGeo(new THREE.BufferGeometry());
    const packetPosAttr = new THREE.BufferAttribute(packetPositions, 3);
    packetPosAttr.setUsage(THREE.DynamicDrawUsage);
    packetGeo.setAttribute("position", packetPosAttr);
    packetGeo.setAttribute(
      "color",
      new THREE.BufferAttribute(packetColors, 3)
    );
    const packetMat = trackMat(
      new THREE.PointsMaterial({
        size: 0.11,
        vertexColors: true,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const packetPoints = new THREE.Points(packetGeo, packetMat);
    reactorRoot.add(packetPoints);

    const emberCount = 180;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);
    const emberSeeds = new Float32Array(emberCount);
    const palette = [
      new THREE.Color(0xf5a623),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0xef4444),
    ];
    for (let i = 0; i < emberCount; i++) {
      const angle = (i / emberCount) * Math.PI * 2 * 7;
      const rad = 0.25 + ((i * 19) % 100) / 100 * 2.25;
      emberPositions[i * 3] = Math.cos(angle) * rad;
      emberPositions[i * 3 + 1] = -0.6 + ((i * 31) % 100) / 100 * 2.4;
      emberPositions[i * 3 + 2] = Math.sin(angle) * rad * 0.85;
      emberSeeds[i] = ((i * 53) % 100) / 100;
      const col = palette[i % palette.length]!;
      emberColors[i * 3] = col.r;
      emberColors[i * 3 + 1] = col.g;
      emberColors[i * 3 + 2] = col.b;
    }
    const emberGeo = trackGeo(new THREE.BufferGeometry());
    const emberPosAttr = new THREE.BufferAttribute(emberPositions, 3);
    emberPosAttr.setUsage(THREE.DynamicDrawUsage);
    emberGeo.setAttribute("position", emberPosAttr);
    emberGeo.setAttribute("color", new THREE.BufferAttribute(emberColors, 3));
    const emberMat = trackMat(
      new THREE.PointsMaterial({
        size: 0.055,
        vertexColors: true,
        transparent: true,
        opacity: 0.72,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const emberField = new THREE.Points(emberGeo, emberMat);
    reactorRoot.add(emberField);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let userYawOffset = 0;
    let userPitchOffset = 0;
    let currentYaw = 0;
    let currentPitch = 0;

    const resolveNodeFromIntersection = (
      obj: THREE.Object3D | null
    ): ReactorNodeId | null => {
      let cur: THREE.Object3D | null = obj;
      while (cur) {
        const nodeId = cur.userData?.reactorNodeId as ReactorNodeId | undefined;
        if (nodeId) {
          return nodeId;
        }
        cur = cur.parent;
      }
      return null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      isDragging = true;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      if (isDragging) {
        const dx = event.clientX - dragStartX;
        const dy = event.clientY - dragStartY;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        userYawOffset = Math.max(-0.9, Math.min(0.9, userYawOffset + dx * 0.005));
        userPitchOffset = Math.max(
          -0.35,
          Math.min(0.35, userPitchOffset + dy * 0.004)
        );
      }

      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickTargets, false);
      const hitNode =
        hits.length > 0 ? resolveNodeFromIntersection(hits[0]!.object) : null;
      setHoveredNode(hitNode);
      renderer.domElement.style.cursor = hitNode
        ? "pointer"
        : isDragging
          ? "grabbing"
          : "grab";
    };

    const handlePointerUp = (event: PointerEvent) => {
      isDragging = false;
      const rect = renderer.domElement.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        return;
      }
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(pickTargets, false);
      if (hits.length > 0) {
        const hitNode = resolveNodeFromIntersection(hits[0]!.object);
        if (hitNode && onSelectRef.current) {
          onSelectRef.current(hitNode);
        }
      }
    };

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(entry.contentRect.width, 320);
        const h = Math.max(entry.contentRect.height, 260);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h, false);
      }
    });
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();
    const tempVec = new THREE.Vector3();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.elapsedTime;
      const activeId = activeHarnessRef.current;

      const targetFocusYaw =
        activeId === "devin"
          ? 0.24
          : activeId === "antigravity"
            ? -0.24
            : activeId === "freebuff"
              ? 0.08
              : 0;
      const targetFocusPitch = activeId === "substrate" ? 0.14 : -0.04;

      currentYaw = THREE.MathUtils.damp(
        currentYaw,
        targetFocusYaw + userYawOffset + Math.sin(elapsed * 0.28) * 0.12,
        4.2,
        delta
      );
      currentPitch = THREE.MathUtils.damp(
        currentPitch,
        targetFocusPitch + userPitchOffset,
        4.2,
        delta
      );

      reactorRoot.rotation.y = currentYaw;
      reactorRoot.rotation.x = currentPitch;

      const isSubstrateActive = activeId === "substrate";
      hexCellMat.emissiveIntensity = THREE.MathUtils.damp(
        hexCellMat.emissiveIntensity,
        isSubstrateActive ? 1.35 : 0.45,
        5,
        delta
      );
      substrateHitMat.opacity = isSubstrateActive ? 0.65 : 0.22;

      for (let i = 0; i < hexCoords.length; i++) {
        const cell = hexCoords[i]!;
        const wave =
          Math.sin(elapsed * 2.8 - cell.dist * 1.15) *
          (isSubstrateActive ? 0.12 : 0.055);
        dummy.position.set(cell.x, wave, cell.z);
        dummy.scale.set(1, isSubstrateActive ? 1.25 : 1.0, 1);
        dummy.updateMatrix();
        hexInstanced.setMatrixAt(i, dummy.matrix);
      }
      hexInstanced.instanceMatrix.needsUpdate = true;

      satellites.forEach((sat, sIdx) => {
        const isActive = sat.id === activeId;
        const bob = Math.sin(elapsed * 2.1 + sIdx * 2.0) * 0.08;
        sat.root.position.y = sat.baseY + bob;

        const targetScale = isActive ? 1.34 : 0.96;
        const nextScale = THREE.MathUtils.damp(
          sat.root.scale.x,
          targetScale,
          6,
          delta
        );
        sat.root.scale.setScalar(nextScale);

        sat.coreMesh.rotation.y += delta * (isActive ? 2.4 : 1.1);
        sat.coreMesh.rotation.x += delta * 0.8;
        sat.innerGimbal.rotation.x += delta * (isActive ? 2.8 : 1.2);
        sat.innerGimbal.rotation.z -= delta * 1.4;
        sat.outerGimbal.rotation.y -= delta * (isActive ? 2.2 : 0.9);
        sat.haloMesh.rotation.z += delta * 0.6;

        sat.coreMat.emissiveIntensity = isActive ? 2.1 : 0.72;
        sat.gimbalMat.emissiveIntensity = isActive ? 1.35 : 0.42;
        sat.conduitMat.opacity = isActive ? 0.92 : 0.32;

        const speed = isActive ? 0.68 : 0.28;
        for (let p = 0; p < packetCountPerConduit; p++) {
          const u = (elapsed * speed + p / packetCountPerConduit) % 1;
          sat.curve.getPoint(u, tempVec);
          const idx = (sIdx * packetCountPerConduit + p) * 3;
          packetPositions[idx] = tempVec.x;
          packetPositions[idx + 1] = tempVec.y;
          packetPositions[idx + 2] = tempVec.z;
        }
      });
      packetPosAttr.needsUpdate = true;

      for (let i = 0; i < emberCount; i++) {
        const yIdx = i * 3 + 1;
        let nextY = emberPositions[yIdx]! + delta * (0.28 + emberSeeds[i]! * 0.35);
        if (nextY > 1.85) {
          nextY = -0.65;
        }
        emberPositions[yIdx] = nextY;
      }
      emberPosAttr.needsUpdate = true;

      innerThermalRing.rotation.z = elapsed * 0.24;
      emberThermalRing.rotation.z = -elapsed * 0.36;

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      clock.stop();
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      envTexture.dispose();
      for (const g of geometries) {
        g.dispose();
      }
      for (const m of materials) {
        m.dispose();
      }
      renderer.dispose();
    };
  }, [activeHorizon]);

  if (webglFailed) {
    const svgMarkup = renderDeterministicFallbackSvg({
      activeHarness,
      activeHorizon,
      reducedMotion: true,
      locale,
    });
    return (
      <div
        data-testid="wok-webgl-fallback"
        style={{ width: "100%", height: "100%" }}
        dangerouslySetInnerHTML={{ __html: svgMarkup }}
      />
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "360px",
      }}
    >
      <div
        ref={mountRef}
        data-testid="wok-webgl-canvas-host"
        data-hovered-node={hoveredNode ?? "none"}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "360px",
        }}
      />
    </div>
  );
}
