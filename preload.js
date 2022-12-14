const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
    send: function (msg) {
        ipcRenderer.send(msg)
    },
    versionElectron: function () {
        return process.versions.electron
    },
    versionNodeJS: function () {
        return process.version
    },
    momenteDuration: function (time) {
        let result = ipcRenderer.sendSync('receiveFromMomenteDuration', time)
        return result
    }
})