const express = require ('express')
const router = express.Router()
const Partida = require('../models/partida')

//Usuarios con mayor victoria
router.get('/victorias', async (req, res) => {
    try{
        let docs = await Partida.aggregate([
            {
              $group: {
                _id: '$ganador',
                count: { $sum: 1 }
              }
            }
          ]);
          let resultado = docs.sort((a, b) => Number(b.count) - Number(a.count));
          let result = resultado.filter( obj => obj._id !== "empate");
          res.json(result.slice(0, 5));
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

function getMenorCantidad(partidas){
    let resultado = -1;
    partidas.forEach(function (item) {
        if (resultado == -1){
            resultado = item.movimientosRealizados
        }else if(item.movimientosRealizados < resultado){
            resultado = item.movimientosRealizados
        }
    });
    return resultado;
}

function isIn(lista, name){
    let value = false;
    lista.forEach(function (item) {
        if (item.ganador == name){
            value = true;
        }
    });
    return value;
}

//Ganador con la menor cantidad de jugadas
router.get('/cantidadJugadas', async (req, res) => {
    try{
        let resultado = [];
        let partidas = await Partida.find();
        partidas = partidas.sort((a, b) => Number(a.movimientosRealizados) - Number(b.movimientosRealizados));
        let cantidad = getMenorCantidad(partidas);
        partidas.forEach(function (item) {
            if (item.movimientosRealizados == cantidad ){
                let cond = isIn(resultado, item.ganador);
                if (cond === false){
                    resultado.push(item);
                }
                
            }
        });
        res.json(resultado);
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//empates
router.get('/empates', async (req, res) => {
    try{
        const partida = await Partida.find({ganador: "empate"})
        res.json(partida)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Obtener todos
router.get('/', async (req, res) => {
    try{
        const partida = await Partida.find()
        res.json(partida)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

//Obtener Uno
router.get('/:id', getPartida, (req, res) => {
    res.json(res.partida)
})

//Crear
router.post('/', async(req, res) => {
    const partida = new Partida ({
        jugador1: req.body.jugador1,
        jugador2: req.body.jugador2,
        fecha: req.body.fecha,
        hora: req.body.hora,
        ganador: req.body.ganador,
        duracion: req.body.duracion,
        movimientosRealizados:req.body.movimientosRealizados
    })
    try{
        const newOne = await partida.save()
        res.status(201).json(newOne)
    }
    catch (err){
        res.status(400).json({message:err.message})
    }
})

//Eliminar
router.delete('/:id', getPartida , async(req, res) => {
    try{
        await res.partida.remove()
        res.json({message:"eliminado"})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

//Actualizar
router.patch('/:id', getPartida, async (req, res) => {
    res.partida.ganador = req.body.ganador,
    res.partida.duracion = req.body.duracion,
    res.partida.movimientosRealizados = req.body.movimientosRealizados
    try{
        const updatePartida = await res.partida.save()
        res.json(updatePartida)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})



async function getPartida(req, res, next){
    let partida
    try{
        partida = await Partida.findById(req.params.id)
        if(partida == null){
            return res.status(404).json({message: 'No se encontró la partida'})
        }
    } catch(err){
        return res.status(500).json({message: err.message })
    }
    res.partida = partida
    next()
}

module.exports = router