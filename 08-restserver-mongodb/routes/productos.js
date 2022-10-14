const { Router } = require('express');
const { check } = require('express-validator');

const {
    actualizarProducto,
    borrarProducto,
    crearProducto,
    obtenerProductos,
    obtenerProducto
} = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, tieneRole, esAdminRole } = require('../middlewares');

const router = Router();


router.get('/', obtenerProductos);

router.get('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProducto);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'El ID de la categoria no es un ID valido').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
], crearProducto);

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'No es un ID de mongo valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    validarCampos,
], actualizarProducto);

router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID de mongo válido').isMongoId(),
    validarCampos
], borrarProducto)

module.exports = router;