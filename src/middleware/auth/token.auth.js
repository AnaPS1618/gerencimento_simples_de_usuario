const jwt = require('jsonwebtoken');
const senhaSecreta = require('../senhaJWT');
const pool = require('../../config/conexao');


const validandoToken = async (req, res, next) => {

    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401)
        .json('Para acessar este recurso um token de autenticação válido deve ser enviado')
    }

    try{
        const token = authorization.split(" ")[1];

        const {id} = jwt.verify(token, senhaSecreta)

        const buscandoUsuario = `
            select * from cadastro 
            where id = $1;
        `

        const {rows, rowCount} = await pool.query(buscandoUsuario,
                [id]
        )

        if(rowCount < 1){
            return res.status(401)
                        .json('Para acessar este recurso um token de autenticação válido deve ser enviado.')
        }

        req.usuario = rows[0]

        next();
    }catch(error){
        console.log(error.message)
        return res.status(500)
        .json('Para acessar este recurso um token de autenticação válido deve ser enviado.')
    }

}

module.exports = validandoToken;