const express = require('express')
const { cadastroDeUsuario } = require('../../middleware/cadastro')
const { loginUsario } = require('../../middleware/login')
const validandoToken = require('../../auth/autenticacaoDoToken')
const { atualizarUsuario } = require('../../middleware/atualizacao')
const { recuperarSenha } = require('../../middleware/recuperacaoSenha')

const rotas = express()

rotas.post('/cadastro', cadastroDeUsuario)
rotas.get('/login', loginUsario)
rotas.post('/recuperar-senha', recuperarSenha)

rotas.use(validandoToken)

rotas.put('/atualizacao-user', atualizarUsuario)


module.exports = {
    rotas
}