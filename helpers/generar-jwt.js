const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if (err) {
                reject('El token de seguridad no se pudo generar');
            } else {
                resolve(token);
            }
        })
    })

}


module.exports = {
    generarJWT
}