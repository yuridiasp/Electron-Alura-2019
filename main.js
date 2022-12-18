const { app, BrowserWindow, ipcMain, shell, Tray, Menu, globalShortcut } = require("electron")
const path = require('path')
const moment = require('moment')
const data = require('./data.js')
const templateGenerator = require('./template')

let mainWindow
let tray = null

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
    const icon =  `${__dirname}/app/img/icon-tray.png`
    tray = new Tray(icon)
    const template = templateGenerator.geraTrayTemplate(mainWindow, 'logica-programação')
    const trayMenu = Menu.buildFromTemplate(template)
    tray.setContextMenu(trayMenu)
    let templateMenu = templateGenerator.geraMenuPrincipalTemplate(app)
    let menuPrincipal = Menu.buildFromTemplate(templateMenu)
    Menu.setApplicationMenu(menuPrincipal)
    const ret = globalShortcut.register('CmdOrCtrl + Shift + S', () => {
        console.log('Atalho executado')
        mainWindow.send('atalho-iniciar-parar', 'ok')
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
    shell.openExternal("https://www.twitter.com/YuriDias_P")
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

ipcMain.on('curso-parado', (event, curso, tempoEstudando) => {
    data.salvaDados(curso, tempoEstudando)
})

ipcMain.on('carregar-dados-curso', async (event, curso) => {
    let dados = await data.lerAquivoCurso(curso)
    if (dados) {
        event.returnValue = dados['tempo']
    } else {
        event.returnValue = '00:00:00'
    }
})

ipcMain.on('curso-adicionado', (event, curso) => {
    const novoTemplate = templateGenerator.adicionaCursoTray(mainWindow, curso)
    const novoTrayMenu = Menu.buildFromTemplate(novoTemplate)
    tray.setContextMenu(novoTrayMenu)
})