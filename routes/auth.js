const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post('/',
    [
        check('email', 'Email no valido').isEmail(),
        check('password', 'la contrasenia no puede ir vacía').not().isEmpty()
    ],
    authController.autenticarUsuario
)

router.get('/',
    auth,
    authController.usuarioAutenticado
)

module.exports = router