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
        name: "Gói Harness Slot: Đối Tác Coding Pass & CLI",
        priceLabel: "$1,500 / tháng",
        tagline:
          "Đưa Harness hoặc gói Coding Pass của bạn lên 20 lát cắt X-Ray và README GitHub công khai của Hivemind.",
        deliverables: [
          "1 video thực chiến song ngữ EN/VI trên kênh YouTube và cổng Hivemind",
          "Đặt liên kết giới thiệu chính thức trên trang chủ và LAUNCH_PACK.md",
          "Tiếp cận trực tiếp cộng đồng Vibecoder dùng OpenCode V2 mỗi ngày",
        ],
        ctaLabel: "Đăng Ký Harness Slot",
        ctaHref: PARTNER_URLS.kofi,
      },
      {
        id: "honeycomb-core",
        name: "Gói Bridge Core: Nhà Cung Cấp AI Pass & Model",
        priceLabel: "$3,500 / tháng",
        tagline:
          "Tích hợp trực tiếp vào chuỗi 3-Slot ModelSlotChain và bảng tính vắt token khuyến mãi của Hivemind-Steward.",
        deliverables: [
          "Hiển thị nổi bật trong bảng tính hiệu suất vắt token của Vibecoder",
          "Video hướng dẫn dưới 2 phút phát tán trên YouTube, Reddit và Discord",
          "Bài viết phân tích kiến trúc đường truyền trên Blog kỹ thuật Payload CMS 3.0",
        ],
        ctaLabel: "Đặt Chỗ Bridge Core",
        ctaHref: PARTNER_URLS.kofi,
      },
      {
        id: "ecosystem-title",
        name: "Gói Ecosystem Title: Đối Tác Chiến Lược Toàn Hệ Sinh Thái",
        priceLabel: "$7,500 / tháng",
        tagline:
          "Đồng hành cùng buồng lái 3D Neo-Tokyo và chuỗi video dựng dự án Greenfield 3-Harness trong 5 phút.",
        deliverables: [
          "Vị trí nổi bật trên mô hình 3D trung tâm và toàn bộ kho mã nguồn GitHub",
          "Xuất hiện xuyên suốt trong chuỗi video Greenfield 5 phút (V1-V5)",
          "Hỗ trợ kỹ thuật trực tiếp kết nối chuẩn giao thức ACP stdio hai chiều",
        ],
        ctaLabel: "Liên Hệ Đối Tác Chiến Lược",
        ctaHref: PARTNER_URLS.kofi,
      },
    ];
  }

  return [
    {
      id: "wok-burner",
      name: "Harness Slot Tier: Coding-Pass & CLI Partner",
      priceLabel: "$1,500 / mo",
      tagline:
        "Feature your coding pass or harness CLI in our 20-clip X-Ray showcase and public GitHub READMEs.",
      deliverables: [
        "1 dedicated bilingual (EN/VI) video & 3-Layer X-Ray showcase slice",
        "Verified referral placement in the Portal & docs/LAUNCH_PACK.md",
        "Direct exposure to active OpenCode vibecoders across GitHub & Discord",
      ],
      ctaLabel: "Claim Harness Slot",
      ctaHref: PARTNER_URLS.kofi,
    },
    {
      id: "honeycomb-core",
      name: "Bridge Core Tier: AI Pass & Model Provider",
      priceLabel: "$3,500 / mo",
      tagline:
        "Integrate your coding pass into Hivemind-Steward ModelSlotChain routing and promo-squeezing estimator.",
      deliverables: [
        "Featured slot in the interactive Vibecoder Promo-Squeezing Estimator",
        "Dedicated YouTube tutorial + Reddit & Discord launch breakdown",
        "Technical integration guide published in the Payload 3.0 Blog",
      ],
      ctaLabel: "Reserve Bridge Core",
      ctaHref: PARTNER_URLS.kofi,
    },
    {
      id: "ecosystem-title",
      name: "Ecosystem Title Tier: Flagship Hivemind Partner",
      priceLabel: "$7,500 / mo",
      tagline:
        "Co-headline the 3D Neo-Tokyo Orbital Command Stage and the 5-Minute 3-Harness Greenfield Video Series.",
      deliverables: [
        "Primary 3D telemetry node placement on the Neo-Tokyo Hero Stage",
        "Featured harness slot across the 5-Minute Greenfield Build series",
        "Priority bi-directional ACP stdio adapter & public repo placement",
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
            label: "Nhận Freebuff Miễn Phí",
            badge: isFreebuffSlice
              ? "Đề xuất cho lát cắt Freebuff (S8-S10)"
              : "100% Free Coding Agent + Credit mỗi ngày",
            headline:
              "Freebuff Daily Free AI (deepseek-4.1-flash & glm-5.3-flash)",
            description:
              "Dùng AI miễn phí mỗi ngày ngay trong OpenCode V2 để càn quét tài liệu và nghiên cứu repo với chi phí 0 đồng, giữ nguyên gói promo $20 Devin cho việc khó.",
            href: PARTNER_URLS.freebuffReferral,
            disclosure:
              "Liên kết giới thiệu chính thức mở hạn mức miễn phí mỗi ngày và ủng hộ Hivemind-Steward.",
            isHighlighted: highlightBuilders,
            accentToken: "wok-gold",
          },
          {
            id: "zap-glm-coding-plan",
            audience: "builders",
            label: "Đăng Ký Zap GLM Plan",
            badge: isFreebuffSlice
              ? "Đổi não giữa phiên không mất lease (S8-S10)"
              : "Gói GLM tốc độ ánh sáng cho Vibecoder",
            headline:
              "Z.ai Zap GLM Coding Plan: Đổi Não Giữa Phiên Tốc Độ Cao",
            description:
              "Chuyển mượt từ deepseek-4.1-flash sang glm-5.3-flash ngay giữa phiên (keepSlotForResume) để viết API docs và bảng cấu trúc component với tốc độ bàn thờ.",
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
            headline: "Tài Trợ Phát Triển Hivemind-Steward & Hivemind-Substrate",
            description:
              "Giúp duy trì cầu nối đa Harness miễn phí, chuỗi video thực chiến Pro Not Bro và lộ trình động cơ bộ nhớ Hivemind-Substrate.",
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
            headline: "Tiếp Lửa Cho Hệ Sinh Thái Mã Nguồn Mở Hivemind",
            description:
              "Đóng góp nhanh gọn từ các Vibecoder dùng Hivemind-Steward mỗi ngày để vắt kiệt gói promo và đồng bộ phiên hai chiều.",
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
            badge: "Kênh đối tác Harness, Coding Pass & AI API",
            headline: "Đưa Harness & Gói Cước Của Bạn Đến Cộng Đồng OpenCode",
            description:
              "Quảng bá trực tiếp trên kho GitHub công khai, chuỗi video YouTube 3-Harness, thảo luận Reddit/Discord và buồng lái Hivemind-Steward.",
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
            label: "Get Freebuff Daily AI",
            badge: isFreebuffSlice
              ? "Recommended for Freebuff slices (S8-S10)"
              : "100% Free Coding Agent + Daily Credits",
            headline:
              "Freebuff Daily Free AI (deepseek-4.1-flash & glm-5.3-flash)",
            description:
              "Use free AI every day inside OpenCode V2 for $0 repo recon and spec drafting so you can save your $20 Devin swe-2 promo and Antigravity quota for heavy lifting.",
            href: PARTNER_URLS.freebuffReferral,
            disclosure:
              "Verified partner referral link bridging daily free credits while backing open-source Hivemind-Steward.",
            isHighlighted: highlightBuilders,
            accentToken: "wok-gold",
          },
          {
            id: "zap-glm-coding-plan",
            audience: "builders",
            label: "Get Zap GLM Plan",
            badge: isFreebuffSlice
              ? "Mid-session model swap partner (S8-S10)"
              : "High-speed GLM coding subscription",
            headline:
              "Z.ai Zap GLM Coding Plan: High-Speed Mid-Session Model Swaps",
            description:
              "Switch live mid-session from deepseek-4.1-flash to glm-5.3-flash without losing your session lease (keepSlotForResume) for ultra-fast API docs and component tables.",
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
            headline: "Fund Open-Source Hivemind-Steward & Substrate Engineering",
            description:
              "Directly support cross-OS OpenCode V2 harness bridges, Pro Not Bro YouTube builds, and the Stage 3 Hivemind-Substrate memory engine.",
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
            headline: "Fuel Late-Night Multi-Harness Engineering",
            description:
              "One-click backing from vibecoders who use Hivemind-Steward to reuse warm ses_* sessions and squeeze every promo token.",
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
            badge: "For coding-pass, harness & AI providers",
            headline: "Put Your Harness & Coding Pass in Front of Active Builders",
            description:
              "Get featured inside Hivemind-Steward, public GitHub READMEs, 5-minute YouTube builds, and Reddit/Discord community benchmarks.",
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
