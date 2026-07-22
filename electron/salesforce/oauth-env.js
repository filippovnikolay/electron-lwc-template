import { getLoadedEnvPath } from '../env/loadDotenv.js';

export function readOAuthEnv() {
    const clientId = process.env.SF_CLIENT_ID;
    const redirectUri = process.env.SF_CALLBACK_URL;
    const loginUrl = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
    if (!clientId || !redirectUri) {
        const loadedFrom = getLoadedEnvPath();
        const hint = loadedFrom
            ? `Loaded .env from ${loadedFrom}, but SF_CLIENT_ID or SF_CALLBACK_URL is missing.`
            : 'No .env was loaded. For development, copy .env.example to .env in the project folder. For a packaged app, ensure .env exists before running npm run dist, or place .env next to the .exe (see README).';
        throw new Error(`Missing SF_CLIENT_ID or SF_CALLBACK_URL. ${hint}`);
    }
    return { clientId, redirectUri, loginUrl };
}
