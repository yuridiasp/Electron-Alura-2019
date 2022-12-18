const { ipcMain } = require('electron')
const data = require('./data')

module.exports = {
    templateInicial: null,
    geraTrayTemplate (window, cursoInicial) {
        template = [
            {
                label: 'Cursos'
            },
            {
                label:  '',
                type: 'separator'
            }
        ]

        let cursos = data.getNomesCursos()
        let ehCursoInicial
        cursos.forEach(curso => {
            ehCursoInicial = (curso == cursoInicial)
            template.push({
                label: curso,
                type: 'radio',
                checked: ehCursoInicial,
                click: () => {
                    window.send('curso-trocado', curso)
                }
            })
        })
        this.templateInicial = template
        return template
    },
    adicionaCursoTray (window, curso) {
        let novoTemplate = this.templateInicial
        novoTemplate.forEach(item => {
            item['checked'] = false
        })
        novoTemplate.push({
            label: curso,
            type: 'radio',
            checked: true,
            click: () => {
                window.send('curso-trocado', curso)
            }
        })
        return novoTemplate
    },
    geraMenuPrincipalTemplate(app) {
        const templateMenu = [
            {
                label: 'Arquivo',
                submenu: [
                    { role: 'close' },
                    { role: 'quit' }
                ]
            },
            {
                label: 'Vizualização',
                submenu: [
                    { role: 'reload' },
                    { role: 'toggledevtools' }
                ] 
            },
            {
                label: 'Sobre',
                submenu: [
                    {
                        label: 'Sobre o alura-timer',
                        click: () => {
                            ipcMain.emit('abrir-janela-sobre')
                        },
                        accelerator: 'CmdOrCtrl + I'
                    }
                ]
            }
        ]
    
        if (process.platform == 'darwin') {
            templateMenu.unshift({
                label: app.getName(),
                submenu: [
                    {
                        label: 'Estou rodando no Mac'
                    }
                ]
            })
        }
        return templateMenu
    }
}