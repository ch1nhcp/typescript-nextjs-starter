import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Unmount React trees rendered during a test so they don't leak into the next one.
afterEach(() => {
  cleanup();
});
