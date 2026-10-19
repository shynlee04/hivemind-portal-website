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
        name: "Gói Channel Slot: Đối Tác Coding Pass & CLI",
        priceLabel: "$1,500 / tháng",
        tagline:
          "Đưa gói cước hoặc CLI của bạn lên danh mục 20 video X-Ray và README GitHub công khai.",
        deliverables: [
          "1 video thực chiến song ngữ EN/VI trên kênh YouTube và cổng Hivemind",
          "Đặt liên kết giới thiệu chính thức trên trang chủ và LAUNCH_PACK.md",
          "Báo cáo lưu lượng chuyển đổi minh bạch cho nhà cung cấp",
        ],
        ctaLabel: "Đăng Ký Channel Slot",
        ctaHref: PARTNER_URLS.kofi,
      },
      {
        id: "honeycomb-core",
        name: "Gói Gateway Core: Nhà Cung Cấp AI API & Subscription Pass",
        priceLabel: "$3,500 / tháng",
        tagline:
          "Tích hợp trực tiếp vào chuỗi ModelSlotChain mặc định của Hivemind-Steward.",
        deliverables: [
          "Hiển thị trực tiếp trong bảng tính tiết kiệm chi phí của Vibecoder",
          "Video hướng dẫn dưới 2 phút phát tán trên YouTube, Reddit và Discord",
          "Bài viết phân tích chuyên sâu trên Blog kỹ thuật Payload CMS 3.0",
        ],
        ctaLabel: "Đặt Chỗ Gateway Core",
        ctaHref: PARTNER_URLS.kofi,
      },
      {
        id: "ecosystem-title",
        name: "Gói Ecosystem Title: Đối Tác Chiến Lược Toàn Hệ Sinh Thái",
        priceLabel: "$7,500 / tháng",
        tagline:
          "Đồng hành cùng buồng lái 3D Neo-Tokyo và chuỗi video dựng dự án thực tế.",
        deliverables: [
          "Vị trí nổi bật trên mô hình 3D trung tâm và toàn bộ kho mã nguồn GitHub",
          "Xuất hiện xuyên suốt trong chuỗi video Greenfield 5 phút (V1-V5)",
          "Hỗ trợ kỹ thuật trực tiếp để kết nối chuẩn giao thức ACP stdio",
        ],
        ctaLabel: "Liên Hệ Đối Tác Chiến Lược",
        ctaHref: PARTNER_URLS.kofi,
      },
    ];
  }

  return [
    {
      id: "wok-burner",
      name: "Channel Slot Tier: Coding-Pass & CLI Partner",
      priceLabel: "$1,500 / mo",
      tagline:
        "Feature your coding subscription pass or CLI in our 20-clip video showcase and public GitHub READMEs.",
      deliverables: [
        "1 dedicated bilingual (EN/VI) video & 3-Layer X-Ray showcase slice",
        "Verified referral placement in the Portal & docs/LAUNCH_PACK.md",
        "Direct exposure to active OpenCode vibecoders across GitHub & Discord",
      ],
      ctaLabel: "Claim Channel Slot",
      ctaHref: PARTNER_URLS.kofi,
    },
    {
      id: "honeycomb-core",
      name: "Gateway Core Tier: AI API & Subscription Provider",
      priceLabel: "$3,500 / mo",
      tagline:
        "Integrate your coding pass into Hivemind-Steward default ModelSlotChain routing and pocket calculator.",
      deliverables: [
        "Featured slot in the interactive Vibecoder Pocket-Savings Calculator",
        "Dedicated YouTube tutorial + Reddit & Discord launch breakdown",
        "Technical integration guide published in the Payload 3.0 Blog",
      ],
      ctaLabel: "Reserve Gateway Core",
      ctaHref: PARTNER_URLS.kofi,
    },
    {
      id: "ecosystem-title",
      name: "Ecosystem Title Tier: Flagship Hivemind Partner",
      priceLabel: "$7,500 / mo",
      tagline:
        "Co-headline the 3D Neo-Tokyo Orbital Command Stage and the 5-Minute Greenfield Video Series.",
      deliverables: [
        "Primary 3D telemetry node placement on the Neo-Tokyo Hero Stage",
        "Featured harness slot across the 5-Minute Greenfield Build series",
        "Priority ACP stdio adapter engineering & public repo placement",
      ],
      ctaLabel: "Inquire Flagship Sponsorship",
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
            label: "Mở Freebuff Pass",
            badge: isFreebuffSlice
              ? "Đề xuất cho lát cắt Freebuff (S8-S10)"
              : "Gói trinh sát tốc độ cao cho Vibecoder",
            headline:
              "Freebuff Coding Pass (deepseek-4.1-flash & glm-5.3-flash)",
            description:
              "Chuyển 62% tác vụ quét kho code và dựng khung sang Freebuff để giữ nguyên hạn ngạch Devin và Antigravity cho việc khó.",
            href: PARTNER_URLS.freebuffReferral,
            disclosure:
              "Liên kết giới thiệu chính thức giúp bạn tiết kiệm chi phí và ủng hộ dự án mã nguồn mở.",
            isHighlighted: highlightBuilders,
            accentToken: "wok-gold",
          },
          {
            id: "zap-glm-coding-plan",
            audience: "builders",
            label: "Đăng Ký Zap GLM Plan",
            badge: isFreebuffSlice
              ? "Cặp đôi tối ưu hạn ngạch (S8-S10)"
              : "Gói cước GLM dành cho Vibecoder",
            headline:
              "Z.ai GLM Coding Plan: Hạn Ngạch Dồi Dào Giá Mềm",
            description:
              "Chạy các vòng lặp TDD và dịch thuật song ngữ liên tục với mức phí cố định cực nhẹ túi tiền.",
            href: PARTNER_URLS.zapGlm,
            disclosure:
              "Mã giới thiệu chính thức (ic=LTWUT4H2RS) mở quyền lợi ưu đãi và tài trợ trực tiếp cho Hivemind-Steward.",
            isHighlighted: highlightBuilders,
            accentToken: "jade-wire",
          },
          {
            id: "kofi-supporter-vault",
            audience: "supporters",
            label: "Ủng Hộ Qua Ko-fi",
            badge: "Quỹ cộng đồng Ko-fi (shynlee04)",
            headline: "Tài Trợ Phát Triển Cổng Mở Hivemind-Steward",
            description:
              "Giúp duy trì bản phát hành miễn phí, chuỗi video hướng dẫn thực chiến và phát triển lộ trình Hivemind-Substrate.",
            href: PARTNER_URLS.kofi,
            disclosure:
              "Đóng góp trực tiếp 100% cho tác giả dự án mã nguồn mở (shynlee04).",
            isHighlighted: highlightSupporters,
            accentToken: BAMBOO_ACCENT,
          },
          {
            id: "buymeacoffee-supporter-vault",
            audience: "supporters",
            label: "Mời Cà Phê Qua BMC",
            badge: "Quỹ ủng hộ Buy Me a Coffee (shynlee04l)",
            headline: "Tiếp Sức Cho Các Bản Cập Nhật OpenCode V2",
            description:
              "Đóng góp nhanh gọn cho đội ngũ phát triển Hivemind-Steward giữ toàn bộ công cụ miễn phí cho cộng đồng.",
            href: PARTNER_URLS.buyMeACoffee,
            disclosure:
              "Ủng hộ trực tiếp qua trang Buy Me a Coffee chính thức (shynlee04l).",
            isHighlighted: highlightSupporters,
            accentToken: EMBER_ACCENT,
          },
          {
            id: "b2b-sponsor-inquiry",
            audience: "sponsors",
            label: "Đặt Chỗ Nhà Cung Cấp",
            badge: "Kênh đối tác Coding Pass & AI API",
            headline: "Đưa Gói Cước & Model Của Bạn Đến Hàng Ngàn Vibecoder",
            description:
              "Quảng bá trực tiếp trên kho GitHub công khai, chuỗi video YouTube, thảo luận Reddit/Discord và buồng lái Hivemind-Steward.",
            href: PARTNER_URLS.kofi,
            disclosure:
              "Kênh hợp tác nhà cung cấp với số liệu kiểm chứng thực tế trên OpenCode V2.",
            isHighlighted: highlightSponsors,
            accentToken: "wok-gold",
          },
        ]
      : [
          {
            id: "freebuff-referral",
            audience: "builders",
            label: "Activate Freebuff Pass",
            badge: isFreebuffSlice
              ? "Recommended for Freebuff slices (S8-S10)"
              : "Vibecoder pick: High-speed recon pass",
            headline:
              "Freebuff Coding Pass (deepseek-4.1-flash & glm-5.3-flash)",
            description:
              "Route 62% of daily repo recon and fast edits through Freebuff inside OpenCode so your flagship quotas last all month.",
            href: PARTNER_URLS.freebuffReferral,
            disclosure:
              "Verified partner referral link that saves your pocket and backs open-source Hivemind-Steward development.",
            isHighlighted: highlightBuilders,
            accentToken: "wok-gold",
          },
          {
            id: "zap-glm-coding-plan",
            audience: "builders",
            label: "Get Zap GLM Plan",
            badge: isFreebuffSlice
              ? "Recommended slot-chain pairing (S8-S10)"
              : "Pocket-friendly GLM coding pass",
            headline:
              "Z.ai GLM Coding Plan: High-Volume Builder Subscription",
            description:
              "Run parallel worktree loops, schema generation, and bilingual docs on predictable, wallet-friendly GLM coding quota.",
            href: PARTNER_URLS.zapGlm,
            disclosure:
              "Verified referral invite (ic=LTWUT4H2RS) activating subscriber perks while funding Hivemind-Steward.",
            isHighlighted: highlightBuilders,
            accentToken: "jade-wire",
          },
          {
            id: "kofi-supporter-vault",
            audience: "supporters",
            label: "Back on Ko-fi",
            badge: "Community supporter vault (shynlee04)",
            headline: "Fund Open-Source Hivemind-Steward Engineering",
            description:
              "Directly support cross-OS OpenCode V2 plugin releases, YouTube video breakdowns, and the Hivemind-Substrate roadmap.",
            href: PARTNER_URLS.kofi,
            disclosure:
              "100% direct creator support via verified Ko-fi vault (shynlee04).",
            isHighlighted: highlightSupporters,
            accentToken: BAMBOO_ACCENT,
          },
          {
            id: "buymeacoffee-supporter-vault",
            audience: "supporters",
            label: "Buy Me a Coffee",
            badge: "Creator tip jar (shynlee04l)",
            headline: "Fuel Late-Night Tokyo Cyberpunk Builds",
            description:
              "One-click backing from vibecoders who use Hivemind-Steward every day to centralize their AI coding subscriptions.",
            href: PARTNER_URLS.buyMeACoffee,
            disclosure:
              "Direct creator support via verified Buy Me a Coffee page (shynlee04l).",
            isHighlighted: highlightSupporters,
            accentToken: EMBER_ACCENT,
          },
          {
            id: "b2b-sponsor-inquiry",
            audience: "sponsors",
            label: "Partner & Sponsor",
            badge: "For coding-pass & AI API providers",
            headline: "Put Your Coding Pass & Models in Front of Active Builders",
            description:
              "Get featured inside Hivemind-Steward, public GitHub READMEs, YouTube tutorials, and Reddit/Discord community benchmarks.",
            href: PARTNER_URLS.kofi,
            disclosure:
              "Provider & sponsor channel with reproducible OpenCode V2 benchmarks.",
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
