let timer
let tempoEstudando = '00:00:00'

export async function iniciar(element) {
    clearInterval(timer)
    timer = setInterval(() => {
        let segundos = window.api.momenteDuration(element.textContent)
        element.textContent = segundos
        tempoEstudando = segundos
    }, 1000)
}

export function parar(curso) {
    clearInterval(timer)
    window.api.cursoParado(curso, tempoEstudando)
}