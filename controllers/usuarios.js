const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { existeEmail } = require('../helpers/db-validators');
const usuario = require('../models/usuario');

const usuariosGet = async(req = request, res = response) => {

    const { desde = 0, limite = 5 } = req.query;

    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //                         .skip(desde)
    //                         .limit(limite);

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                    .skip(desde)
                    .limit(limite)
    ])
    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    // TODO: validar id contra base de datos

    if (password) {
        // Encriptar la password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(
        {
            msg: "put API - Controlador",
            usuario
        })
}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.status(201).json(
        {
            usuario
        })
}

const usuariosDelete = async(req, res = response) => {
    const { id } = req.params;

    // Eliminación física
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});


    res.json(usuario);
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}