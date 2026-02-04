import swc from 'unplugin-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    environment: 'node',
    exclude: ['**/node_modules/**', '**/dist/**', '**/*.e2e-spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
    },
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
    tsconfigPaths(),
  ],
});
