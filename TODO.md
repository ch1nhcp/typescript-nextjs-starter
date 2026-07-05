# Codebase Improvement TODO

File này tổng hợp các hạng mục nên triển khai dần để nâng chất lượng codebase theo review ngày 2026-07-06.

## Cách dùng

- Mỗi hạng mục có `Priority`, `Impact`, `Effort`, và `Definition of Done`.
- Nên làm theo thứ tự `P1` -> `P2` -> `P3`.
- Khi hoàn thành một mục, tick checkbox và cập nhật ngắn phần `Notes`.

## Legend

- `P1`: Quan trọng, nên làm sớm vì ảnh hưởng trực tiếp đến độ ổn định và production readiness.
- `P2`: Quan trọng vừa, giúp codebase bền hơn và dễ scale hơn.
- `P3`: Tối ưu thêm, giúp đồng bộ và nâng trải nghiệm phát triển.

---

## Phase 1: Baseline chất lượng và chống regression

### Thêm test framework và test scripts

- [x] Chọn stack test đầu tiên:
  - Ưu tiên `Vitest` cho unit/integration nhẹ.
  - Cân nhắc `Playwright` cho smoke test hoặc e2e tối thiểu.
- [x] Thêm script `test` trong `package.json`.
- [x] Thêm script `test:watch` cho local DX.
- [x] Viết ít nhất 1 test smoke cho route `/`.
- [x] Viết ít nhất 1 test cho env/config hoặc helper đầu tiên được thêm vào repo.

Priority: `P1`
Impact: Cao
Effort: Trung bình
Definition of Done:

- Có thể chạy `pnpm test` thành công trên máy local.
- CI chạy test và fail đúng khi có regression.
- Repo có ít nhất 2 test thật, không chỉ scaffold rỗng.
  Notes: Đã thêm Vitest + Testing Library. Scripts `test`/`test:watch`. Tests: `src/app/page.test.tsx` (smoke route `/`) và `src/lib/env/server.test.ts` (config). `pnpm test` xanh.

### Thêm `pnpm build` vào CI và cache pnpm store

- [x] Cập nhật workflow ở `.github/workflows/ci.yml` để chạy `pnpm build`.
- [x] Đảm bảo thứ tự hợp lý: install -> type-check -> test -> build -> lint/format hoặc tương đương.
- [x] Thêm cache `~/.pnpm-store` vào CI (dùng `actions/cache` hoặc `pnpm/action-setup` với `cache: true`) để tránh install lại từ đầu mỗi PR.
- [x] Nếu cần, tách CI thành nhiều jobs để dễ đọc và dễ debug hơn.

Priority: `P1`
Impact: Cao
Effort: Thấp
Definition of Done:

- PR không thể merge xanh nếu build production bị lỗi.
- Build step chạy ổn định trên CI ít nhất vài PR liên tiếp.
- Workflow có cache hit ở lần chạy lặp lại (không còn cài lại full store ở mọi PR).
  Notes: CI nay chạy install (frozen-lockfile) -> type-check -> test -> build -> format -> lint. Cache pnpm store qua `actions/setup-node` với `cache: pnpm`. Node lấy từ `.nvmrc`.

### Siết local quality gates để gần với CI hơn

- [x] Quyết định có bật `pre-commit` mặc định hay không.
- [x] Nếu chưa bật `pre-commit`, thêm `pre-push` hoặc script rõ ràng cho dev trước khi push.
- [x] Rà soát `lint-staged` để tránh khác biệt lớn với `pnpm lint`.
- [x] Viết rõ trong README dev cần chạy lệnh nào trước khi mở PR.

Priority: `P1`
Impact: Cao
Effort: Thấp
Definition of Done:

- Local workflow và CI có chung một baseline kiểm tra.
- Giảm trường hợp "local pass nhưng CI fail".
  Notes: `pre-commit` giữ opt-in như cũ; thêm hook `pre-push` (opt-in) chạy `pnpm verify`. Thêm script `verify` (type-check+test+format:ci+lint) khớp CI. README ghi rõ workflow local.

### Sửa mâu thuẫn trong `oxlint` config

- [x] Rà soát file `.oxlintrc.json` (hoặc config tương đương): override thứ hai cho `**/*.ts` / `**/*.tsx` đang tắt `@typescript-eslint/no-explicit-any` sau khi đã bật ở scope trên — vô hiệu hoá rule quan trọng.
- [x] Quyết định rõ rule này có bật hay không, ghi lại lý do trong comment nếu intentionally tắt.
- [x] Rà soát các rule nào khác bị tắt ngầm qua `categories.correctness: "off"` rồi bật lại thủ công — xem xét đơn giản hoá cấu hình.

Priority: `P1`
Impact: Trung bình (ảnh hưởng type safety, không phải runtime)
Effort: Thấp
Definition of Done:

- Không còn rule nào bị tắt ngầm mà không có lý do rõ ràng.
- Config có thể đọc và hiểu trong một lần đọc.
  Notes: Đã xoá override thứ hai vốn tắt ngầm `no-explicit-any` (giờ giữ `error`). 3 rule còn lại trong override đó không có ở base nên xoá là no-op. Config đọc gọn hơn.

---

## Phase 2: Đồng bộ nền tảng kỹ thuật

### Đồng bộ version policy giữa local, docs, và CI

- [x] Đồng bộ version giữa `.nvmrc`, `package.json > packageManager`, và README.
- [x] Cập nhật CI để dùng version Node rõ ràng thay vì `lts/*` nếu team muốn reproducibility cao hơn.
- [x] Kiểm tra lại yêu cầu `pnpm` trong README cho khớp với phiên bản thực tế.

Priority: `P2`
Impact: Trung bình
Effort: Thấp
Definition of Done:

- Developer mới đọc README và setup đúng ngay từ đầu.
- Không còn mismatch giữa local và CI.
  Notes: `.nvmrc`=24 và `packageManager`=pnpm@11.9.0 làm nguồn chuẩn. CI dùng `node-version-file: .nvmrc`. README sửa "pnpm 10" -> pnpm 11 và ghi Node 24.

### Chuẩn hóa typography và global design tokens

- [x] Áp dụng font global nhất quán giữa `layout.tsx` và `globals.css`.
- [x] Đưa typography tokens cơ bản về global scope.
- [x] Gom các màu nền/chữ/interactive states thành token dùng lại được.
- [x] Tránh để page-level CSS tự định nghĩa lại token nền nếu không cần.

Priority: `P2`
Impact: Trung bình
Effort: Thấp
Definition of Done:

- Route mới dùng chung font và token mà không cần copy logic cũ.
- UI giữa các page không bị lệch style nền tảng.
  Notes: `globals.css` body nay dùng `--font-sans` (Geist) thay vì Arial. Thêm typography tokens global. `page.module.css` đổi token cục bộ (`--surface`/`--surface-card`) để không đè `--background`/`--foreground` global. UI giữ nguyên.

### Nâng baseline security headers và CSP

- [x] Rà soát lại các headers trong `next.config.ts`.
- [x] Loại bỏ các header lỗi thời hoặc ít giá trị.
- [x] Thiết kế CSP theo hướng có thể mở rộng khi thêm analytics, image CDN, API calls.
- [x] Ghi chú rõ cách cập nhật CSP khi thêm third-party script/resource.

Priority: `P2`
Impact: Trung bình đến cao
Effort: Trung bình
Definition of Done:

- CSP không còn chỉ là mức tối thiểu mang tính demo.
- Team có hướng dẫn rõ khi cần mở quyền cho script, image, hoặc network calls.
  Notes: Xoá header lỗi thời `X-XSS-Protection`; đổi `Referrer-Policy` -> `strict-origin-when-cross-origin`. CSP tách theo directive dạng mảng, có comment hướng dẫn mở rộng (script/img/connect/font/frame-src). README cập nhật.

---

## Phase 3: Tăng khả năng scale và maintainability

### Chốt convention kiến trúc trước khi thêm feature lớn

- [x] Quyết định structure cho feature-level code:
  - `src/features/*`
  - `src/components/*`
  - `src/server/*`
  - `src/lib/*`
- [x] Viết ngắn rule: code nào thuộc `app`, code nào không nên để trong `app`.
- [x] Đặt convention cho server actions, validation, data fetching, và shared UI.

Priority: `P2`
Impact: Cao khi project bắt đầu lớn
Effort: Trung bình
Definition of Done:

- Có guideline rõ cho contributor mới.
- Feature mới không dồn hết vào `src/app`.
  Notes: Thêm `docs/architecture.md` chốt convention `app`/`features`/`components`/`server`/`lib` + quy tắc cho server actions, validation, data fetching, shared UI. README link tới doc.

### Chuẩn hóa boundary validation

- [x] Giữ Zod/T3 Env làm chuẩn cho input validation ở boundary.
- [x] Khi thêm API/form đầu tiên, viết schema ngay từ đầu.
- [x] Tránh để logic xử lý dữ liệu phụ thuộc vào input chưa validate.
- [x] Cập nhật `src/lib/env/client.ts`: `experimental__runtimeEnv: {}` đang bỏ trống — thêm comment hướng dẫn rõ: mỗi khi thêm biến `NEXT_PUBLIC_*`, phải khai báo trong `client schema` và map vào `experimental__runtimeEnv` / `runtimeEnv` tương ứng trong `src/lib/env/client.ts`, tránh lỗi runtime khó debug.

Priority: `P2`
Impact: Trung bình
Effort: Thấp đến trung bình
Definition of Done:

- Boundary nào nhận input ngoài hệ thống đều có validation rõ ràng.
- `experimental__runtimeEnv` có comment hướng dẫn rõ ràng.
  Notes: Thêm `docs/boundary-validation.md` (pattern Zod parse/safeParse ở boundary). Env vẫn validate qua T3 Env. `src/lib/env/client.ts` đã có comment rõ cho `experimental__runtimeEnv`.

### Cải thiện tài liệu onboarding và production checklist

- [x] Thêm section "What this starter gives you".
- [x] Thêm section "What you still need before production".
- [x] Viết checklist ngắn cho lần setup đầu tiên.
- [x] Ghi rõ workflow local: dev, lint, type-check, test, build.

Priority: `P3`
Impact: Trung bình
Effort: Thấp
Definition of Done:

- Contributor mới có thể setup và làm việc mà không phải đoán.
- README phản ánh đúng maturity thực tế của repo.
  Notes: README có "What this starter gives you", "What you still need before production", "First-time setup checklist", và "Local workflow" (dev/lint/type-check/test/build).

---

## Backlog đề xuất sau khi hoàn thành baseline

- [ ] Thêm `changeset` hoặc release workflow nếu repo sẽ publish hoặc version hóa bài bản.
- [ ] Cân nhắc thêm visual regression hoặc snapshot strategy nếu UI bắt đầu phức tạp.
- [ ] Thêm monitoring/error reporting guideline khi tích hợp production stack.
- [ ] Viết ADR ngắn cho các quyết định kiến trúc quan trọng nếu team mở rộng.

---

## Milestone gợi ý

### Milestone A: Từ starter sạch thành starter an toàn hơn

- [x] `pnpm test` hoạt động
- [x] CI có build
- [x] Local gates gần với CI

### Milestone B: Từ starter an toàn thành nền tảng dễ scale

- [x] Version policy đồng bộ
- [x] Typography/tokens nhất quán
- [x] Security baseline rõ ràng hơn
- [x] Convention kiến trúc được chốt

### Milestone C: Từ nền tảng dễ scale thành team-ready

- [x] README/onboarding hoàn chỉnh
- [x] Boundary validation được áp dụng nhất quán
- [ ] Có backlog cho release, monitoring, và quality mở rộng
