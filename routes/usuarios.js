const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete } = require('../controllers/usuarios');

const { esRoleValido, existeEmail, existeUsuarioPorId } = require('../helpers/db-validators');

// const { validarCampos } = require('../middlewares/validar-campos');
// const { validarJWT } = require('../middlewares/validar-jwt');
// const { esAdminRole, tieneRole } = require('../middlewares/validar-roles');
const { 
        validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
 } = require('../middlewares');


const router = Router();

// routes
router.get('/', usuariosGet);

router.put('/:id', [
        check('id', 'ID no es válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPut);

router.post('/', [
        check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
        check('password', 'La contraseña es obligatoria entre 6 y 32.').isLength({ min: 6, max: 32 }),
        check('correo', 'El correo no es un correo válido...').isEmail(),
        check('correo').custom(existeEmail),
        // check('rol', 'El rol no es válido...').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        // check('rol').custom(rol => esRoleValido(rol)),
        check('rol').custom(esRoleValido),
        validarCampos
], usuariosPost);

router.delete('/:id', [
        validarJWT,
        esAdminRole,
        tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
        check('id', 'ID no es válido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos

], usuariosDelete);


module.exports = router;