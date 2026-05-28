/** @type {import('jsforce').Connection | null} */
let connection = null;

export function getConnection() {
    return connection;
}

/** @param {import('jsforce').Connection | null} conn */
export function setConnection(conn) {
    connection = conn;
}

export function clearConnection() {
    connection = null;
}
