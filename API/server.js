require('dotenv').config()
const cors = require('cors');
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./config');

mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log("Connected to Database"))

app.use(express.json())

app.use(cors(
    config.application.cors.server
  ));

const partidaRouter = require('./routes/partida')
app.use('/partidas', partidaRouter)

const host = '0.0.0.0';
const port = 8080;

app.listen(port, host, () => console.log('Server Started'))