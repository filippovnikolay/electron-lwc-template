import dotenv from 'dotenv';
import { app } from 'electron';
import fs from 'fs';
import { dirname, join } from 'path';

/** @type {string | null} */
let loadedEnvPath = null;

/**
 * Packaged Electron apps often have the wrong cwd; .env is not inside the asar.
 * When packaged, check userData, then the folder containing the executable.
 *
 * @param {string} [projectRootDir] directory containing `main.js` (dev fallback `.env`)
 * @returns {string | null} path to the loaded .env file, if any
 */
export function loadDotenv(projectRootDir) {
    /** @type {string[]} */
    const candidates = [];
    if (app.isPackaged) {
        candidates.push(join(app.getPath('userData'), '.env'));
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
            loadedEnvPath = p;
            return p;
        }
    }

    dotenv.config();
    loadedEnvPath = null;
    console.warn(
        `[env] No .env found. Searched:\n${candidates.map((p) => `  - ${p}`).join('\n')}`,
    );
    return null;
}

export function getLoadedEnvPath() {
    return loadedEnvPath;
}
