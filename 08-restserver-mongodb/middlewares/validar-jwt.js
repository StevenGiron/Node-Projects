const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }
    try {

        //Validar que el JWT sea válido
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            });
        }

        //Verificar si el UID tiene estado en true para poder eliminar otro usuario
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido - Usuario con estado: false'
            });
        }

        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });

    }
};

module.exports = {
    validarJWT
};