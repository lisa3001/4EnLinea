const mongoose = require('mongoose')

const partidaSchema = new mongoose.Schema({
    jugador1: {
        type: String,
        required: true
    },
    jugador2: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    ganador: {
        type: String,
        required: false
    },
    duracion: {
        type: String,
        required: false
    },
    movimientosRealizados: {
        type: Number,
        required: false
    },
},  { collection : 'Partida' })

module.exports = mongoose.model('Partida', partidaSchema)