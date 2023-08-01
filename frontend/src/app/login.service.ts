import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import {modeloLogin} from './modeloLogin'
import { modeloUsuario } from './modeloUsuario';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  ref='http://localhost:3000'
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData:BehaviorSubject<modeloLogin>=new BehaviorSubject<modeloLogin>({correo:'',contraseña:''});
  cargo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  

  login(credentials: modeloLogin): Observable<any> {
    return this.http.post<any>(`${this.ref}/log`, credentials).pipe(
      tap((userData: modeloUsuario) => {
        console.log(userData);
        if(userData.cargo==="ADMINISTRADOR"){
          this.cargo.next(true);
        }
        this.currentUserLoginOn.next(true);
        this.currentUserData.next(userData);
      }),
      
    )
  }
  logout(){
        this.currentUserLoginOn.next(false);
        this.cargo.next(false);
        this.currentUserData.next({correo: '', contraseña: ''});
  }
  todos(){
    return this.http.get('http://localhost:3000/obt');
  }

}
