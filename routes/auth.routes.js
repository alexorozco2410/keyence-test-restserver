const { Router } = require('express')
const { check } = require('express-validator')

const authController = require('../controllers/auth.controller')
const { validarCampos } = require('../middlewares/validar-campos')
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router()

router.get('/',[
    validateJWT,
    validarCampos
], authController.renewToken)

router.post('/login',[
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], authController.login)

module.exports = router