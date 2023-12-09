
const bcrypt = require ('bcrypt')
const knex = require('../config/conexao')


const atualizarUsuario = async (req, res) => {

    const {nome, email, senha} = req.body

    try{

        if(!nome || !email || !senha){
            return res.status(404)
                        .json('Insira todos os campos solicitados')
        }

        //necessário verificar se já possui algum email já cadastrado

        const verificarEmailDuplicado = await knex('cadastro')
                                            .where('email', email)
                                            .debug()

        if(verificarEmailDuplicado >= 1){
            return res.status(400)
            .json({
                message: "Já existe usuário cadastrado com o e-mail informado.",
            });
        }
        
        //necessário criptografar novamente senha
        const criptografandoSenha = await bcrypt.hash(senha, 15)

        const usuarioAtualizado = await knex('cadastro')
                                        .update({
                                            nome: nome, 
                                            email: email, 
                                            senha: criptografandoSenha
                                        }).debug()
        
        const { senha: _, ...sucessoNaAtualizacao } = usuarioAtualizado.rows[0] 

        return res.status(201).json(sucessoNaAtualizacao)

    }catch(error){
        console.log(error.nessage)
        return res.status(500)
                    .json('error interno, necessário verificar')
    }

}

module.exports = {
    atualizarUsuario
}