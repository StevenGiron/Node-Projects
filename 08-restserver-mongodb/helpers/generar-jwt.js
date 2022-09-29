const jwt = require('jsonwebtoken');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid }; //Escribo lo que quiero guardar en el payload

        //Generar JWT
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h' //Tiempo de expiracion del token
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se pudo generar le JWT');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = {
    generarJWT
};