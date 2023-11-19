const express = require('express')
const { rotas } = require('./src/routes/rotas')

const app = express()


app.use(express.json())
app.use(rotas)

app.listen(8000, () => {
    console.log('rodando na porta 8000')
})