# Architecture & Conventions

This starter ships with a single demo route, but as soon as you add real features
you'll want a place for code that isn't a route. This document defines where that
code lives so features don't all pile up inside `src/app`.

Adopt these conventions before adding your first non-trivial feature — retrofitting
structure later is more expensive than starting with it.

## Directory layout

```
src/
  app/         # Next.js App Router: routes, layouts, route handlers ONLY
  features/    # Self-contained feature modules (UI + logic + types)
  components/  # Shared, reusable, presentational UI (no feature logic)
  server/      # Server-only code: data access, server actions, integrations
  lib/         # Framework-agnostic utilities and shared config (e.g. env)
```

### `src/app` — routing only

Keep `app/` thin. A file in `app/` should mostly compose things defined elsewhere:

- `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts` (route handlers).
- Wiring: read params/search params, call a server action or data loader, render a
  feature or component.

Do **not** put reusable business logic, data fetching internals, or shared UI here.
If two routes would need it, it doesn't belong in `app/`.

### `src/features/*` — feature modules

Each feature owns its slice of the app and keeps related code together:

```
src/features/<feature>/
  components/   # UI specific to this feature
  server/       # server actions / data loaders for this feature
  schema.ts     # Zod schemas for this feature's boundaries
  types.ts
```

Prefer importing a feature through a small public surface (e.g. a barrel `index.ts`)
rather than reaching deep into its internals from other features.

### `src/components/*` — shared UI

Generic, presentational, reusable components (Button, Card, Input). No business
logic, no data fetching. If a component only makes sense for one feature, it lives
in that feature instead.

### `src/server/*` — server-only code

Cross-feature server code: database clients, third-party API integrations, and
shared server actions. Mark true server-only modules with `import 'server-only'` so
they can never be bundled into the client.

### `src/lib/*` — framework-agnostic utilities

Pure helpers and shared config that don't depend on React or Next internals. The
type-safe env config (`src/lib/env`) already lives here.

## Server actions, validation & data fetching

- **Validate at every boundary.** Any input from outside the system — form data,
  request bodies, search params, third-party API responses — must be parsed with a
  Zod schema before use. See [`boundary-validation.md`](./boundary-validation.md).
- **Server actions** live in a feature's `server/` folder (or `src/server` if
  shared) and validate their input first thing.
- **Data fetching** belongs in `server/` loaders, not inline in `app/` pages, so it
  can be reused and tested.
- **Never let unvalidated input flow into business logic.** Parse first, then work
  with the typed result.

## Rule of thumb

> If you're about to add a second file to `src/app` that isn't a route file, it
> probably belongs in `features/`, `components/`, `server/`, or `lib/` instead.
