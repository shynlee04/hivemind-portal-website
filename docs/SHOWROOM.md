# Hivemind Portal Component Showroom & Payload CMS 3.0 Guide (EN / VI)

This guide explains how contributors, systems engineers, and B2B sponsors inspect isolated UI slices, verify accessibility and motion-safety contracts, and connect Payload CMS 3.0 localized collections in `hivemind-portal`.

---

## Part 1 · English Guide (`en`)

### 1. Inspecting Isolated Components with `ShowcaseHarness` & Storybook 8

Every interactive surface in `hivemind-portal` is wrapped by `<ShowcaseHarness />` (`src/modules/content-showroom/showcase-harness.tsx`) and exposed in two places:
1. **Live Portal Route:** Visit `/en/showroom` or `/vi/showroom` inside the Next.js 15 App Router.
2. **Storybook 8 Catalog:** Open `.storybook/main.ts`, `.storybook/preview.tsx`, and the CSF 3.0 stories under `src/stories/WokReactorStage.stories.tsx` and `src/stories/ContentShowroom.stories.tsx`.

The global toolbar and `<ShowcaseHarness />` header provide three deterministic controls:
- **Locale (`en` / `vi`):** Switches all titles, Horizon badges, transcripts, and technical articles between English and Vietnamese without reloading the page.
- **Horizon Tier (`shipped` / `next-release` / `roadmap`):** Filters content across Horizon 1 (`SHIPPED NOW · v0.1`), Horizon 2 (`NEXT RELEASE · v0.2`), and Horizon 3 (`ROADMAP LAB · SUBSTRATE`).
- **Reduced Motion (`boolean`):** Forces `DeterministicCanvasFallbackAdapter` (`renderDeterministicFallbackSvg`) so B2B sponsors and contributors can inspect the static high-contrast SVG schematic alongside the WebGL 3D Cyber-Wok stage.

### 2. Accessibility, Design Tokens & Motion Safety Checklist

All showroom stories and components enforce the `{CHINGCHONGCHINGVIBECODING}` ("Pro, Not Bro") engineering rubric from `design-system/hivemind-portal/MASTER.md`:
- **Hit Targets (`>= 44x44px`):** Every locale toggle, Horizon filter button, and reactor node button sets `minHeight: "44px"` and `minWidth: "44px"`.
- **WCAG AA/AAA Contrast Tokens:**
  - `--bg-wok-iron` (`#080B10`) and `--bg-smoked-basalt` (`#111622`) surfaces.
  - `--text-parchment` (`#F4EFE6`, `18.4:1` AAA contrast) and `--text-ash-slate` (`#94A3B8`, `5.6:1` AA contrast).
  - `--accent-wok-gold` (`#F5A623`), `--accent-jade-wire` (`#22D3EE`), `--accent-dragon-ember` (`#EF4444`), and `--accent-bamboo-green` (`#10B981`).
- **Vietnamese Diacritic Line-Height (`>= 1.18`):** Headings maintain `line-height: 1.24` (`>= 1.18`) in `'Be Vietnam Pro'` to prevent clipping stacked Vietnamese diacritics (`ể`, `ự`, `ẫ`, `ộ`).
- **Keyboard Focus & Motion Safety:** Focus rings use `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#22D3EE]`, and `prefers-reduced-motion: reduce` switches immediately to `DeterministicCanvasFallbackAdapter`.

### 3. Connecting Payload CMS 3.0 Localized Collections

`src/modules/content-showroom/payload-collections.ts` exports four Payload 3.0 collection schemas and the bilingual localization config:
- `payloadLocalizationConfig`: `{ locales: ["en", "vi"], defaultLocale: "en", fallback: true }`.
- `EpisodesCollection` (`slug: "episodes"`): Localized episode metadata, `featuredShowcases`, and synchronized `transcriptTurns` (`timestamp`, `speaker`, `harness`, `text`, `tuiCommand`, `tuiOutput`).
- `ArticlesCollection` (`slug: "articles"`): Localized architecture deep-dives with `proNotBroTakeaway`, `tags`, and structured `sections`.
- `ShowcaseSlicesCollection` (`slug: "showcase-slices"`): 20-clip ecosystem catalog (`S1`–`S10`, `M1`–`M9`, `C1`) with `ThreeLayerXRay` traces.
- `SponsorsCollection` (`slug: "sponsors"`): Localized B2B sponsor tiers (`wok-burner`, `honeycomb-core`, `ecosystem-title`).

To wire a live Payload 3.0 Local API instance, pass `payload` into `PayloadLocalApiAdapter` or `createContentShowroomRepository`:

```ts
import {
  PayloadLocalApiAdapter,
  createContentShowroomRepository,
} from "@/modules/content-showroom";

const repository = createContentShowroomRepository(
  new PayloadLocalApiAdapter({ payload: payloadInstance })
);

const viEpisodes = await repository.listEpisodes("vi");
```

When `payload` is omitted or offline, `PayloadLocalApiAdapter` automatically falls back to `InMemoryContentAdapter` (`src/modules/content-showroom/seed-data.ts`), guaranteeing zero-downtime builds and deterministic tests.

---

## Phần 2 · Hướng Dẫn Tiếng Việt (`vi`)

### 1. Kiểm Tra Độc Lập Các Thành Phần Với `ShowcaseHarness` & Storybook 8

Mọi thành phần giao diện trong `hivemind-portal` đều được bọc bởi `<ShowcaseHarness />` (`src/modules/content-showroom/showcase-harness.tsx`) và có thể kiểm tra trực tiếp tại hai nơi:
1. **Đường Dẫn Trực Tiếp Trên Cổng Thông Tin:** Truy cập `/vi/showroom` hoặc `/en/showroom` trên Next.js 15 App Router.
2. **Danh Mục Storybook 8:** Mở `.storybook/main.ts`, `.storybook/preview.tsx`, cùng các tệp story tại `src/stories/WokReactorStage.stories.tsx` và `src/stories/ContentShowroom.stories.tsx`.

Thanh công cụ của `<ShowcaseHarness />` cung cấp 3 bộ điều khiển tất định:
- **Ngôn ngữ (`en` / `vi`):** Chuyển đổi tức thời toàn bộ tiêu đề, huy hiệu Chân Trời, bản gỡ băng hội thoại và bài viết kỹ thuật giữa Tiếng Việt và Tiếng Anh.
- **Chân Trời Trưởng Thành (`shipped` / `next-release` / `roadmap`):** Lọc nội dung theo Chân Trời 1 (`ĐÃ PHÁT HÀNH · v0.1`), Chân Trời 2 (`BẢN KẾ TIẾP · v0.2`) và Chân Trời 3 (`PHÒNG LAB LỘ TRÌNH · SUBSTRATE`).
- **Giảm Chuyển Động (`reducedMotion`):** Kích hoạt `DeterministicCanvasFallbackAdapter` (`renderDeterministicFallbackSvg`) để các nhà tài trợ B2B và kỹ sư kiểm chứng sơ đồ SVG độ tương phản cao thay cho vòng lặp WebGL 3D.

### 2. Danh Mục Kiểm Chứng Khả Năng Tiếp Cận & Token Thiết Kế

Toàn bộ thành phần trong phòng trưng bày tuân thủ nghiêm ngặt tiêu chuẩn `{CHINGCHONGCHINGVIBECODING}` ("Pro, Not Bro") trong `design-system/hivemind-portal/MASTER.md`:
- **Vùng Chạm Tối Thiểu (`>= 44x44px`):** Mọi nút chuyển ngôn ngữ, nút lọc Chân Trời và nút chọn nút lò phản ứng đều đặt `minHeight: "44px"` và `minWidth: "44px"`.
- **Độ Tương Phản Chuẩn WCAG AA/AAA:** Sử dụng bảng màu `--bg-wok-iron` (`#080B10`), `--bg-smoked-basalt` (`#111622`), `--text-parchment` (`#F4EFE6`), `--accent-wok-gold` (`#F5A623`), `--accent-jade-wire` (`#22D3EE`), `--accent-dragon-ember` (`#EF4444`) và `--accent-bamboo-green` (`#10B981`).
- **Bảo Toàn Dấu Tiếng Việt (`line-height >= 1.18`):** Các tiêu đề sử dụng phông `'Be Vietnam Pro'` với `line-height: 1.24` để không bao giờ cắt mất dấu chồng (`ể`, `ự`, `ẫ`, `ộ`).

### 3. Kết Nối Bộ Sưu Tập Đa Ngôn Ngữ Payload CMS 3.0

Mô-đun `src/modules/content-showroom/payload-collections.ts` định nghĩa đầy đủ 4 bộ sưu tập Payload 3.0 (`EpisodesCollection`, `ArticlesCollection`, `ShowcaseSlicesCollection`, `SponsorsCollection`) với `access: { read: () => true }` và `localized: true` trên toàn bộ trường văn bản song ngữ. Khi chạy không có cơ sở dữ liệu, `PayloadLocalApiAdapter` tự động chuyển về `InMemoryContentAdapter` để đảm bảo quá trình build và chạy `bun test` luôn đạt 100% tất định.
