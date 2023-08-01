import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms'; 
import { LoginService } from '../login.service';
import { modeloLogin } from '../modeloLogin';
import { Router, Routes } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private loginService:LoginService, private rutas:Router) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      this.login();


    }
  }
  login() {

    if (this.loginForm.valid) {

      this.loginService.login(this.loginForm.value as modeloLogin).subscribe({
        next: (userData) => {
          this.rutas.navigateByUrl('/Home');
        },
        error: (errorData) => {
          console.error(errorData);
          alert("DATOS ERRONEOS");
        },
        complete: () => {
          console.info("Inicio Exitoso");
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar datos");
    }
  }

}
