const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("Connection to MongoDB established");
})

app.use(express.json())


const expensesRouter = require('./routes/expenses')

app.use('/expenses', expensesRouter)





app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
