const linkSobre = document.querySelector('#linkSobre')

linkSobre.addEventListener('click', () => {
    window.api.send('abrir-janela-sobre')
})