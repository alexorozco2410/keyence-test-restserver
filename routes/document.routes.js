const { Router } = require('express')
const { check } = require('express-validator')

const { validateJWT } = require('../middlewares/validate-jwt')
const { validarCampos } = require('../middlewares/validar-campos')

const documentController = require('../controllers/document.controller')

const router = Router()



router.get('/',[
    validateJWT,
], documentController.getDocuments)

router.get('/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( checkTeamById ),
    validarCampos
], documentController.getDocumentById)




router.post('/',[
    validateJWT,
    validarCampos
], documentController.createDocument)

router.put('/del-data/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( checkTeamById ),
    validarCampos
], documentController.deleteOneData)

router.put('/update-oneData/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( checkTeamById ),
    validarCampos
], documentController.updateOneData)

router.put('/add-data/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    // check('id').custom( checkTeamById ),
    validarCampos
], documentController.updateAddData)

router.delete('/:id',[
    validateJWT,
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], documentController.deleteDocument)


module.exports = router