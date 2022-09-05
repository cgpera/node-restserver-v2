const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no existe en la BD`);
    }
}

// Verificar si el correo existe
const existeEmail = async (correo = '') => {

    const correoExiste = await Usuario.findOne({ correo });
    if (correoExiste) {
        throw new Error(`Correo ${ correo } existente`);
    }
}

// Verificar si el usuario existe para ese id
const existeUsuarioPorId = async (id) => {

    const usuarioExiste = await Usuario.findById(id);
    if (!usuarioExiste) {
        throw new Error(`Usuario con id ${ id } inexistente`);
    }
}


module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}