# Electron LWC Template

A starter template for building **Salesforce Lightning Web Components (LWC)** applications that run as a **desktop app using Electron**.

This project combines:
- **Electron** – for native desktop packaging
- **LWC (Lightning Web Components)** – for fast, modular UI
- **Salesforce Lightning Design System (SLDS)** – for Salesforce-styled UI
- **Rollup** – for bundling your app
- **jsforce** – Salesforce REST/OAuth

---

## Salesforce sign-in (Connected App)

1. In Salesforce, create a **Connected App** with OAuth enabled. Enable **PKCE** (“Require Proof Key for Code Exchange (PKCE) for the Authorization Code Flow”).
2. Set the **Callback URL** to a fixed local URL (example: `http://localhost:5173/oauth/callback`). That URL must match **exactly** in the app and in the Connected App.
3. Copy `.env.example` to `.env` and set:
   - `SF_CLIENT_ID` – Consumer Key from the Connected App
   - `SF_CALLBACK_URL` – same callback URL as in the Connected App
   - `SF_LOGIN_URL` – example: https://yoursandboxdomain.sandbox.my.salesforce.com
4. Add OAuth scopes on the Connected App such as **Access and manage your data (api)** and **Perform requests at any time (refresh_token, offline_access)**.

## Getting Started

### Install dependencies

```bash
    npm install
```

### Development mode

```bash
    npm run dev
```

Make changes directly in your source files and reload the Electron window to see updates instantly — no build step needed.

### Production (build .exe file) 

```bash
    npm run dist
```

The **release** folder contains both the unpacked version of your built application and the installer setup files.

### Debugging

To debug your app, open the Electron Developer Tools from View → Toggle Developer Tools.

### Documentation

1. LWC Open Source: https://lwc.dev/guide/introduction
2. Examples: https://recipes.lwc.dev/#hello
3. LWC repo: https://github.com/trailheadapps/lwc-recipes-oss/blob/main/README.md
4. Electron JS: https://www.electronjs.org/