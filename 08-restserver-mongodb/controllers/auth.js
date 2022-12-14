const { response, request } = require("express");
const bcryptjs = require('bcryptjs');

const { Usuario } = require("../models");
const { generarJWT } = require("../helpers/generar-JWT");
const { googleVerify } = require("../helpers/google-verify");


const login = async(req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - correo"
            });
        }

        // Verificar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - estado: false"
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario / Password no son correctos - password"
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Algo salió mal"
        });
    }
};

const googleSingIn = async(req = request, res = response) => {
    const { id_token } = req.body;

    try {
        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            //Tegno que crearlo
            const data = {
                nombre,
                correo,
                password: 'hola',
                img,
                rol: 'VENTAS_ROLE',
                google: true
            };
            usuario = new Usuario(data);
            await usuario.save();
        }

        // Si el usuario en DB tiene estado false
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'El token no se pudo verificar'
        });

    }

};

module.exports = {
    login,
    googleSingIn
};