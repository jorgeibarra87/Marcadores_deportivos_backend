const mongoose = require('mongoose')

const Schema = mongoose.Schema

const marcadoresSchema = new Schema({
   mar_fechaEvento:{type:Date,Trim:true},
   mar_horaEvento:{type:String},
   mar_fechaRegistro:{type:Date},
   mar_horaRegistro:{type:String},
   equi_id:{type:mongoose.Types.ObjectId,Trim:true},
   equi_id2:{type:mongoose.Types.ObjectId,Trim:true},
   mar_marcadoresqui1:{type:String,Trim:true},
   mar_marcadoresqui2:{type:String,Trim:true},
   dep_id:{type:mongoose.Types.ObjectId,Trim:true},
   usu_id:{type:mongoose.Types.ObjectId,Trim:true}
})

module.exports = mongoose.model('marcadores',marcadoresSchema)
