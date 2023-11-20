const express = require('express')
const { cadastroDeUsuario } = require('../controllers/cadastro')
const { loginUsario } = require('../controllers/login')
const { recuperarSenha } = require('../controllers/recuperacaoSenha')
const validandoToken = require('../middleware/auth/token.auth')
const { atualizarUsuario } = require('../controllers/atualizacao')


const rotas = express()

rotas.post('/cadastro', cadastroDeUsuario)
rotas.get('/login', loginUsario)
rotas.post('/recuperar-senha', recuperarSenha)

rotas.use(validandoToken)

rotas.put('/atualizacao-user', atualizarUsuario)


module.exports = {
    rotas
}