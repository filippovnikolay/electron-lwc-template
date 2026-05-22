import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { app } from 'electron';
import { loadDotenv } from './electron/env/loadDotenv.js';
import { restoreSessionFromDisk } from './electron/auth/session-restore.js';
import { registerSalesforceIpc } from './electron/ipc/register-salesforce-ipc.js';
import { createMainWindow } from './electron/window/create-main-window.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadDotenv(__dirname);

async function start() {
    await app.whenReady();
    registerSalesforceIpc();
    await restoreSessionFromDisk();
    createMainWindow({ rootDir: __dirname });
}

start().catch((err) => {
    console.error(err);
    app.quit();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
