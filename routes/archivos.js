const express = require('express')
const router = express.Router()
const archivosController = require('../controllers/archivosController')
const auth = require('../middleware/auth')

router.post('/',
    auth,
    archivosController.nuevoArchivo
)
module.exports = router