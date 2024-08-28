import express from 'express'
import bcrypt from 'bcrypt'
import {v4 as uuidv4} from 'uuid'

import {validationNameEmailPassword, validationEmailPassword} from '../middlewares/validationsUsers'

const router = express.Router()

 export const users = []

router.post('/signup', validationNameEmailPassword, async(req, res) => {
    try {
        const {name, email, password} = req.body

        const encryptedPassword = await bcrypt.hash(password, 12)

        const findEmail = users.find(user => user.email === email)
        if(findEmail) {
           return res.status(400).json({message: 'E-mail já cadastrado, insira outro.'})
        }

        const newUser = {
            id: uuidv4(),
            name,
            email,
            password: encryptedPassword
        }

        users.push(newUser)

        res.status(201).json({message: `Seja-bem vindo ${newUser.name}! Pessoa usuaria registrada com sucesso!`, user:newUser})

    }catch {
        res.status(500).json({message: 'Erro ao cadastrar usuario.'})
    }
})


router.post('/login', validationEmailPassword, async(req, res) => {
    try {
        const {email, password} = req.body

        const emailUser = users.find(user => user.email === email)
        if(!emailUser) {
           return res.status(404).json({message: 'E-mail não encontrado no sistema, verifique ou crie uma conta.'})
        }

        const samePasswords = await bcrypt.compare(password, emailUser.password)
        if(!samePasswords) {
           return res.status(404).json({message: 'E-mail ou senha invalido.'})
        }

        res.status(200).json({message:`Seja bem-vindo ${emailUser.name}! Pessoa usuária logada com sucesso!`, emailUser})

    }catch {
        res.status(500).json({message: 'Erro ao fazer login.'})
    }
})

export default router