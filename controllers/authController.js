const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})

const { validationResult } = require('express-validator')

exports.autenticarUsuario = async (req, res, next) => {
    // revisar errores
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }
    //ver si el usuario ya existe
    const { email, password } = req.body
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        return res.status(401).json({msg: 'Usuario no registrado'})
    }
    //si el usuario existe
    if(bcrypt.compareSync(password, usuario.password)){
        //crear el jwt
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        })
        res.json({token})
    } else {
        res.status(401).json({msg: 'Password incorrecta'})
        return next()
    }
    //verificar la contrasenia y autenticar
}
exports.usuarioAutenticado = async (req, res, next) => {
    res.json({usuario: req.usuario})
}