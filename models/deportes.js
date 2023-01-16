
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const deportesSchema = new Schema({
    dep_nombre:{type:String,Trim:true,unique:true,lowercase:true},
})

module.exports = mongoose.model('deportes',deportesSchema)
