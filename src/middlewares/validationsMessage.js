export function validationTitleDescription(req, res, next) {
    const {title, description, email} = req.body

    if (!title) {
        return res.status(400).json({message: 'Por favor, verifique se colocou o título da mensagem.'})
    }

    if (!description) {
        return res.status(400).json({message: 'Por favor, verifique se colocou a descrição da mensagem.'})
    }

    next()
}


export function updateValidation(req, res, next) {
    const { title, description } = req.body

    if (!title) {
        return res.status(400).json({message: 'Por favor, coloque um título.'})
    }

    if (!description) {
        return res.status(400).json({message: 'Por favor, coloque uma descrição.'})
    }

    next()
}