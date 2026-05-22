const bridge = () => (typeof window !== 'undefined' ? window.electronAPI : undefined);

function requireBridge() {
    const api = bridge();
    if (!api) {
        throw new Error('Electron bridge unavailable.');
    }
    return api;
}

export async function getLoginStatus() {
    const api = requireBridge();
    if (!api.sfGetStatus) {
        throw new Error('Preload bridge incomplete (open this app via Electron, not a browser).');
    }
    return api.sfGetStatus();
}

export async function login() {
    const api = requireBridge();
    return api.sfLogin();
}

export async function logout() {
    const api = requireBridge();
    return api.sfLogout();
}

/**
 * @param {string} soql
 */
export async function query(soql) {
    const api = requireBridge();
    return api.sfQuery(soql);
}
