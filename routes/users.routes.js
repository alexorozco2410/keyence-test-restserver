const {Router} = require('express')
const { check } = require('express-validator')

const { checkEmailExist, checkUserById } = require('../helpers/db-validators')
const { validarCampos } = require('../middlewares/validar-campos')
const { validateJWT } = require('../middlewares/validate-jwt')

const usersController = require('../controllers/users.controller')

const router = Router()

router.get('/', usersController.getUsers)

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( checkUserById ),
    validarCampos
], usersController.putUsers)

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener mas de 5 caracteres').isLength({ min: 6 }),
    check('email', 'El correo no es valido').isEmail(),
    check('email').custom( checkEmailExist ),
    validarCampos
], usersController.postUsers)

router.delete('/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( checkUserById ),
    validarCampos
], usersController.delUsers)


module.exports = router