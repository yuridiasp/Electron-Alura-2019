const jsonfile = require('jsonfile-promised')
const fs = require('fs')

function getCaminhCurso (curso) {
    return `${__dirname}/data/${curso}.json`
}

module.exports = {
    salvaDados (curso, tempoEstudando) {
        let caminhoArquivoCurso = getCaminhCurso(curso)
        let existeArquivo = fs.existsSync(caminhoArquivoCurso)
        if (existeArquivo) {
            this.adicionaTempoCurso(caminhoArquivoCurso, tempoEstudando)
        } else {
            this.criaArquiCurso (caminhoArquivoCurso, { ultimoEstudo: new Date().toString(), tempo: '00:00:00' }).then()
            this.adicionaTempoCurso(caminhoArquivoCurso, tempoEstudando)
        }
    },
    adicionaTempoCurso(caminhoArquivoCurso, tempoEstudando) {
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudando
        }
        jsonfile.writeFile(caminhoArquivoCurso, dados, { spaces: 2 }).then(() => {
            console.log('Escrito no arquivo')
        }).catch(err => {
            console.log('Houve um erro: ' + err)
        })
    },
    criaArquiCurso (caminhoArquivoCurso, conteudo) {
        return jsonfile.writeFile(caminhoArquivoCurso, conteudo).then(() => {
            console.log('Arquivo criado')
        }).catch(err => {
            console.log('Houve um erro: ' + err)
        })
    },
    lerAquivoCurso (curso) {
        let caminhoArquivoCurso = getCaminhCurso(curso)
        let existeArquivo = fs.existsSync(caminhoArquivoCurso)
        if (existeArquivo) {
            return jsonfile.readFile(caminhoArquivoCurso)
        }
        return null
    },
    getNomesCursos () {
        const diretorio = __dirname + '/data/'
        const files = fs.readdirSync(diretorio)
        const cursos = files.map(file => {
            return file.substring(0, file.lastIndexOf('.'))
        })
        return cursos
    }
}