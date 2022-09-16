const { response } = require('express');

const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el mail existe y no está borrado (estado: falso)
        const usuario = await Usuario.findOne({ correo });
        if (!usuario || !usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario inexistente'
            })
        }

        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password)

        if (!validPassword) {
            return res.status(403).json({
                msg: 'Datos incorrectos'
            })
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        const uid = usuario._id;

        res.json({
            usuario,
            uid,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }


}

module.exports = {
    login
}