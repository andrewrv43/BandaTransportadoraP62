const mongoose=require('mongoose');
const {Schema}=mongoose;
const usuario=new Schema({
    username:{type:String, required: true},
    correo:{type:String, required:true},
    contraseña:{type:String, required:true},
    cargo:{type:String, required:true}
   },{timestamps:true})
module.exports=mongoose.model('usuario',usuario);