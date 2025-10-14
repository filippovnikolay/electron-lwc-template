import lwc from '@lwc/rollup-plugin';
import replace from '@rollup/plugin-replace';
import path from 'path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const copy = require('rollup-plugin-copy');
const rimraf = require('rimraf');

const distDir = path.resolve('dist');
rimraf.sync(distDir);

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
    lwc({
      modules: [
        {
          dir: 'modules',
          namespace: 'c'
        }
      ]
    }),
    copy({
      targets: [
        { src: 'src/index.html', dest: distDir },
        { src: 'src/assets/styles/salesforce-lightning-design-system.min.css', dest: `${distDir}/assets/styles` }
      ],
      copyOnce: true,
      verbose: true,
      ignore: ['**/win-unpacked/**', '**/dist/**']
    })
  ]
};
