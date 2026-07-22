import lwc from '@lwc/rollup-plugin';
import replace from '@rollup/plugin-replace';
import path from 'path';
import { createRequire } from 'node:module';
import importCss from 'rollup-plugin-import-css';

const require = createRequire(import.meta.url);
const copy = require('rollup-plugin-copy');
const rimraf = require('rimraf');

const distDir = path.resolve('dist');

// In watch mode, do not wipe dist — dev runs Electron in parallel with watch and needs index.html to exist.
const isRollupWatch = process.env.ROLLUP_WATCH === 'true' || process.argv.includes('-w');
if (!isRollupWatch) {
    rimraf.sync(distDir);
}

export default {
  input: 'src/index.js',
  output: {
    dir: distDir,
    format: 'esm',
    sourcemap: true,
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      preventAssignment: true
    }),
    {
      ...importCss({
        inject: true,
        include: ['**/node_modules/@salesforce-ux/design-system-2/**/*.css'],
      }),
      enforce: 'pre',
    },
    lwc({
      modules: [
        {
          dir: 'modules',
          namespace: 'c'
        }
      ],
      exclude: ['**/node_modules/@salesforce-ux/design-system-2/**'],
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: distDir },
      ],
      copyOnce: true,
      verbose: true,
      ignore: ['**/win-unpacked/**', '**/dist/**']
    }),
  ]
};
