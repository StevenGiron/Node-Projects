const validaCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');
const validaRoles = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos, //... para exportar todo lo que contenga el archivo
    ...validarJWT,
    ...validaRoles,
};