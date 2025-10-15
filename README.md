# Electron LWC Template

A starter template for building **Salesforce Lightning Web Components (LWC)** applications that run as a **desktop app using Electron**.

This project combines:
- **Electron** – for native desktop packaging
- **LWC (Lightning Web Components)** – for fast, modular UI
- **Salesforce Lightning Design System (SLDS)** – for Salesforce-styled UI
- **Rollup** – for bundling your app

---

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