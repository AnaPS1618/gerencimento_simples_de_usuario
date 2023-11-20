require('dotenv').config()

const senhaSecreta = process.env.JWT_SENHA_SECRETA;

module.exports = senhaSecreta;