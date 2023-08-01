import { Component, OnInit } from '@angular/core';
import { modeloUsuario } from '../modeloUsuario';
import { UsersService } from '../users.service';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-vertodo',
  templateUrl: './vertodo.component.html',
  styleUrls: ['./vertodo.component.css']
})
export class VertodoComponent implements OnInit{
  showForm = false; 
  userForm!: FormGroup;
  cr:string='';
  secure=false;

  usuarios:modeloUsuario[]=[];
constructor (private formBuilder: FormBuilder,private userservice:UsersService,private loginService:LoginService, private rutas:Router){
  this.userservice.obtenerDatos().subscribe(data=>{
    this.usuarios=data;
  })
}
n: boolean = false;
  a: boolean = false;
  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe(b => {
      this.n = b;
    });
    this.loginService.cargo.subscribe(b => {
      this.a = b;
    });

    if (!this.a && !this.n) {
      this.rutas.navigateByUrl('/Login');
      alert("ANTES DE CONTINUAR DEBE INICIAR SESION");
    }
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      contraseña: ['', Validators.required],
      cargo: [''],
    });
  }
 
editarUsuario(correo: string) {
  
  // const nuevosDatos = {
  //   username: 'JustSlash',
  //   contraseña: '123456',
  //   cargo:'ADMINISTRADOR',
  //   correo:correo    
  // };

 
  // this.userservice.editarUsuario(correo, nuevosDatos).subscribe(
  //   (usuarioActualizado) => {
  //     console.log('Usuario actualizado:', usuarioActualizado);

  //   },
  //   (error) => {
  
  //     console.error('Error al editar el usuario:', error);
 
  //   }
  // );
  this.cr=correo;
  this.showForm = true;
}

onSubmit() {
 // const nuevosDatos = this.userForm.value;
   const nuevosDatos = {
     username: this.userForm.get('username')?.value,
     contraseña: this.userForm.get('contraseña')?.value,
     cargo:this.userForm.get('cargo')?.value,
     correo:this.cr    
   };
  this.userservice.editarUsuario(this.cr, nuevosDatos).subscribe(
    (usuarioActualizado) => {
      console.log('Usuario actualizado:', usuarioActualizado);
      alert("USUARIO ACTUALIZADO");
      this.rutas.navigateByUrl('/Home');
      this.rutas.navigateByUrl('/verUsuarios');
    },
    (error) => {
      
      console.error('Error al editar el usuario:', error);

    }
  );
  this.showForm = false;
}
no(){
  this.secure=false;
}
asegurar(){
this.secure=true;
}
eliminarUsuario() {
  this.userservice.eliminarUsuario(this.cr).subscribe(
    () => {
      console.log('Usuario eliminado exitosamente');
      alert("USUARIO ELIMINADO");
      this.rutas.navigateByUrl('/Home');
    },
    (error) => {
      console.error('Error al eliminar el usuario:', error);
    }
  );
  this.showForm = false;
}

}
