import { createEnv } from '@t3-oss/env-nextjs';

export const clientEnv = createEnv({
  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {},

  /**
   * Every `NEXT_PUBLIC_*` variable you add to the `client` schema above MUST also be mapped here,
   * because Next.js only inlines `process.env.NEXT_PUBLIC_*` when referenced statically.
   *
   * @example
   * client: {
   *   NEXT_PUBLIC_API_URL: z.string().url(),
   * },
   * experimental__runtimeEnv: {
   *   NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
   * },
   *
   * Forgetting the mapping leads to hard-to-debug runtime errors where the variable reads as
   * `undefined` in the browser even though it's set. See https://env.t3.gg/docs/nextjs.
   */
  experimental__runtimeEnv: {},
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
