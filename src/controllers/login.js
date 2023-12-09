
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const senhaSecreta = require("../middleware/senhaJWT")
const knex = require('../config/conexao')


const loginUsario = async (req, res) => {

    const {email, senha} = req.body

   try{

        if(!email || !senha){
            return res.status(400)
                        .json('inseir campos obrigatórios')
        }


        const loginLocalizado = await knex('cadastro')
                                    .where('email', email)
            
        const validandoSenha = await bcrypt.compare(senha, 
            loginLocalizado.rows[0].senha
        ) 
        
        if(!validandoSenha){
            return res.status(400)
                        .json('email ou senha inválida')
        }

        const token = jwt.sign({id: loginLocalizado.rows[0].id}, 
            senhaSecreta, 
            {expiresIn: '8h'}
        );

        const {senha: _, ...usuarioValidado} = loginLocalizado.rows[0]

        return res.status(200)
                    .json({usuario: usuarioValidado, token})

   }catch(error){
    console.log(error.message)
        return res.status(500)
                    .json('erro interno, melhor verificar')

   }

}

module.exports = {
    loginUsario
}