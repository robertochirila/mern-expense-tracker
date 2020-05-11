const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usersSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},
    {
        timestamps: true

    })

const Users = mongoose.model('Users', usersSchema)
module.exports = Users