import { BrowserWindow } from 'electron';
import { join } from 'path';

/**
 * @param {{ rootDir: string }} opts rootDir = __dirname of project entry (where preload.cjs and dist/ live)
 */
export function createMainWindow({ rootDir }) {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: join(rootDir, 'preload.cjs'),
            contextIsolation: true,
            nodeIntegration: false,
            sandbox: true,
        },
    });

    const indexPath = join(rootDir, 'dist', 'index.html');
    win.loadFile(indexPath);
}
