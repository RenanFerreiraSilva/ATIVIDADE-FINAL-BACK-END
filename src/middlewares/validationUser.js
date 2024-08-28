export function validationNameEmailPassword(req, res, next) {
    const {name, email, password} = req.body

    if (!name) {
         return res.status(400).json({message: 'Por favor, verifique se passou o nome.'})
    }

    if (!email) {
         return res.status(400).json({message: 'Por favor, verifique se passou o email.'})
    }

    if (!password) {
         return res.status(400).json({message: 'Por favor, verifique se passou a senha.'})
    }
    
    next()
}

export function validationEmailPassword(req, res, next) {
    const {email, password} = req.body;

    if (!email) {
         return res.status(400).json({message: 'Insira um e-mail válido.'})
    }

    if (!password) {
         return res.status(400).json({message: 'Insira uma senha válida.'})
    }

    next()
}