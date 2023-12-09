
const bcrypt = require('bcrypt')
const knex = require('../config/conexao')

const cadastroDeUsuario = async (req, res) => {
    const {nome, email, senha} = req.body
    try{

        if(!nome || !email || !senha){
            return res.status(404)
                        .json('Insira todos os campos solicitados')
        }

        const criptografandoSenha = await bcrypt.hash(senha, 15)


        const uuarioCadastrado = await knex('cadastro')
                                    .insert({
                                        nome: nome,
                                        email: email, 
                                        senha: criptografandoSenha
                                    }).debug()

        const {senha: _, ...novoUsuario} = uuarioCadastrado.rows[0]

        return res.status(201).json(novoUsuario)
    }catch(error){
        console.log(error.message)
        return res.status(500)
                    .json('Erro interno, melhor verificar')
    }

}

module.exports = {
    cadastroDeUsuario
}