# Boundary Validation

**Never trust data that crosses into the system from outside.** Validate it at the
boundary with a schema, then work only with the parsed, typed result.

This starter already uses [Zod](https://zod.dev/) (via [T3 Env](https://env.t3.gg/))
to validate environment variables. Apply the same discipline to every other input.

## What counts as a boundary

- Environment variables (already handled in `src/lib/env`)
- Form submissions / server action arguments
- Route handler request bodies and query params
- `searchParams` and dynamic route `params`
- Responses from third-party APIs
- Anything read from files, cookies, or headers

## Pattern

Define the schema next to the boundary and parse before doing anything else.

```ts
import { z } from 'zod';

const createUserSchema = z.object({
  email: z.string().email(),
  age: z.number().int().min(0).max(150),
});

export async function createUser(formData: unknown) {
  // Throws (or use safeParse for a Result) if the shape is wrong.
  const input = createUserSchema.parse(formData);

  // From here on, `input` is fully typed and trusted.
  // ...
}
```

Prefer `safeParse` when you want to return a friendly error instead of throwing:

```ts
const result = createUserSchema.safeParse(formData);

if (!result.success) {
  return { ok: false, error: result.error.flatten() };
}

const input = result.data;
```

## Rules

- Write the schema **first**, before the handler logic — ideally test-first.
- Type boundary inputs as `unknown`, never `any`, and narrow via the schema.
- Keep feature schemas in the feature's `schema.ts` (see
  [`architecture.md`](./architecture.md)).
- Don't re-validate already-parsed internal data — validate once, at the edge.
