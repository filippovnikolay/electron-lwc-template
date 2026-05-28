import { ipcMain } from 'electron';
import { loginWithOAuthBrowser } from '../auth/oauth-browser-login.js';
import { logoutSalesforce } from '../auth/logout.js';
import { getAuthStatus } from '../auth/status.js';
import { runSoqlQuery } from '../query/soql.js';

export function registerSalesforceIpc() {
    ipcMain.handle('sf:login', async () => {
        const info = await loginWithOAuthBrowser();
        return { ok: true, ...info };
    });

    ipcMain.handle('sf:logout', async () => {
        await logoutSalesforce();
        return { ok: true };
    });

    ipcMain.handle('sf:getStatus', async () => getAuthStatus());

    ipcMain.handle('sf:query', async (_evt, soql) => runSoqlQuery(soql));
}
