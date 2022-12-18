const { ipcRenderer, contextBridge } = require('electron')

contextBridge.exposeInMainWorld('api', {
    send: msg => {
        ipcRenderer.send(msg)
    },
    versionElectron: () => {
        return process.versions.electron
    },
    versionNodeJS: () => {
        return process.version
    },
    momenteDuration: time => {
        let result = ipcRenderer.sendSync('receiveFromMomenteDuration', time)
        return result
    },
    cursoParado: (curso, tempoEstudando) => {
        ipcRenderer.send('curso-parado', curso, tempoEstudando)
    },
    carregarDados: curso => {
        let result = ipcRenderer.sendSync('carregar-dados-curso', curso)
        return result
    },
    cursoTrocado: (curso) => {
        ipcRenderer.on('curso-trocado', curso)
    },
    cursoAdicionado: (curso) => {
        ipcRenderer.send('curso-adicionado', curso)
    },
    atalhoIniciarParar: (ok) => {
        ipcRenderer.on('atalho-iniciar-parar', ok)
    }
})
