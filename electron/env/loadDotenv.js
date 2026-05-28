import dotenv from 'dotenv';
import { app } from 'electron';
import fs from 'fs';
import { dirname, join } from 'path';

/**
 * Packaged Electron apps often have the wrong cwd; .env is not inside the asar.
 * Prefer .env next to the executable when packaged.
 *
 * @param {string} [projectRootDir] directory containing `main.js` (dev fallback `.env`)
 */
export function loadDotenv(projectRootDir) {
    /** @type {string[]} */
    const candidates = [];
    if (app.isPackaged) {
        candidates.push(join(dirname(process.execPath), '.env'));
        if (process.resourcesPath) {
            candidates.push(join(process.resourcesPath, '.env'));
        }
    } else {
        candidates.push(join(process.cwd(), '.env'));
        if (projectRootDir) {
            candidates.push(join(projectRootDir, '.env'));
        }
    }
    for (const p of candidates) {
        if (fs.existsSync(p)) {
            dotenv.config({ path: p });
            return p;
        }
    }
    dotenv.config();
    return null;
}
