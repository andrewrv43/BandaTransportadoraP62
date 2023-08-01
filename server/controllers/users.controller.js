const User=require('../models/usuarios');
const usersController={};
usersController.getUsers=async(req,res)=>
{
    try {
        const usuarios = await User.find();
        res.send(usuarios);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
      }
}

usersController.addUser=async(req,res)=>{
  try {
    const{username,correo,contraseña,cargo}=req.body;
    const newUser= new User({
    username:username,
    correo:correo,
    contraseña:contraseña,
    cargo:cargo
    });
  await newUser.save();
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al agregar el usuario');
  }

}

usersController.getUserByEmailAndPassword = async (req, res) => {
  const { correo, contraseña } = req.body;
  try {
      const user = await User.findOne({ correo, contraseña });
      if (!user) {
          return res.status(404).json({ message: 'Usuario no existe' });
      }
      res.json(user);
  } catch (error) {
      res.status(500).json({ message: 'Error' });
  }
}
usersController.editUser=async(req,res)=>{
  try {
const{correo,username, contraseña,cargo}=req.body;
const usuario = await User.findOne({correo:correo});
if (!usuario) {
  console.log(correo);
  return res.status(404).json({ message: 'Usuario no encontrado' });
  
}
usuario.contraseña=contraseña;
usuario.username=username;
usuario.cargo=cargo;

await usuario.save();

}
catch (error) {
  console.error(error);
  res.status(500).send('Error al editar el usuario');
}
};
usersController.eliminarUser=async(req,res)=>{
  try {
    const{correo}=req.body;
    const del=await User.findOneAndDelete({correo:correo});
    if (!del) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar el usuario');
  }
}






module.exports=usersController;