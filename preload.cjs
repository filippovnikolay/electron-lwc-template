const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sfLogin: () => ipcRenderer.invoke('sf:login'),
    sfLogout: () => ipcRenderer.invoke('sf:logout'),
    sfGetStatus: () => ipcRenderer.invoke('sf:getStatus'),
    sfQuery: (soql) => ipcRenderer.invoke('sf:query', soql),
});
