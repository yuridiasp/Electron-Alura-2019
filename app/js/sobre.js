let linkFechar = document.querySelector("#link-fechar");
let linkTwitter = document.querySelector("#link-twitter");
let versaoElectron = document.querySelector('#versao-electron');

window.onload = function(){
    versaoElectron.textContent = window.api.versionElectron()
}

linkFechar.addEventListener('click', function () {
    window.api.send('fechar-janela-sobre')
})

linkTwitter.addEventListener('click', function () {
    window.api.send('link-twitter')
})