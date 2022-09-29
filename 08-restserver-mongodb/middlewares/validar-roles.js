const { request, response } = require("express");
const role = require("../models/role");


const esAdminRole = (req = request, res = response, next) => {

    //validar que la req contenga un usuario
    if (!req.usuario) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar primero el token'
        });
    }

    //Ya se ha validado el JWT por lo que en la request ya esta la info del usuario
    const { rol, nombre } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        });
    }

    next();
};

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar primero el token'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`
            });
        }


        next();
    };
};

module.exports = {
    esAdminRole,
    tieneRole
};