/**
 * Stages files for electron-builder extraFiles (e.g. .env next to the packaged exe).
 */
import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'packaging');

mkdirSync(outDir, { recursive: true });
cpSync(join(root, '.env.example'), join(outDir, '.env.example'));

const envPath = join(root, '.env');
if (existsSync(envPath)) {
    cpSync(envPath, join(outDir, '.env'));
    console.log('Packaging: included .env from project root.');
} else {
    console.warn(
        'Packaging: no .env in project root — copy .env.example to .env before dist, or place .env next to the installed .exe.',
    );
}
