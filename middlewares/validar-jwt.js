const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }
    try {
        const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY, {});

        const { uid } = payload;
        const usuario = await Usuario.findById(uid);
        if(!usuario) {
            res.status(401).json({
                msg: 'Token inválido - usuario no existe en DB'
            })
        }
        if(!usuario.estado) {
            res.status(401).json({
                msg: 'Token inválido - usuario deshabilitado'
            })
        } 

        req.usuario = usuario;
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token inválido',
        })
    }
    next();
}


module.exports = {
    validarJWT
}