import { getConnection } from '../salesforce/connection-store.js';

export function getAuthStatus() {
    const conn = getConnection();
    if (!conn?.accessToken) {
        return { connected: false };
    }
    return {
        connected: true,
        userId: conn.userInfo?.id,
        organizationId: conn.userInfo?.organizationId,
        instanceUrl: conn.instanceUrl,
    };
}
