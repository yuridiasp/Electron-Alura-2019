const { app, BrowserWindow, ipcMain, shell } = require("electron")
const path = require('path')
const moment = require('moment')

let mainWindow

app.on('ready', () => {
    console.log('Aplicacao iniciada')
    mainWindow = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    const indexHtml = path.join(__dirname, 'app/index.html')
    mainWindow.loadURL(indexHtml)
})

app.on('window-all-closed', () => {
    app.quit()
})

let sobreWindow = null

ipcMain.on('abrir-janela-sobre', () => {
    
    if (sobreWindow == null) {
        sobreWindow = new BrowserWindow({
            width: 300,
            height: 200,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            },
            alwaysOnTop: true,
            frame: false
        })
        sobreWindow.on('closed', () => {
            sobreWindow = null
        })
    }
    const sobreHtml = path.join(__dirname, 'app/sobre.html')
    sobreWindow.loadURL(sobreHtml)
})

ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close()
})

ipcMain.on('link-twitter', () => {
    shell.openExternal("https://www.twitter.com/dquintanilhas")
})

ipcMain.on('receiveFromMomenteDuration', (event, stringTime) => {
    let segundos = moment.duration(stringTime).asSeconds()
    
    function segundosParaTempo (segundos) {
        segundos++
        return moment().startOf('day').seconds(segundos).format("HH:mm:ss")
    }
    
    let tempo = segundosParaTempo(segundos)

    event.returnValue = tempo
})