const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())

const uri = process.env.ATLAS_URI
console.log(uri)
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to MongoDB established");
})

app.use(express.json())





app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
