import { getConnection } from '../salesforce/connection-store.js';

/**
 * @param {string} soql
 */
export async function runSoqlQuery(soql) {
    const conn = getConnection();
    if (!conn?.accessToken) {
        throw new Error('Not signed in');
    }
    const result = await conn.query(soql);
    return {
        totalSize: result.totalSize,
        done: result.done,
        records: result.records,
    };
}
