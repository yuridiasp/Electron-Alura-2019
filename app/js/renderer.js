const botaoPlay = document.querySelector('.botao-play')
const tempo = document.querySelector('.tempo')
const resetTimer = document.querySelector('.reset')
const linkSobre = document.querySelector('#link-sobre')
import { iniciar, parar } from './timer.js'
let imgsSource = ['img/play-button.svg', 'img/stop-button.svg']
let play = false

linkSobre.addEventListener('click' , function(){
    window.api.send('abrir-janela-sobre')
})

botaoPlay.addEventListener('click', event => {
    imgsSource = imgsSource.reverse()
    play = !play
    if (play) {
        iniciar(tempo)
    } else {
        parar()
    }
    event.target.src = imgsSource[0]
})

resetTimer.addEventListener('click', event => {
    parar(tempo)
    play = false
    imgsSource = ['img/play-button.svg', 'img/stop-button.svg']
    botaoPlay.src = imgsSource[0]
})