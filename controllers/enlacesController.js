const Enlaces = require('../models/Enlace')
const nanoid = require('nanoid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.nuevoEnlace = async (req, res, next) => {
    //traemos los errores del routing en caso de haberlos    
    const errores = validationResult(req)
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()})
    }

    const { nombre_original, password, nombre } = req.body
    //crea el objeto enlace
    const enlace = new Enlaces()
    enlace.url = nanoid()
    enlace.nombre = nombre
    enlace.nombre_original = nombre_original
    //si el usuario está autenticado
    if(req.usuario){
        const { password, descargas } = req.body        
        //asignamos al enlace el numero de descargas
        if(descargas){
            enlace.descargas = descargas
        }
        if(password){         
            const salt = await bcrypt.genSalt(10)  
            enlace.password = await bcrypt.hash(password, salt)
        }
        //asignar el autor
        enlace.autor = req.usuario.id
    }
    try {
        await enlace.save()
        return res.json({msg: `${enlace.url}`})
        next()
    } catch (error) {
        console.log('error al crear enlace', error)
    }
}

exports.obtenerEnlace = async (req, res, next) => {       
    const { url } = req.params
    //verificar si existe el enlace
    const enlace = await Enlaces.findOne({ url })

    if(!enlace){
        res.status(404).json({msg: 'Enlace no encontrado'})
        return next()
    }
    res.json({archivo: enlace.nombre})
    
    //numero de descargas, eliminar o restar al archivo
    const { descargas, nombre } = enlace
    if(descargas === 1){
        //pasamos al otro controlador de archivosController a realizar la eliminación
        req.archivo = nombre;
        //eliminar la entrada de la bd
        await Enlaces.findOneAndRemove(req.params.url)
        next()
    } else {
        enlace.descargas--;
        await enlace.save()
        console.log('aún hay descargas')
    }
}