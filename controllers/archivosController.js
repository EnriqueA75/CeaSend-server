//subida de archivos 
const multer = require('multer')
const nanoid = require('nanoid')
const fs = require('fs')

exports.nuevoArchivo = async (req, res, next) => {

    const configMulter = {
        limits: { fileSize : req.usuario ? 1024 * 1024 * 10 : 1000000 },    
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length)
                cb(null, `${nanoid()}${extension}`)
            }
        })
    }
    const upload = multer(configMulter).single('Archivo')

    upload(req, res, async (error) => {
        console.log(req.file)
        if(!error){
            res.json({archivo: req.file.filename})
        } else {
            console.log(error)
            return next()
        }
    })
}

exports.eliminarArchivo = async (req, res) => {
    console.log(req.archivo)
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`)
        console.log('archivo eliminado')
    } catch (error) {
        console.log('no se pudo eliminar el archivo', error)
    }
}