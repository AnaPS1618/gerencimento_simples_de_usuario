const senhaSecreta = require('../auth/senhaJWT')
const pool = require('../config/conexao')
const jwt = require('jsonwebtoken')
const transport = require('../mail/transport')


const recuperarSenha = async (req, res) => {
    const {email} = req.body

    try{

        if(!email){
            return res.status(400)
                        .json('inseir campos obrigatórios')
        }

        const buscandoEmail = `
            select * from cadastro 
            where email = $1;
        `

        const verificandoEmail = await pool.query(buscandoEmail, 
            [email]
        )

        if(verificandoEmail >= 1){
            return res.status(400)
            .json({
                message: "Já existe usuário cadastrado com o e-mail informado.",
            });
        }

        const token = jwt.sign({id: verificandoEmail.rows[0].id}, senhaSecreta,
            {expiresIn: '8h'}
        )

        const mailOptions = {
            from: "email_remetente_aqui",
            to: email, //email destinatario
            subject: 'Nodemailer Project',
            text: 'Email de recuperação de senha'
        };

        transport.sendMail(mailOptions, function(error, data) {
            if (error) {
              console.log(error.message);
            } else {
              console.log("Email enviado com sucesso para recuperação de senha");
            }
        });

            return res.status(201).json({auth: token})
    }catch(error){
        console.log(error.message)
        return res.status(500).json('erro interno, necessário verificar')
    }



}



const verificacaoToken = async (req, res) => {
    const {email} = req.body

    try{

        if(!email){
            return res.status(400)
                        .json('inseir campos obrigatórios')
        }

        const buscandoEmail = `
            select * from cadastro 
            where email = $1;
        `

        const verificandoEmail = await pool.query(buscandoEmail, 
            [email]
        )

        if(verificandoEmail >= 1){
            return res.status(400)
            .json({
                message: "Já existe usuário cadastrado com o e-mail informado.",
            });
        }

        const token = jwt.sign({id: verificandoEmail.rows[0].id}, senhaSecreta,
            {expiresIn: '8h'}
        )

            return res.status(201).json({auth: token})
    }catch(error){
        console.log(error.message)
        return res.status(500).json('erro interno, necessário verificar')
    }



}

module.exports = {
    recuperarSenha,
    verificacaoToken
}