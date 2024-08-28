import express from 'express'
import {v4 as uuidv4} from 'uuid'
import {users} from '../routes/users' 

import {validationTitleDescription, updateValidation} from '../middlewares/validationsMessages'

const router = express.Router()

const messages = []

router.post('/message', validationTitleDescription, (req, res) => {
    try{
        const {title, description, email} = req.body

        const emailUser = users.find(user => user.email === email)
        if(!emailUser) {
            return res.status(404).json({message: 'E-mail não encontrado, verifique ou crie uma conta.'})
        }

        const newMessage = {
            id: uuidv4(),
            title,
            description,
            email
        }

        messages.push(newMessage)

        res.status(201).json({message: 'Mensagem criada com sucesso!', newMessage})

    }catch {
        res.status(500).json({message: 'Erro ao adicionaar um nova mensagem.'})
    }
})


router.get('/message/:email', (req,res) => {
    try {
        const {email} = req.params

        const emailUser = users.find(user => user.email === email)
        if(!emailUser) {
            return res.status(404).json({message: 'E-mail não encontrado verifique ou crie uma conta.'})
        }

        const messagesUser = messages.filter(message => message.email === email)

        res.status(200).json({message: `Seja bem-vinde`, messages: messagesUser})

    }catch {
        res.status(500).json({message: 'Erro ao ler mensagens de usuario.'})
    }
})


router.put("/message/:id", updateValidation, (req, res) => {
    try {
        const {id} = req.params
        const {title, description} = req.body

        const idMessage = messages.findIndex(message => message.id === id)
        if(idMessage === -1) {
            return res.status(404).json({ message: 'Por favor, informe um id válido da mensagem.'})
        }

        if(title) {
            messages[idMessage].title = title
        }

        if(description) {
            messages[idMessage].description = description
        }

        const messageUp = messages[idMessage]

        res.status(200).json({message: 'Mensagem atualizada com sucesso', messageUp: messageUp})

    }catch {
        res.status(500).json({message: 'Erro ao atualizar mensagem.'})
    }
})


router.delete('/message/:id', (req, res) => {
    try {
        const {id} = req.params

        const messageIndex = messages.findIndex(message => message.id === id)
        if (messageIndex === -1) {
            return res.status(404).json({message: 'Mensagem não encontrada, verifique o identificador em nosso banco.'})
        }

        const[messageDel] = messages.splice(messageIndex, 1)

        res.status(200).json({message: 'Mensagem apagada com sucesso'})

    }catch {
        res.status(500).json({message: 'Erro ao deletar a mensagem.'})
    }
})

export default router