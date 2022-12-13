const fecharButton = document.querySelector("#linkFechar")
const linkSistemaFR = document.querySelector("#linkSistemaFR")
const versionElectron = document.querySelector("#versionElectron")
const versionNodeJS = document.querySelector("#versionNodeJS")

fecharButton.addEventListener('click', () => {
    window.api.send('fechar-janela')
})

linkSistemaFR.addEventListener('click', () => {
    window.api.send('link-sistema-fr')
})

versionElectron.textContent = window.api.versionElectron()
versionNodeJS.textContent = window.api.versionNodeJS()