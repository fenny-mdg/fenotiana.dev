import {vitePlugin as remix} from '@remix-run/dev';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import {flatRoutes} from 'remix-flat-routes';
import {installGlobals} from '@remix-run/node';

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      routes: async defineRoutes => {
        return flatRoutes('routes', defineRoutes, {
          ignoredRouteFiles: [
            '.*',
            '**/*.css',
            '**/*.test.{js,jsx,ts,tsx}',
            '**/__*.*',
          ],
        });
      },
    }),
    tsconfigPaths(),
  ],
});
