const { app, BrowserWindow, ipcMain, shell } = require("electron")
const { dirname } = require("path")
const path = require('path')

app.on('ready', () => {
    console.log('Aplicacao iniciada')
    let mainWindow = new BrowserWindow({
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
                contextIsolation: true,
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

ipcMain.on('fechar-janela', () => {
    sobreWindow.close()
})

ipcMain.on('link-sistema-fr', () => {
    shell.openExternal('http://fabioribeiro.eastus.cloudapp.azure.com/')
})