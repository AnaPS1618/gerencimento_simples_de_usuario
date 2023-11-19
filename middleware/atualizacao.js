const pool = require("../config/conexao")
const bcrypt = require ('bcrypt')


const atualizarUsuario = async (req, res) => {

    const {nome, email, senha} = req.body

    try{

        if(!nome || !email || !senha){
            return res.status(404)
                        .json('Insira todos os campos solicitados')
        }

        //necessário verificar se já possui algum email já cadastrado
        const verificarEmailDuplicado = `
            select * from cadastro
            where email = $1;
        `

        const {rowCount} = await pool.query(verificarEmailDuplicado, 
            [email]
        )

        if(rowCount >= 1){
            return res.status(400)
            .json({
                message: "Já existe usuário cadastrado com o e-mail informado.",
            });
        }

        
        const atualizandoUsuario = `
            update cadastro set 
            nome = $1, email = $2, senha = $3
            where id = $4 returning *;
        `
        
        //necessário criptografar novamente senha
        const criptografandoSenha = await bcrypt.hash(senha, 15)

        const usuarioAtualizado = await pool.query(atualizandoUsuario,
            [nome, email, criptografandoSenha, req.usuario.id]
        )
        
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