// @vitest-environment node
// t3-env detects "server vs client" via `typeof window`; jsdom defines `window`,
// so this file must run in the Node environment to read server-side env vars.
import { describe, expect, it } from 'vitest';

import { serverEnv } from './server';

describe('serverEnv', () => {
  it('validates and exposes NODE_ENV as one of the allowed values', () => {
    expect(['development', 'test', 'production']).toContain(serverEnv.NODE_ENV);
  });
});
