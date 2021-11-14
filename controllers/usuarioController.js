const Usuario = require('../models/Usuario')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

//llamamos los modelos para poder trabajar respecto a ellos en la bd
exports.nuevoUsuario = async (req, res) => {
    //mostrar mensajes de error de express validator definidoas en el routing
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    console.log(req.body)
    //verificar si el usuario ya existe
    const { email, password }= req.body
    let usuario = await Usuario.findOne({email})

    if(usuario){
        //si el usuario ya existe retorna un error
        return res.status(400).json({msg: 'el usuario ya existe'})
    } else {
        usuario = new Usuario(req.body)
        //hashea el password y crea el usuario
        const salt = await bcrypt.genSalt(10)
        usuario.password = await bcrypt.hash(password, salt)
    }
    try {
        await usuario.save()
        res.json({msg:"Usuario creado correctamente"})
    } catch (error) {
        console.log('error al guardar usuario', error)
    }
}