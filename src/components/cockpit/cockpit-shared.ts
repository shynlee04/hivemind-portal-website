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
    label: "Freebuff + GLM Pass",
    roleEn: "62% High-Frequency Recon & Fast Edits",
    roleVi: "62% Trinh Sát Nhanh & Sửa Code Tốc Độ Cao",
    modelCode: "deepseek-4.1-flash / glm-5.3-flash",
    sharePercent: 62,
    color: "#FFB800",
    latencyLabel: "fbm1 lease / Ed25519",
  },
  devin: {
    label: "Devin Steward",
    roleEn: "15% Autonomous Deep Modules & TDD",
    roleVi: "15% Dựng Module Sâu & Thực Thi TDD",
    modelCode: "swe-2-max",
    sharePercent: 15,
    color: "#00F0FF",
    latencyLabel: "ACP stdio / ses_*",
  },
  antigravity: {
    label: "Antigravity",
    roleEn: "23% Architecture & Multi-Axis Review",
    roleVi: "23% Kiến Trúc & Kiểm Duyệt Đa Trục",
    modelCode: "argon-4-high",
    sharePercent: 23,
    color: "#FF2A6D",
    latencyLabel: "Fenced Live Switch",
  },
  substrate: {
    label: "Substrate Skeleton",
    roleEn: "Stage 3 Roadmap Memory Engine",
    roleVi: "Khung Lộ Trình Bộ Nhớ Giai Đoạn 3",
    modelCode: "The Spine / The Honeycomb / Working-Set Valve",
    sharePercent: 100,
    color: "#00E5A3",
    latencyLabel: "< 2 ms / < 1,200 tokens",
  },
};
