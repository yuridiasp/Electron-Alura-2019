let timer

export async function iniciar(element) {
    clearInterval(timer)
    timer = setInterval(() => {
        let segundos = window.api.momenteDuration(element.textContent)
        element.textContent = segundos
    }, 1000)
}

export function parar() {
    clearInterval(timer)
}

export function reiniciar(element) {
    clearInterval(timer)
    element.textContent = '00:00:00'
}