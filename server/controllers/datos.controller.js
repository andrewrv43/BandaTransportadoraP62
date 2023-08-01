const datos=require('../models/datos');
const datosController={};
datosController.getDatos=async(req,res)=>
{

        const data = await datos.find();
        res.send(data);

}

datosController.addDatos=async(req,res)=>{

      const{color}=req.body;
    const newDato= new datos({
      color:color
      });
    await newDato.save();
  
  }

  datosController.getImp=async(req,res)=>{

    const data = await datos.find().select('color -_id');
    res.send(data);

}  
datosController.getDates=async(req,res)=>{

  const data = await datos.find().select('color createdAt -_id');
  res.send(data);

}  

module.exports=datosController;