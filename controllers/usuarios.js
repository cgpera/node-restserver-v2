const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const query = req.query;

    res.json(
        {
            msg: "get API - Controlador",
            query
        })
}

const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json(
        {
            msg: "put API - Controlador",
            id
        })
}

const usuariosPost = (req, res) => {
    const { nombre, edad } = req.body;
    res.status(201).json(
        {
            msg: "post API - Controlador",
            nombre,
            edad
        })
}

const usuariosDelete = (req, res = response) => {
    res.json(
        {
            msg: "delete API - Controlador"
        })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}