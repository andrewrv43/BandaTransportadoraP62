const{Router} = require('express');
const router=Router();
const user=require('../controllers/users.controller');
const dato=require('../controllers/datos.controller');
//usuarios
router.get('/obt',user.getUsers);
router.post('/registro', user.addUser);
router.post('/log',user.getUserByEmailAndPassword);
router.put('/actualizar',user.editUser);
router.delete('/del',user.eliminarUser);
 //datos
 router.get('/imp',dato.getDatos);
router.post('/quemado', dato.addDatos);    
 router.get('/dash',dato.getImp);
 router.get('/theFecha',dato.getDates);
module.exports=router;