require('dotenv').config()

// REST
const express = require('express')
const app = express()
var port = 8888
app.listen(port, () => console.log("app running at localhost:" + port))

// Database
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

//routes
app.use(express.json())
const messagesRouter = require('./routes/message')
app.use('/messages', messagesRouter)