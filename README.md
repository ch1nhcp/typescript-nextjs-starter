<p align="center">
  <img src="https://user-images.githubusercontent.com/26466516/141659551-d7ba5630-7200-46fe-863b-87818dae970a.png" alt="Next.js TypeScript Starter">
</p>

<br />

<div align="center"><strong>Non-opinionated TypeScript starter for Next.js</strong></div>
<div align="center">Highly scalable foundation with the best DX. All the tools you need to build your Next project.</div>

<br />

<div align="center">
  <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&style=flat-square&color=5e17eb&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/github/license/jpedroschmitz/typescript-nextjs-starter?style=flat-square&color=5e17eb&labelColor=000000">

  <a href="https://x.com/intent/follow?screen_name=jpedroschmitz">
    <img src="https://img.shields.io/twitter/follow/jpedroschmitz?style=flat-square&color=5e17eb&labelColor=000000" alt="Follow @jpedroschmitz" />
  </a>
</div>

<div align="center">
  <sub>Created by <a href="https://x.com/jpedroschmitz">João Pedro</a> with the help of many <a href="https://github.com/jpedroschmitz/typescript-nextjs-starter/graphs/contributors">wonderful contributors</a>.</sub>
</div>

<br />

## Features

- ⚡️ Next.js 16 (App Router)
- ⚛️ React 19
- ⛑ TypeScript
- 📏 Oxlint — To find and fix problems in your code
- 💖 Oxfmt — High-performance formatter for consistent style
- 🧪 Vitest — Unit/integration testing with Testing Library
- 🐶 Husky — For running scripts before committing
- 🚓 Commitlint — To make sure your commit messages follow the convention
- 🖌 Renovate — To keep your dependencies up to date
- 🚫 lint-staged — Run Oxlint and Oxfmt against staged Git files
- 👷 PR Workflow — Run Type Check & Linters on Pull Requests
- ⚙️ EditorConfig - Consistent coding styles across editors and IDEs
- 🗂 Path Mapping — Import components or images using the `@` prefix
- 🔐 CSP — Content Security Policy for enhanced security (default minimal policy)
- 🧳 T3 Env — Type-safe environment variables
- 🪧 Redirects — Easily add redirects to your application

## Quick Start

The best way to start with this template is using [Create Next App](https://nextjs.org/docs/api-reference/create-next-app).

```
# pnpm
pnpm create next-app -e https://github.com/jpedroschmitz/typescript-nextjs-starter
# yarn
yarn create next-app -e https://github.com/jpedroschmitz/typescript-nextjs-starter
# npm
npx create-next-app -e https://github.com/jpedroschmitz/typescript-nextjs-starter
```

### Development

To start the project locally, run:

```bash
pnpm dev
```

Open `http://localhost:3000` with your browser to see the result.

### First-time setup checklist

1. Install the Node version from [`.nvmrc`](.nvmrc) (`nvm use`).
2. Enable Corepack so the pinned pnpm version is used: `corepack enable`.
3. Install dependencies: `pnpm install`.
4. (Optional) Create a `.env.local` file for local environment variables.
5. Start the app: `pnpm dev`.
6. Before opening a PR, run `pnpm verify` (see [Local workflow](#local-workflow)).

### Local workflow

Run these before pushing so local checks match CI (this is exactly what CI runs):

```bash
pnpm type-check   # TypeScript, no emit
pnpm test         # Vitest unit/integration tests
pnpm format:ci    # Oxfmt formatting check
pnpm lint         # Oxlint (type-aware)
pnpm build        # Production build

pnpm verify       # Shortcut: type-check + test + format:ci + lint
```

CI (`.github/workflows/ci.yml`) runs install → type-check → test → build → format → lint
on every pull request, so a green `pnpm verify` locally means far fewer CI surprises.
You can also enable the opt-in Husky `pre-push` hook to run `pnpm verify` automatically
(see [Husky](#husky)).

### What this starter gives you

- A configured Next.js 16 + React 19 + TypeScript baseline with strict compiler options.
- Fast linting/formatting (Oxlint + Oxfmt) and a type-aware lint step.
- A test setup (Vitest + Testing Library) with example smoke and config tests.
- Type-safe environment variables (T3 Env + Zod).
- Sensible security headers and an extensible CSP baseline.
- CI that type-checks, tests, builds, and lints every PR.
- Conventions for growing the codebase — see [`docs/architecture.md`](docs/architecture.md).

### What you still need before production

This is a foundation, not a finished app. Before shipping, plan to add:

- [ ] Real content and routes (the demo `/` page is a placeholder).
- [ ] An error reporting / monitoring integration (e.g. Sentry).
- [ ] Analytics (remember to update the CSP in `next.config.ts`).
- [ ] Tighten the CSP toward a nonce-based `default-src 'self'` policy and wire up
      a reporting endpoint for `report-to`.
- [ ] Authentication/authorization if your app needs it.
- [ ] A data layer (database/API) with validation at every boundary — see
      [`docs/boundary-validation.md`](docs/boundary-validation.md).
- [ ] E2E tests for critical flows (e.g. Playwright) if the app grows complex.
- [ ] Environment variables configured in your hosting provider.

## Testimonials

> [**“This starter is by far the best TypeScript starter for Next.js. Feature packed but un-opinionated at the same time!”**](https://github.com/jpedroschmitz/typescript-nextjs-starter/issues/87#issue-789642190)<br>
> — Arafat Zahan

> [**“I can really recommend the Next.js Typescript Starter repo as a solid foundation for your future Next.js projects.”**](https://corfitz.medium.com/create-a-custom-create-next-project-command-2a6b35a1c8e6)<br>
> — Corfitz

> [**“Brilliant work!”**](https://github.com/jpedroschmitz/typescript-nextjs-starter/issues/87#issuecomment-769314539)<br>
> — Soham Dasgupta

## Showcase

List of websites that started off with Next.js TypeScript Starter:

- [FreeInvoice.dev](https://freeinvoice.dev)
- [Notion Avatar Maker](https://github.com/Mayandev/notion-avatar)
- [IKEA Low Price](https://github.com/Mayandev/ikea-low-price)
- [hygraph.com](https://hygraph.com)
- [rocketseat.com.br](https://www.rocketseat.com.br)
- [vagaschapeco.com](https://vagaschapeco.com)
- [unfork.vercel.app](https://unfork.vercel.app)
- [Add yours](https://github.com/jpedroschmitz/typescript-nextjs-starter/edit/main/README.md)

## Documentation

### Requirements

- Node.js 24 — pinned in [`.nvmrc`](.nvmrc) and used by CI. Run `nvm use` to match it.
- pnpm 11 — pinned via the `packageManager` field in `package.json`. Enable it with
  `corepack enable`.

### Directory Structure

- [`.github`](.github) — GitHub configuration including the CI workflow.<br>
- [`.husky`](.husky) — Husky configuration and hooks.<br>
- [`docs`](./docs) — Architecture and contributor conventions.<br>
- [`public`](./public) — Static assets such as robots.txt, images, and favicon.<br>
- [`src`](./src) — Application source code, including pages, components, styles.

For where feature code, shared UI, and server code should live, see
[`docs/architecture.md`](docs/architecture.md).

### Scripts

- `pnpm dev` — Starts the application in development mode at `http://localhost:3000`.
- `pnpm build` — Creates an optimized production build of your application.
- `pnpm build:analyze` — Analyze the production build to see the bundle size.
- `pnpm start` — Starts the application in production mode.
- `pnpm type-check` — Validate code using TypeScript compiler.
- `pnpm test` — Run the Vitest test suite once.
- `pnpm test:watch` — Run Vitest in watch mode for local development.
- `pnpm verify` — Run type-check, tests, format check, and lint together (matches CI).
- `pnpm lint` — Runs Oxlint for all files in the `src` directory.
- `pnpm lint:fix` — Runs Oxlint fix for all files in the `src` directory.
- `pnpm format` — Runs Oxfmt for all files in the `src` directory.
- `pnpm format:check` — Check Oxfmt list of files that need to be formatted.
- `pnpm format:ci` — Oxfmt check for CI.

### Path Mapping

TypeScript are pre-configured with custom path mappings. To import components or files, use the `@` prefix.

```tsx
import { Button } from '@/components/Button';
// To import images or other files from the public folder
import avatar from '@/public/avatar.png';
```

### Switch to Yarn/npm

This starter uses pnpm by default, but this choice is yours. If you'd like to switch to Yarn/npm, delete the `pnpm-lock.yaml` file, install the dependencies with Yarn/npm, change the CI workflow, and Husky Git hooks to use Yarn/npm commands.

> **Note:** If you use Yarn, make sure to follow these steps from the [Husky documentation](https://typicode.github.io/husky/troubleshoot.html#yarn-on-windows) so that Git hooks do not fail with Yarn on Windows.

### Environment Variables

We use [T3 Env](https://env.t3.gg/) to manage environment variables. Create a `.env.local` file in the root of the project and add your environment variables there.

When adding additional environment variables, the schema in `./src/lib/env/client.ts` or `./src/lib/env/server.ts` should be updated accordingly.

### Redirects

To add redirects, update the `redirects` array in `./redirects.ts`. It's typed, so you'll get autocompletion for the properties.

### Testing

Tests run with [Vitest](https://vitest.dev/) and
[Testing Library](https://testing-library.com/). Test files live next to the code
they cover as `*.test.ts` / `*.test.tsx` (see `src/app/page.test.tsx` and
`src/lib/env/server.test.ts` for examples).

```bash
pnpm test         # run once
pnpm test:watch   # watch mode
```

Files that need the Node environment instead of jsdom (for example, code that reads
server-side env vars) opt in with a `// @vitest-environment node` comment at the top
of the file.

### CSP (Content Security Policy)

The Content Security Policy (CSP) is a security layer that helps to detect and mitigate certain types of attacks, including Cross-Site Scripting (XSS) and data injection attacks. The CSP is implemented in the `next.config.ts` file.

It contains a strict-but-minimal baseline that you customize as your app grows. Each
directive is listed separately with inline notes on how to open it up when you add
analytics, an image CDN, external API calls, or embedded frames. When you add a
third-party script or resource, update the matching directive
(`script-src`, `img-src`, `connect-src`, `font-src`, `frame-src`) in `next.config.ts`.

### Husky

Husky is a tool that helps us run scripts before Git events. We have 4 hooks:

- `pre-commit` — (Disabled by default) Runs lint-staged to lint and format the files.
- `pre-push` — (Disabled by default) Runs `pnpm verify` (type-check, tests, format, lint) so you catch CI failures before pushing.
- `commit-msg` — Runs commitlint to check if the commit message follows the conventional commit message format.
- `post-merge` — Runs pnpm install to update the dependencies if there was a change in the `pnpm-lock.yaml` file.

> Important note: The `pre-commit` and `pre-push` hooks are disabled by default. This is intentional because most developers don't want them running on every commit/push. To enable them, run `echo 'HUSKY_ENABLED=true' > .husky/_/pre-commit.options` and/or `echo 'HUSKY_ENABLED=true' > .husky/_/pre-push.options`.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for more information.
