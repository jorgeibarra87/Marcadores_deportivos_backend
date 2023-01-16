const mongoose = require('mongoose')

 const Schema = mongoose.Schema

 const permisosSchema = new Schema({
    per_nombre:{type:String,Trim:true,unique:true,lowercase:true},
})

module.exports = mongoose.model('permisos',permisosSchema)
