
 const mongoose = require('mongoose')
 const Schema = mongoose.Schema

 const usuariosSchema = new Schema({
    usu_email:{type:String,Trim:true,unique:true,lowercase:true},
    usu_clave:{type:String,require:true,Trim:true},
    usu_nombres:{type:String,require:true,Trim:true},
    usu_apellidos:{type:String,require:true,Trim:true},
    per_id:{type:String}
})

//usuariosSchema.methods.encrypClave = async usu_clave =>{
//   const solt = await bcryp.genSalt(20);
//   return await bcryp.hash(usu_clave,solt)
//}

//usuariosSchema.methods.matchPassword = async function(usu_clave) {
//   return await bcryp.compare(usu_clave,this.usu_clave)
//} 



module.exports = mongoose.model('usuarios',usuariosSchema)


