import { z } from "zod";
import {
  CONVERSION_AUDIENCES,
  ConversionAudienceSchema,
  LocaleSchema,
  ShowcaseIdSchema,
  type ConversionAudience,
  type ConversionBundle,
  type ConversionCtaItem,
  type Locale,
  type QuotaSavingsEstimate,
  type ShowcaseId,
  type SponsorTierView,
} from "@/types/portal";

export {
  CONVERSION_AUDIENCES,
  ConversionAudienceSchema,
  type ConversionAudience,
  type ConversionBundle,
  type ConversionCtaItem,
  type QuotaSavingsEstimate,
  type SponsorTierView,
};

const BAMBOO_ACCENT = "bamboo-green" as const;
const EMBER_ACCENT = "dragon-ember" as const;

export const PARTNER_URLS = {
  freebuffReferral:
    "https://freebuff.com/?ref=ref-6c980d54-a29a-4270-a160-35f13e62a2ff",
  zapGlm: "https://z.ai/subscribe?ic=LTWUT4H2RS",
  kofi: "https://ko-fi.com/shynlee04",
  buyMeACoffee: "https://buymeacoffee.com/shynlee04l",
} as const;

const FREEBUFF_HIGHLIGHT_SLICES: ReadonlySet<ShowcaseId> = new Set<ShowcaseId>([
  "S8",
  "S9",
  "S10",
]);

const ResolveConversionInputSchema = z.object({
  sliceId: ShowcaseIdSchema.optional(),
  audience: ConversionAudienceSchema,
  locale: LocaleSchema,
});

function buildSponsorTiers(locale: Locale): ReadonlyArray<SponsorTierView> {
  if (locale === "vi") {
    return [
      {
        id: "wok-burner",
        name: "Gói Wok Burner · Đối Tác Harness & Công Cụ",
        priceLabel: "$1,500 / tháng",
        tagline:
          "Đưa CLI hoặc model của bạn vào danh mục 20 Clip X-Ray kèm dữ liệu đường truyền thực tế.",
        deliverables: [
          "1 Lát cắt X-Ray 3 tầng chuyên biệt (EN/VI) với vết chạy thật",
          "Gắn huy hiệu đối tác trong Showroom Linh Kiện và LAUNCH_PACK.md",
          "Đo lường chuyển đổi minh bạch kèm nhãn công bố rõ ràng",
        ],
        ctaLabel: "Đăng Ký Gói Wok Burner",
        ctaHref: PARTNER_URLS.kofi,
      },
      {
        id: "honeycomb-core",
        name: "Gói Honeycomb Core · Đối Tác Hạ Tầng Suy Luận",
        priceLabel: "$3,500 / tháng",
        tagline:
          "Tích hợp trực tiếp vào ModelSlotChain 3-slot và Máy Tính Tiết Kiệm Quota.",
        deliverables: [
          "Xuất hiện trong chuỗi định tuyến ModelSlotChain mặc định trên cổng",
          "Tập phim Vibecoding < 2 phút song ngữ EN/VI kèm vết TUI đồng bộ",
          "Bài phân tích kiến trúc chuyên sâu trên Blog Payload CMS 3.0",
        ],
        ctaLabel: "Đặt Chỗ Honeycomb Core",
        ctaHref: PARTNER_URLS.kofi,
      },
      {
        id: "ecosystem-title",
        name: "Gói Ecosystem Title · Nhà Tài Trợ Danh Dự Toàn Hệ Sinh Thái",
        priceLabel: "$7,500 / tháng",
        tagline:
          "Đồng hành chiến lược cùng Sân Khấu 3D Cyber-Wok và màn dựng Greenfield 5 phút.",
        deliverables: [
          "Nút Telemetry 3D nổi bật trên Sân Khấu Lò Phản Ứng Cyber-Wok",
          "Đồng thương hiệu trong màn dựng Greenfield 5 phút (V1–V5)",
          "Hỗ trợ kỹ thuật ưu tiên cho tích hợp giao thức ACP stdio chuẩn",
        ],
        ctaLabel: "Liên Hệ Tài Trợ Danh Dự",
        ctaHref: PARTNER_URLS.kofi,
      },
    ];
  }

  return [
    {
      id: "wok-burner",
      name: "Wok Burner Tier · Harness & DevTool Partner",
      priceLabel: "$1,500 / mo",
      tagline:
        "Feature your CLI or inference endpoint inside the 20-Clip 3-Layer X-Ray Explorer with verified wire traces.",
      deliverables: [
        "1 dedicated bilingual (EN/VI) 3-Layer X-Ray showcase slice",
        "Partner badge placement in the Interactive Component Showroom",
        "Transparent referral attribution in docs/LAUNCH_PACK.md",
      ],
      ctaLabel: "Claim Wok Burner Slot",
      ctaHref: PARTNER_URLS.kofi,
    },
    {
      id: "honeycomb-core",
      name: "Honeycomb Core Tier · Inference & Memory Partner",
      priceLabel: "$3,500 / mo",
      tagline:
        "Benchmark your model slot inside our 3-Slot ModelSlotChain and Quota-Savings Estimator.",
      deliverables: [
        "Featured slot in the interactive Quota-Savings Estimator",
        "Synchronized < 2-minute bilingual Episode Hub TUI replay",
        "Architecture deep-dive article in the Payload 3.0 Blog",
      ],
      ctaLabel: "Reserve Honeycomb Core",
      ctaHref: PARTNER_URLS.kofi,
    },
    {
      id: "ecosystem-title",
      name: "Ecosystem Title Sponsor · Flagship Cyber-Wok Partner",
      priceLabel: "$7,500 / mo",
      tagline:
        "Co-headline the 3D Cyber-Wok Reactor Stage and the 5-Minute 3-Harness Greenfield Build.",
      deliverables: [
        "Primary telemetry callout on the 3D Cyber-Wok Reactor Stage",
        "Co-featured walkthrough step in the 5-Minute Greenfield Build",
        "Priority ACP stdio wire dialect conformance & co-engineering",
      ],
      ctaLabel: "Inquire Title Sponsorship",
      ctaHref: PARTNER_URLS.kofi,
    },
  ];
}

export function resolveConversionCtas(input: {
  readonly sliceId?: ShowcaseId;
  readonly audience: ConversionAudience;
  readonly locale: Locale;
}): ConversionBundle {
  const parsed = ResolveConversionInputSchema.parse(input);
  const { locale, audience, sliceId } = parsed;

  const isFreebuffSlice =
    sliceId !== undefined && FREEBUFF_HIGHLIGHT_SLICES.has(sliceId);
  const highlightBuilders =
    isFreebuffSlice || (sliceId === undefined && audience === "builders");
  const highlightSupporters =
    !isFreebuffSlice && audience === "supporters";
  const highlightSponsors =
    !isFreebuffSlice && audience === "sponsors";

  const allItems: ReadonlyArray<ConversionCtaItem> =
    locale === "vi"
      ? [
          {
            id: "freebuff-referral",
            audience: "builders",
            label: "Kích Hoạt Freebuff (Slot 1 Trinh Sát)",
            badge: isFreebuffSlice
              ? "ĐƯỢC ĐỀ XUẤT CHO LÁT CẮT FREEBUFF (S8–S10)"
              : "DÀNH CHO DEV · SLOT 1 TỐC ĐỘ CAO",
            headline:
              "Freebuff Candidate · deepseek-4.1-flash & glm-5.3-flash",
            description:
              "San tải toàn bộ bước quét cây thư mục và dựng khung sang Freebuff với khôi phục mã xoay vòng fbm1.... và giữ phiên keepSlotForResume.",
            href: PARTNER_URLS.freebuffReferral,
            disclosure:
              "Liên kết giới thiệu chính thức (Referral) — tiếp sức duy trì phát triển Hivemind-* miễn phí cho cộng đồng.",
            isHighlighted: highlightBuilders,
            accentToken: "wok-gold",
          },
          {
            id: "zap-glm-coding-plan",
            audience: "builders",
            label: "Đăng Ký Zap GLM Coding Plan",
            badge: isFreebuffSlice
              ? "COMBO TỐI ƯU QUOTA CÙNG S8–S10"
              : "GÓI CODE GLM · CHI PHÍ THẤP",
            headline:
              "Z.ai GLM Coding Plan · Cặp Bài Trùng Cùng ModelSlotChain",
            description:
              "Nguồn token GLM tốc độ cao, chi phí cực thấp cho các vòng lặp TDD và kiểm thử biên tự động trong OpenCode V2.",
            href: PARTNER_URLS.zapGlm,
            disclosure:
              "Liên kết đối tác có mã giới thiệu (ic=LTWUT4H2RS) — bạn nhận ưu đãi gói code, dự án nhận kinh phí duy trì.",
            isHighlighted: highlightBuilders,
            accentToken: "jade-wire",
          },
          {
            id: "kofi-supporter-vault",
            audience: "supporters",
            label: "Tiếp Lửa Qua Ko-fi (shynlee04)",
            badge: "KHO ỦNG HỘ CỘNG ĐỒNG · KO-FI",
            headline: "Ủng Hộ Trực Tiếp Kỹ Sư Rèn Lò Hivemind-*",
            description:
              "Giúp duy trì chuỗi kiểm thử đa nền tảng, tài liệu song ngữ EN/VI và phát triển bộ nhớ 3 tầng Hivemind Substrate.",
            href: PARTNER_URLS.kofi,
            disclosure:
              "Đóng góp trực tiếp 100% cho tác giả mã nguồn mở (shynlee04).",
            isHighlighted: highlightSupporters,
            accentToken: BAMBOO_ACCENT,
          },
          {
            id: "buymeacoffee-supporter-vault",
            audience: "supporters",
            label: "Mời Cà Phê Qua Buy Me a Coffee",
            badge: "TIẾP SỨC ĐÊM KHUYA · BMC",
            headline: "Một Ly Cà Phê Đậm Đặc Cho Những Đêm Săn Lỗi ACP",
            description:
              "Đóng góp nhanh gọn để cổ vũ tinh thần {CHINGCHONGCHINGVIBECODING} — Pro, Not Bro, nói không với code rác.",
            href: PARTNER_URLS.buyMeACoffee,
            disclosure:
              "Ủng hộ trực tiếp qua cổng Buy Me a Coffee chính thức (shynlee04l).",
            isHighlighted: highlightSupporters,
            accentToken: EMBER_ACCENT,
          },
          {
            id: "b2b-sponsor-inquiry",
            audience: "sponsors",
            label: "Đặt Chỗ Tài Trợ Hệ Sinh Thái B2B",
            badge: "DÀNH CHO HARNESS & INFERENCE B2B",
            headline: "Đưa Engine Của Bạn Vào Sân Khấu 3D Cyber-Wok",
            description:
              "Ba gói tài trợ minh bạch (Wok Burner, Honeycomb Core, Ecosystem Title) kèm bài kiểm chứng X-Ray 3 tầng thực chất.",
            href: PARTNER_URLS.kofi,
            disclosure:
              "Tài trợ thương mại B2B — mọi số liệu benchmark đều được kiểm chứng độc lập bằng test thực tế.",
            isHighlighted: highlightSponsors,
            accentToken: "wok-gold",
          },
        ]
      : [
          {
            id: "freebuff-referral",
            audience: "builders",
            label: "Launch Freebuff (Slot 1 Recon Engine)",
            badge: isFreebuffSlice
              ? "HIGHLIGHTED FOR FREEBUFF SLICES (S8–S10)"
              : "BUILDER PICK · ZERO-COST RECON SLOT",
            headline:
              "Freebuff Candidate · deepseek-4.1-flash & glm-5.3-flash",
            description:
              "Offload high-frequency repo recon and schema scaffolding to Freebuff with rotated fbm1.... handle recovery and keepSlotForResume continuity.",
            href: PARTNER_URLS.freebuffReferral,
            disclosure:
              "Verified partner referral link — supports open-source Hivemind-* development at zero extra cost to you.",
            isHighlighted: highlightBuilders,
            accentToken: "wok-gold",
          },
          {
            id: "zap-glm-coding-plan",
            audience: "builders",
            label: "Get the Zap GLM Coding Plan",
            badge: isFreebuffSlice
              ? "RECOMMENDED SLOT-CHAIN PAIRING (S8–S10)"
              : "HIGH-VELOCITY GLM CODING PLAN",
            headline:
              "Z.ai GLM Coding Plan · High-Throughput Token Companion",
            description:
              "Power sustained multi-harness TDD loops and parallel worktree lanes with predictable, developer-friendly GLM coding quota.",
            href: PARTNER_URLS.zapGlm,
            disclosure:
              "Verified referral invite (ic=LTWUT4H2RS) — unlocks builder subscription perks while funding Hivemind-* maintenance.",
            isHighlighted: highlightBuilders,
            accentToken: "jade-wire",
          },
          {
            id: "kofi-supporter-vault",
            audience: "supporters",
            label: "Back Hivemind-* on Ko-fi (shynlee04)",
            badge: "COMMUNITY SUPPORTER VAULT · KO-FI",
            headline: "Fuel Independent OpenCode V2 Plugin Engineering",
            description:
              "Directly fund cross-OS ACP compatibility testing, bilingual EN/VI architecture guides, and the Hivemind Substrate memory engine.",
            href: PARTNER_URLS.kofi,
            disclosure:
              "100% direct creator support via verified Ko-fi vault (shynlee04).",
            isHighlighted: highlightSupporters,
            accentToken: BAMBOO_ACCENT,
          },
          {
            id: "buymeacoffee-supporter-vault",
            audience: "supporters",
            label: "Buy a Late-Night Wok Coffee",
            badge: "SUPPORTER VAULT · BUY ME A COFFEE",
            headline: "Keep the Cyber-Wok Seasoned & Open Source",
            description:
              "One-click community backing for developers who appreciate zero-slop deep modules, honest horizon badges, and real wire traces.",
            href: PARTNER_URLS.buyMeACoffee,
            disclosure:
              "Direct creator tip jar via verified Buy Me a Coffee link (shynlee04l).",
            isHighlighted: highlightSupporters,
            accentToken: EMBER_ACCENT,
          },
          {
            id: "b2b-sponsor-inquiry",
            audience: "sponsors",
            label: "Sponsor the Hivemind-* Showroom",
            badge: "B2B ECOSYSTEM SPONSORSHIP",
            headline: "Put Your Harness or Inference API Inside the 3-Layer X-Ray",
            description:
              "Partner across Wok Burner, Honeycomb Core, or Ecosystem Title tiers with reproducible OpenCode V2 wire traces and bilingual episodes.",
            href: PARTNER_URLS.kofi,
            disclosure:
              "B2B sponsorship track — every sponsored slice undergoes the same executable verification gate.",
            isHighlighted: highlightSponsors,
            accentToken: "wok-gold",
          },
        ];

  const orderedItems = [...allItems].sort((left, right) => {
    const leftMatchesAudience = left.audience === audience ? 0 : 1;
    const rightMatchesAudience = right.audience === audience ? 0 : 1;
    if (leftMatchesAudience !== rightMatchesAudience) {
      return leftMatchesAudience - rightMatchesAudience;
    }
    const leftHighlight = left.isHighlighted ? 0 : 1;
    const rightHighlight = right.isHighlighted ? 0 : 1;
    return leftHighlight - rightHighlight;
  });

  return {
    locale,
    activeAudience: audience,
    ...(sliceId !== undefined ? { sliceId } : {}),
    items: orderedItems,
    sponsorTiers: buildSponsorTiers(locale),
  };
}

export function calculateQuotaSavings(
  hoursPerWeek: number,
): QuotaSavingsEstimate {
  if (!Number.isFinite(hoursPerWeek)) {
    throw new Error("hoursPerWeek must be a finite number");
  }

  const clampedHours = Math.min(80, Math.max(5, Math.round(hoursPerWeek)));
  const weeksPerMonth = 4.33;
  const monthlyHours = clampedHours * weeksPerMonth;

  const baselineHourlyFrontierUsd = 3.2;
  const optimizedHourlyTriHarnessUsd = 1.12;

  const baselineMonthlyUsd = Number(
    (monthlyHours * baselineHourlyFrontierUsd).toFixed(2),
  );
  const optimizedMonthlyUsd = Number(
    (monthlyHours * optimizedHourlyTriHarnessUsd).toFixed(2),
  );
  const monthlySavingsUsd = Number(
    (baselineMonthlyUsd - optimizedMonthlyUsd).toFixed(2),
  );
  const savingsPercentage = Math.round(
    (monthlySavingsUsd / baselineMonthlyUsd) * 100,
  );
  const prunedTokensPerMonth = Math.round(monthlyHours * 185000);
  const freebuffOffloadSharePercent = 62;

  return {
    hoursPerWeek: clampedHours,
    baselineMonthlyUsd,
    optimizedMonthlyUsd,
    monthlySavingsUsd,
    savingsPercentage,
    prunedTokensPerMonth,
    freebuffOffloadSharePercent,
  };
}
