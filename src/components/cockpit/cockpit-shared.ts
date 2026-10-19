import type { ReactorNodeId } from "@/types/portal";

export const HARNESS_META: Readonly<
  Record<
    ReactorNodeId,
    {
      readonly label: string;
      readonly roleEn: string;
      readonly roleVi: string;
      readonly modelCode: string;
      readonly sharePercent: number;
      readonly color: string;
      readonly latencyLabel: string;
    }
  >
> = {
  freebuff: {
    label: "Freebuff",
    roleEn: "High-Frequency Recon & Bilingual Drafts",
    roleVi: "Trinh Sát Tốc Độ Cao & Nháp Song Ngữ",
    modelCode: "deepseek-4.1-flash / glm-5.3-flash",
    sharePercent: 62,
    color: "#F5A623",
    latencyLabel: "fbm1.... lease · Ed25519",
  },
  devin: {
    label: "Devin Steward",
    roleEn: "Deep Seam Scaffold & TDD Execution",
    roleVi: "Dựng Khung Module Sâu & Thực Thi TDD",
    modelCode: "swe-2-max",
    sharePercent: 23,
    color: "#22D3EE",
    latencyLabel: "JSON-RPC stdio · ses_*",
  },
  antigravity: {
    label: "Antigravity",
    roleEn: "3D WebGL Shaders & 2-Axis Code Review",
    roleVi: "Shader WebGL 3D & Kiểm Duyệt 2 Trục",
    modelCode: "argon-4-high",
    sharePercent: 15,
    color: "#EF4444",
    latencyLabel: "Spec + Standards Gate",
  },
  substrate: {
    label: "Substrate Vault",
    roleEn: "Lossless Spine, Honeycomb & < 2 ms Valve",
    roleVi: "The Spine, Honeycomb & Van Tỉa < 2 ms",
    modelCode: "index.sqlite + sha256 blobs",
    sharePercent: 100,
    color: "#10B981",
    latencyLabel: "< 2 ms Working-Set Valve",
  },
};

