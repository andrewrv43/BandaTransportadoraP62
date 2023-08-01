const mongoose=require('mongoose');
const {Schema}=mongoose;
const datos=new Schema({
    color:{type:String, required:true}
   },{timestamps: true} )
module.exports=mongoose.model('datos',datos);