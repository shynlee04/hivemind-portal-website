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
  readonly horizon: HorizonTier;
  readonly colorHex: number;
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

const CYBER_PALETTE = {
  shibuyaVoid: 0x05060a,
  shinjukuChassis: 0x0b0e17,
  sectorGridMajor: 0x00f0ff,
  sectorGridMinor: 0x131c31,
  devinCyan: 0x00f0ff,
  antigravityCrimson: 0xff2a6d,
  freebuffGold: 0xffb800,
  substrateMint: 0x00e5a3,
} as const;

function buildNeoTokyoEnvironment(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(CYBER_PALETTE.shibuyaVoid);

  const cyanBillboardGeo = new THREE.PlaneGeometry(14, 4);
  const cyanBillboardMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYBER_PALETTE.devinCyan),
    side: THREE.DoubleSide,
  });
  const cyanBillboard = new THREE.Mesh(cyanBillboardGeo, cyanBillboardMat);
  cyanBillboard.position.set(6, 7, 5);
  cyanBillboard.lookAt(0, 0, 0);
  envScene.add(cyanBillboard);

  const crimsonBillboardGeo = new THREE.PlaneGeometry(12, 3.6);
  const crimsonBillboardMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYBER_PALETTE.antigravityCrimson),
    side: THREE.DoubleSide,
  });
  const crimsonBillboard = new THREE.Mesh(
    crimsonBillboardGeo,
    crimsonBillboardMat
  );
  crimsonBillboard.position.set(-7, 5, -5);
  crimsonBillboard.lookAt(0, 0, 0);
  envScene.add(crimsonBillboard);

  const goldHighwayGeo = new THREE.PlaneGeometry(10, 2.6);
  const goldHighwayMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYBER_PALETTE.freebuffGold),
    side: THREE.DoubleSide,
  });
  const goldHighway = new THREE.Mesh(goldHighwayGeo, goldHighwayMat);
  goldHighway.position.set(0, 8, -6);
  goldHighway.lookAt(0, 0, 0);
  envScene.add(goldHighway);

  const mintCoreDiscGeo = new THREE.CircleGeometry(5.5, 32);
  const mintCoreDiscMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(CYBER_PALETTE.substrateMint),
    side: THREE.DoubleSide,
  });
  const mintCoreDisc = new THREE.Mesh(mintCoreDiscGeo, mintCoreDiscMat);
  mintCoreDisc.position.set(0, -6, 0);
  mintCoreDisc.lookAt(0, 0, 0);
  envScene.add(mintCoreDisc);

  const target = pmrem.fromScene(envScene, 0.04);
  cyanBillboardGeo.dispose();
  cyanBillboardMat.dispose();
  crimsonBillboardGeo.dispose();
  crimsonBillboardMat.dispose();
  goldHighwayGeo.dispose();
  goldHighwayMat.dispose();
  mintCoreDiscGeo.dispose();
  mintCoreDiscMat.dispose();
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
  const activeHorizonRef = useRef<HorizonTier | "all">(activeHorizon);
  const onSelectRef = useRef<((id: ReactorNodeId) => void) | undefined>(
    onSelectNode
  );
  const [webglFailed, setWebglFailed] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<ReactorNodeId | null>(null);

  activeHarnessRef.current = activeHarness;
  activeHorizonRef.current = activeHorizon;
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
    renderer.toneMappingExposure = 1.42;
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
    scene.background = new THREE.Color(CYBER_PALETTE.shibuyaVoid);
    scene.fog = new THREE.FogExp2(CYBER_PALETTE.shibuyaVoid, 0.056);

    const envTexture = buildNeoTokyoEnvironment(renderer);
    scene.environment = envTexture;

    const camera = new THREE.PerspectiveCamera(
      40,
      initialWidth / initialHeight,
      0.1,
      80
    );
    camera.position.set(0, 3.15, 6.6);
    camera.lookAt(0, 0.12, 0);

    const hemiLight = new THREE.HemisphereLight(
      0xe2e8f0,
      CYBER_PALETTE.shibuyaVoid,
      0.9
    );
    const cyanKeyLight = new THREE.DirectionalLight(
      CYBER_PALETTE.devinCyan,
      2.8
    );
    cyanKeyLight.position.set(5.5, 7.5, 4.5);
    const crimsonRimLight = new THREE.DirectionalLight(
      CYBER_PALETTE.antigravityCrimson,
      2.4
    );
    crimsonRimLight.position.set(-6.5, 4.5, -4.5);
    const goldFillLight = new THREE.DirectionalLight(
      CYBER_PALETTE.freebuffGold,
      1.6
    );
    goldFillLight.position.set(0, 6.5, -6);
    const corePulseLight = new THREE.PointLight(
      CYBER_PALETTE.devinCyan,
      5.2,
      9,
      1.5
    );
    corePulseLight.position.set(0, 0.22, 0);
    scene.add(
      hemiLight,
      cyanKeyLight,
      crimsonRimLight,
      goldFillLight,
      corePulseLight
    );

    const holoGrid = new THREE.GridHelper(
      24,
      32,
      CYBER_PALETTE.sectorGridMajor,
      CYBER_PALETTE.sectorGridMinor
    );
    holoGrid.position.y = -1.24;
    if (Array.isArray(holoGrid.material)) {
      for (const mat of holoGrid.material) {
        mat.transparent = true;
        mat.opacity = 0.26;
        trackMat(mat);
      }
    } else {
      holoGrid.material.transparent = true;
      holoGrid.material.opacity = 0.26;
      trackMat(holoGrid.material);
    }
    trackGeo(holoGrid.geometry);
    scene.add(holoGrid);

    const reactorRoot = new THREE.Group();
    scene.add(reactorRoot);

    const spireTowerGeo = trackGeo(
      new THREE.CylinderGeometry(0.44, 0.68, 1.56, 8, 1, false)
    );
    const spireTowerMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: CYBER_PALETTE.shinjukuChassis,
        emissive: 0x061524,
        emissiveIntensity: 0.55,
        metalness: 0.92,
        roughness: 0.18,
        clearcoat: 0.92,
        clearcoatRoughness: 0.14,
      })
    );
    const spireTowerMesh = new THREE.Mesh(spireTowerGeo, spireTowerMat);
    spireTowerMesh.position.y = 0.04;
    reactorRoot.add(spireTowerMesh);

    const spireEdgesGeo = trackGeo(new THREE.EdgesGeometry(spireTowerGeo, 15));
    const spireEdgesMat = trackMat(
      new THREE.LineBasicMaterial({
        color: CYBER_PALETTE.devinCyan,
        transparent: true,
        opacity: 0.68,
      })
    );
    const spireWireframe = new THREE.LineSegments(spireEdgesGeo, spireEdgesMat);
    spireTowerMesh.add(spireWireframe);

    const stewardCoreGeo = trackGeo(new THREE.OctahedronGeometry(0.36, 1));
    const stewardCoreMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: CYBER_PALETTE.devinCyan,
        emissive: CYBER_PALETTE.devinCyan,
        emissiveIntensity: 1.45,
        metalness: 0.4,
        roughness: 0.12,
        clearcoat: 1.0,
      })
    );
    const stewardCoreMesh = new THREE.Mesh(stewardCoreGeo, stewardCoreMat);
    stewardCoreMesh.position.y = 0.34;
    reactorRoot.add(stewardCoreMesh);

    const outerTorusGeo = trackGeo(
      new THREE.TorusGeometry(2.68, 0.046, 24, 96)
    );
    const outerTorusMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: CYBER_PALETTE.devinCyan,
        emissive: CYBER_PALETTE.devinCyan,
        emissiveIntensity: 0.52,
        metalness: 0.9,
        roughness: 0.15,
        clearcoat: 0.85,
      })
    );
    const outerTorusMesh = new THREE.Mesh(outerTorusGeo, outerTorusMat);
    outerTorusMesh.rotation.x = Math.PI / 2;
    outerTorusMesh.position.y = 0.28;
    reactorRoot.add(outerTorusMesh);

    const crimsonTelemetryRingGeo = trackGeo(
      new THREE.TorusGeometry(1.94, 0.024, 16, 84)
    );
    const crimsonTelemetryRingMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: CYBER_PALETTE.antigravityCrimson,
        transparent: true,
        opacity: 0.78,
      })
    );
    const crimsonTelemetryRing = new THREE.Mesh(
      crimsonTelemetryRingGeo,
      crimsonTelemetryRingMat
    );
    crimsonTelemetryRing.rotation.x = Math.PI / 2;
    crimsonTelemetryRing.position.y = -0.06;
    reactorRoot.add(crimsonTelemetryRing);

    const goldTelemetryRingGeo = trackGeo(
      new THREE.TorusGeometry(1.32, 0.024, 16, 72)
    );
    const goldTelemetryRingMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: CYBER_PALETTE.freebuffGold,
        transparent: true,
        opacity: 0.82,
      })
    );
    const goldTelemetryRing = new THREE.Mesh(
      goldTelemetryRingGeo,
      goldTelemetryRingMat
    );
    goldTelemetryRing.rotation.x = Math.PI / 2;
    goldTelemetryRing.position.y = -0.36;
    reactorRoot.add(goldTelemetryRing);

    const pylonGeo = trackGeo(new THREE.BoxGeometry(0.28, 0.16, 0.18));
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2 + Math.PI / 4;
      const pylonMesh = new THREE.Mesh(pylonGeo, outerTorusMat);
      pylonMesh.position.set(
        Math.cos(angle) * 2.68,
        0.28,
        Math.sin(angle) * 2.68
      );
      pylonMesh.rotation.y = -angle;
      reactorRoot.add(pylonMesh);
    }

    const honeycombGroup = new THREE.Group();
    honeycombGroup.position.y = -0.68;
    honeycombGroup.userData = { reactorNodeId: "substrate" as ReactorNodeId };
    reactorRoot.add(honeycombGroup);

    const hexCoords: Array<{
      q: number;
      r: number;
      dist: number;
      x: number;
      z: number;
    }> = [];
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

    const hexCellGeo = trackGeo(
      new THREE.CylinderGeometry(0.21, 0.21, 0.34, 6)
    );
    const hexCellMat = trackMat(
      new THREE.MeshPhysicalMaterial({
        color: CYBER_PALETTE.shinjukuChassis,
        emissive: CYBER_PALETTE.substrateMint,
        emissiveIntensity: 0.58,
        metalness: 0.86,
        roughness: 0.18,
        clearcoat: 0.92,
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
      new THREE.CylinderGeometry(1.16, 1.16, 0.52, 6)
    );
    const substrateHitMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: CYBER_PALETTE.substrateMint,
        wireframe: true,
        transparent: true,
        opacity: 0.32,
      })
    );
    const substrateHitMesh = new THREE.Mesh(substrateHitGeo, substrateHitMat);
    substrateHitMesh.userData = { reactorNodeId: "substrate" as ReactorNodeId };
    honeycombGroup.add(substrateHitMesh);

    const satelliteSpecs: ReadonlyArray<{
      id: ReactorNodeId;
      horizon: HorizonTier;
      colorHex: number;
      angle: number;
      radius: number;
      baseY: number;
    }> = [
      {
        id: "devin",
        horizon: "shipped",
        colorHex: CYBER_PALETTE.devinCyan,
        angle: -Math.PI * 0.72,
        radius: 2.12,
        baseY: 0.94,
      },
      {
        id: "antigravity",
        horizon: "next-release",
        colorHex: CYBER_PALETTE.antigravityCrimson,
        angle: -Math.PI * 0.28,
        radius: 2.12,
        baseY: 0.94,
      },
      {
        id: "freebuff",
        horizon: "next-release",
        colorHex: CYBER_PALETTE.freebuffGold,
        angle: Math.PI * 0.5,
        radius: 1.98,
        baseY: 1.18,
      },
    ];

    const satellites: SatelliteRig[] = [];
    const pickTargets: THREE.Object3D[] = [substrateHitMesh];

    const packetCountPerConduit = 14;
    const totalPacketCount = satelliteSpecs.length * packetCountPerConduit;
    const packetOrbGeo = trackGeo(new THREE.OctahedronGeometry(0.052, 0));
    const packetOrbMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.96,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    const packetInstanced = new THREE.InstancedMesh(
      packetOrbGeo,
      packetOrbMat,
      totalPacketCount
    );
    packetInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage);

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
          emissiveIntensity: 0.95,
          metalness: 0.55,
          roughness: 0.14,
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
          emissiveIntensity: 0.65,
          metalness: 0.88,
          roughness: 0.18,
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
          opacity: 0.48,
        })
      );
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      root.add(haloMesh);

      const curve = new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(x, spec.baseY, z),
        new THREE.Vector3(x * 0.44, 0.54, z * 0.44),
        new THREE.Vector3(0, 0.24, 0)
      );
      const conduitGeo = trackGeo(
        new THREE.TubeGeometry(curve, 40, 0.018, 8, false)
      );
      const conduitMat = trackMat(
        new THREE.MeshBasicMaterial({
          color: spec.colorHex,
          transparent: true,
          opacity: 0.52,
        })
      );
      const conduitMesh = new THREE.Mesh(conduitGeo, conduitMat);
      reactorRoot.add(conduitMesh);
      reactorRoot.add(root);

      const packetColor = new THREE.Color(spec.colorHex);
      for (let p = 0; p < packetCountPerConduit; p++) {
        const instanceIdx = sIdx * packetCountPerConduit + p;
        packetInstanced.setColorAt(instanceIdx, packetColor);
      }

      satellites.push({
        id: spec.id,
        horizon: spec.horizon,
        colorHex: spec.colorHex,
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

    if (packetInstanced.instanceColor) {
      packetInstanced.instanceColor.needsUpdate = true;
    }
    reactorRoot.add(packetInstanced);

    const emberCount = 180;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberColors = new Float32Array(emberCount * 3);
    const emberSeeds = new Float32Array(emberCount);
    const palette = [
      new THREE.Color(CYBER_PALETTE.devinCyan),
      new THREE.Color(CYBER_PALETTE.antigravityCrimson),
      new THREE.Color(CYBER_PALETTE.freebuffGold),
      new THREE.Color(CYBER_PALETTE.substrateMint),
    ];
    for (let i = 0; i < emberCount; i++) {
      const angle = (i / emberCount) * Math.PI * 2 * 7;
      const rad = 0.25 + (((i * 19) % 100) / 100) * 2.35;
      emberPositions[i * 3] = Math.cos(angle) * rad;
      emberPositions[i * 3 + 1] = -0.75 + (((i * 31) % 100) / 100) * 2.55;
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
        opacity: 0.76,
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
        userYawOffset = Math.max(
          -0.9,
          Math.min(0.9, userYawOffset + dx * 0.005)
        );
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
    const packetDummy = new THREE.Object3D();
    const tempVec = new THREE.Vector3();

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.elapsedTime;
      const activeId = activeHarnessRef.current;
      const horizonFilter = activeHorizonRef.current;

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

      const activeAccentColor =
        activeId === "devin"
          ? CYBER_PALETTE.devinCyan
          : activeId === "antigravity"
            ? CYBER_PALETTE.antigravityCrimson
            : activeId === "freebuff"
              ? CYBER_PALETTE.freebuffGold
              : CYBER_PALETTE.substrateMint;

      stewardCoreMat.color.setHex(activeAccentColor);
      stewardCoreMat.emissive.setHex(activeAccentColor);
      stewardCoreMesh.rotation.y += delta * 1.4;
      stewardCoreMesh.rotation.z += delta * 0.7;
      corePulseLight.color.setHex(activeAccentColor);
      corePulseLight.intensity = 4.6 + Math.sin(elapsed * 3.4) * 1.1;

      const isSubstrateActive = activeId === "substrate";
      const isSubstrateDimmed =
        horizonFilter !== "all" &&
        horizonFilter !== "roadmap" &&
        !isSubstrateActive;

      hexCellMat.emissiveIntensity = THREE.MathUtils.damp(
        hexCellMat.emissiveIntensity,
        isSubstrateActive ? 1.55 : isSubstrateDimmed ? 0.22 : 0.58,
        5,
        delta
      );
      substrateHitMat.opacity = isSubstrateActive ? 0.72 : 0.25;

      for (let i = 0; i < hexCoords.length; i++) {
        const cell = hexCoords[i]!;
        const wave =
          Math.sin(elapsed * 2.8 - cell.dist * 1.15) *
          (isSubstrateActive ? 0.13 : 0.055);
        dummy.position.set(cell.x, wave, cell.z);
        dummy.scale.set(1, isSubstrateActive ? 1.28 : 1.0, 1);
        dummy.updateMatrix();
        hexInstanced.setMatrixAt(i, dummy.matrix);
      }
      hexInstanced.instanceMatrix.needsUpdate = true;

      satellites.forEach((sat, sIdx) => {
        const isActive = sat.id === activeId;
        const isDimmed =
          horizonFilter !== "all" && sat.horizon !== horizonFilter && !isActive;
        const bob = Math.sin(elapsed * 2.1 + sIdx * 2.0) * 0.08;
        sat.root.position.y = sat.baseY + bob;

        const targetScale = isActive ? 1.36 : isDimmed ? 0.84 : 0.98;
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

        sat.coreMat.emissiveIntensity = isActive
          ? 2.25
          : isDimmed
            ? 0.35
            : 0.82;
        sat.gimbalMat.emissiveIntensity = isActive
          ? 1.45
          : isDimmed
            ? 0.22
            : 0.48;
        sat.conduitMat.opacity = isActive ? 0.94 : isDimmed ? 0.18 : 0.36;

        const speed = isActive ? 0.72 : 0.3;
        const packetScale = isActive ? 1.32 : isDimmed ? 0.55 : 0.9;
        for (let p = 0; p < packetCountPerConduit; p++) {
          const u = (elapsed * speed + p / packetCountPerConduit) % 1;
          sat.curve.getPoint(u, tempVec);
          packetDummy.position.copy(tempVec);
          packetDummy.rotation.set(elapsed * 2.0, elapsed * 3.0, 0);
          packetDummy.scale.setScalar(packetScale);
          packetDummy.updateMatrix();
          packetInstanced.setMatrixAt(
            sIdx * packetCountPerConduit + p,
            packetDummy.matrix
          );
        }
      });
      packetInstanced.instanceMatrix.needsUpdate = true;

      for (let i = 0; i < emberCount; i++) {
        const yIdx = i * 3 + 1;
        let nextY =
          emberPositions[yIdx]! + delta * (0.28 + emberSeeds[i]! * 0.35);
        if (nextY > 1.85) {
          nextY = -0.65;
        }
        emberPositions[yIdx] = nextY;
      }
      emberPosAttr.needsUpdate = true;

      outerTorusMesh.rotation.z = elapsed * 0.18;
      crimsonTelemetryRing.rotation.z = elapsed * 0.32;
      goldTelemetryRing.rotation.z = -elapsed * 0.44;

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
        minHeight: "300px",
      }}
    >
      <div
        ref={mountRef}
        data-testid="wok-webgl-canvas-host"
        data-hovered-node={hoveredNode ?? "none"}
        style={{
          width: "100%",
          height: "100%",
          minHeight: "300px",
        }}
      />
    </div>
  );
}
