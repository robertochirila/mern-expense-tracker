const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config/default.json')

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
const usersRouter = require('./routes/users')
const authRouter = require('./routes/auth')


app.use('/expenses', expensesRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)






app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
