const nodemailer = require('nodemailer');
const { verificacaoToken } = require('../middleware/recuperacaoSenha');

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "bca8b99dbc7cde",
      pass: "158f6232e93285",
      refreshToken: verificacaoToken
    }
});


module.exports = transport;