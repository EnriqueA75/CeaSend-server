//se crea la conexioón a el .env y la base de datos con mongoose y dotenv
//tambien crear el dev y start en packaje.json
const mongoose = require('mongoose')


require('dotenv').config({path: 'variables.env'})

const conectarDB = async () => {
    try {
        await mongoose.connect( process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('BD conectada')
    } catch (error) {
        console.log('Hubo un error', error)
        process.exit(1)
    }
}
module.exports = conectarDB