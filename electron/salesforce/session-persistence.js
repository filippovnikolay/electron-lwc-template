import { app } from 'electron';
import fs from 'fs';
import { join } from 'path';

export function getSessionPath() {
    return join(app.getPath('userData'), 'salesforce-session.json');
}

/** @param {import('jsforce').Connection} conn */
export function persistSession(conn) {
    const payload = {
        refreshToken: conn.refreshToken,
        instanceUrl: conn.instanceUrl,
        accessToken: conn.accessToken,
        userId: conn.userInfo?.id,
        organizationId: conn.userInfo?.organizationId,
    };
    fs.writeFileSync(getSessionPath(), JSON.stringify(payload, null, 2), 'utf8');
}

export function clearPersistedSession() {
    const p = getSessionPath();
    if (fs.existsSync(p)) {
        fs.unlinkSync(p);
    }
}
