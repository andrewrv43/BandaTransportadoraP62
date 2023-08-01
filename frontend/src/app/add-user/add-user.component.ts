import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm!: FormGroup;
  submitted = false;
  tipoInvalid = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private rutas: Router,
    private userService: UsersService
  ) { }

  n: boolean = false;
  a: boolean = false;

  ngOnInit() {
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
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', Validators.required],
      cargo: ['Escoger el Cargo', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.valid && !this.tipoInvalid) {
      const formData = this.userForm.value;
      console.log(formData);
      this.subido(formData);
      this.rutas.navigateByUrl('/verUsuarios');
      alert('Agregado con exito');
    }else{
      alert('ERROR!');
    }
  }

  validateTipo() {
    const tipoControl = this.userForm.get('cargo');
    if (tipoControl?.value === 'Escoger el Tipo') {
      this.tipoInvalid = true;
    } else {
      this.tipoInvalid = false;
      tipoControl?.markAsTouched();
    }
  }

  subido(formData: any) {
    this.userService.crear(formData).subscribe(
      (response) => {
        console.log('Respuesta del servidor:', response);
        
      },
      (error) => {
        console.error('Error en la solicitud POST:', error);
      }
    );
  }
}