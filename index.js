//primero se crea el servidor con express y mongoose
//despues se crea la base de datos y su respectiva conexión en mongo
const express = require('express')
const conectarDB = require('./config/db')
const cors = require('cors')
//crear el server
const app = express()

console.log('iniciando ceasend')
//conectamos a la base de datos desde config/db
conectarDB()
//habilitar cors para conectarse desde frontend
const opcionesCors = {
    origin: process.env.FRONTEND_URL
}
app.use( cors(opcionesCors) )

//puerto del app
const port = process.env.PORT || 4000; 

//habilitamos el poder leer los valores de un body 
app.use( express.json() )

//rutas del app
app.use('/api/usuarios', require('./routes/usuario'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/enlaces', require('./routes/enlaces'))
app.use('/api/archivos', require('./routes/archivos'))

app.listen(port, '0.0.0.0', () => {
    console.log('servidor funcionando', port)
})