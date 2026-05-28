import { shell } from 'electron';
import http from 'http';
import jsforce from 'jsforce';
import { readOAuthEnv } from '../salesforce/oauth-env.js';
import { persistSession } from '../salesforce/session-persistence.js';
import { setConnection } from '../salesforce/connection-store.js';
import { escapeHtml } from './html.js';

/**
 * OAuth 2.0 Authorization Code with PKCE. Opens the system browser; Salesforce redirects to localhost.
 */
export async function loginWithOAuthBrowser() {
    const { clientId, redirectUri, loginUrl } = readOAuthEnv();
    const callbackUrl = new URL(redirectUri);

    const conn = new jsforce.Connection({
        oauth2: {
            clientId,
            redirectUri,
            loginUrl,
            useVerifier: true,
        },
    });

    const authUrl = conn.oauth2.getAuthorizationUrl({
        scope: 'api refresh_token openid',
        code_challenge_method: 'S256',
    });

    await new Promise((resolve, reject) => {
        const server = http.createServer(async (req, res) => {
            try {
                const reqUrl = new URL(req.url || '/', redirectUri);
                if (reqUrl.pathname !== callbackUrl.pathname) {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('Not found');
                    return;
                }

                const err = reqUrl.searchParams.get('error');
                if (err) {
                    const desc = reqUrl.searchParams.get('error_description') || err;
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                    res.end(
                        `<!DOCTYPE html><html><body><p>Sign-in was not completed: ${escapeHtml(desc)}</p></body></html>`,
                    );
                    server.close();
                    reject(new Error(desc));
                    return;
                }

                const code = reqUrl.searchParams.get('code');
                if (!code) {
                    res.writeHead(400, { 'Content-Type': 'text/plain' });
                    res.end('Missing authorization code');
                    return;
                }

                await conn.authorize(code);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(
                    '<!DOCTYPE html><html><body><p>Signed in to Salesforce. You can close this tab and return to the app.</p></body></html>',
                );
                server.close();
                resolve(undefined);
            } catch (e) {
                try {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal error');
                } catch {
                    /* ignore */
                }
                try {
                    server.close();
                } catch {
                    /* ignore */
                }
                reject(e);
            }
        });

        const port = callbackUrl.port ? Number(callbackUrl.port) : callbackUrl.protocol === 'https:' ? 443 : 80;
        const host = callbackUrl.hostname || '127.0.0.1';

        server.on('error', reject);
        server.listen(port, host, () => {
            shell.openExternal(authUrl).catch(reject);
        });
    });

    setConnection(conn);
    persistSession(conn);
    return {
        userId: conn.userInfo?.id,
        organizationId: conn.userInfo?.organizationId,
        instanceUrl: conn.instanceUrl,
    };
}
