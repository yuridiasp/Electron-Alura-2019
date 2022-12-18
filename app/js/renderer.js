const botaoPlay = document.querySelector('.botao-play')
const tempo = document.querySelector('.tempo')
const linkSobre = document.querySelector('#link-sobre')
import { iniciar, parar } from './timer.js'
let imgsSource = ['img/play-button.svg', 'img/stop-button.svg']
let play = false
const curso = document.querySelector('.curso')
const botaoAdicionar = document.querySelector('.botao-adicionar')
const campoAdicionar = document.querySelector('.campo-adicionar')

linkSobre.addEventListener('click' , function(){
    window.api.send('abrir-janela-sobre')
})

botaoPlay.addEventListener('click', event => {
    imgsSource = imgsSource.reverse()
    play = !play
    if (play) {
        iniciar(tempo)
        new Notification('Alura Timer', {
            body: `O curso ${curso.textContent} foi iniciado!`,
            icon: 'img/play-button.png'
        })
    } else {
        parar(curso.textContent)
        new Notification('Alura Timer', {
            body: `O curso ${curso.textContent} foi parado!`,
            icon: 'img/stop-button.png'
        })
    }
    event.target.src = imgsSource[0]
})

window.api.cursoTrocado(async (event, nomeCurso) => {
    parar(curso.textContent)
    curso.textContent = nomeCurso
    tempo.textContent = await window.api.carregarDados(curso.textContent)
})

window.onload = async () => {
    tempo.textContent = await window.api.carregarDados(curso.textContent)
}

botaoAdicionar.addEventListener('click', () => {
    let novoCurso = campoAdicionar.value
    if (novoCurso.length == 0) {
        alert('Não é possível adicionar curso vazio')
        return
    }
    curso.textContent = novoCurso
    tempo.textContent = '00:00:00'
    campoAdicionar.value = ''
    window.api.cursoAdicionado(novoCurso)
})

window.api.atalhoIniciarParar(async (event, ok) => {
    let click = new MouseEvent('click')
    botaoPlay.dispatchEvent(click)
})