import { LightningElement } from 'lwc';

import {
    getLoginStatus,
    login,
    logout,
    query,
} from '../../../services/sf-ipc.js';

export default class App extends LightningElement {
    static renderMode = 'light';

    connected = false;
    userId;
    orgId;
    instanceUrl;
    errorMessage;
    queryJson;
    busy = false;

    async connectedCallback() {
        await this.refreshStatus();
    }

    applyStatus(s) {
        this.connected = Boolean(s.connected);
        this.userId = s.userId;
        this.orgId = s.organizationId;
        this.instanceUrl = s.instanceUrl;
    }

    async refreshStatus() {
        this.errorMessage = undefined;
        try {
            const s = await getLoginStatus();
            this.applyStatus(s);
        } catch (e) {
            this.errorMessage = e?.message || String(e);
        }
    }

    async handleLogin() {
        this.busy = true;
        this.errorMessage = undefined;
        try {
            await login();
            await this.refreshStatus();
        } catch (e) {
            this.errorMessage = e?.message || String(e);
        } finally {
            this.busy = false;
        }
    }

    async handleLogout() {
        this.busy = true;
        this.errorMessage = undefined;
        try {
            await logout();
            await this.refreshStatus();
            this.queryJson = undefined;
        } catch (e) {
            this.errorMessage = e?.message || String(e);
        } finally {
            this.busy = false;
        }
    }

    async handleSampleQuery() {
        this.busy = true;
        this.errorMessage = undefined;
        this.queryJson = undefined;
        try {
            const res = await query(
                `SELECT Id, Name, Username
                 FROM User
                 WHERE IsActive = true
                 ORDER BY CreatedDate ASC LIMIT 3`
            );
            this.queryJson = JSON.stringify(res, null, 2);
        } catch (e) {
            this.errorMessage = e?.message || String(e);
        } finally {
            this.busy = false;
        }
    }
}
