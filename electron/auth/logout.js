import { clearConnection, getConnection } from '../salesforce/connection-store.js';
import { clearPersistedSession } from '../salesforce/session-persistence.js';

export async function logoutSalesforce() {
    const conn = getConnection();
    if (conn?.accessToken) {
        try {
            await conn.logoutByOAuth2(true);
        } catch {
            /* still clear local session */
        }
    }
    clearConnection();
    clearPersistedSession();
}
