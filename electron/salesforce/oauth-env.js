export function readOAuthEnv() {
    const clientId = process.env.SF_CLIENT_ID;
    const redirectUri = process.env.SF_CALLBACK_URL;
    const loginUrl = process.env.SF_LOGIN_URL || 'https://login.salesforce.com';
    if (!clientId || !redirectUri) {
        throw new Error(
            'Missing SF_CLIENT_ID or SF_CALLBACK_URL. For development, copy .env.example to .env in the project folder. For a built .exe, put .env in the same folder as the executable (see README).',
        );
    }
    return { clientId, redirectUri, loginUrl };
}
