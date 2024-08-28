import express from 'express'
import cors from 'cors'

import usersRoute from './routes/users.js'
import messageRoute from './routes/meesagem.js'

const port = 8080

const app = express()

app.use(cors())
app.use(express.json())

app.use('/users', usersRoute)
app.use('/messages', messageRoute)


app.get('/', (req, res) => {
    res.status(200).json({message: 'Bem-vindo à aplicação'})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})