import fs from 'fs';
import jsforce from 'jsforce';
import { clearConnection, setConnection } from '../salesforce/connection-store.js';
import { readOAuthEnv } from '../salesforce/oauth-env.js';
import { clearPersistedSession, getSessionPath } from '../salesforce/session-persistence.js';

export async function restoreSessionFromDisk() {
    const p = getSessionPath();
    if (!fs.existsSync(p)) {
        return false;
    }
    let data;
    try {
        data = JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch {
        clearPersistedSession();
        return false;
    }
    if (!data.refreshToken) {
        return false;
    }

    let oauth2;
    try {
        oauth2 = readOAuthEnv();
    } catch {
        return false;
    }

    const conn = new jsforce.Connection({
        oauth2: {
            clientId: oauth2.clientId,
            redirectUri: oauth2.redirectUri,
            loginUrl: oauth2.loginUrl,
        },
        instanceUrl: data.instanceUrl,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
    });

    setConnection(conn);

    try {
        await conn.identity();
        return true;
    } catch {
        clearConnection();
        clearPersistedSession();
        return false;
    }
}
