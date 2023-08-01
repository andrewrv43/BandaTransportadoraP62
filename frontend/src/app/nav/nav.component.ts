import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  constructor(private loginService: LoginService, private rutas: Router) {}
  in: boolean = false;
  admin:boolean=false;

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (inStatus) => {
        this.in = inStatus;
      }
    });
    this.loginService.cargo.subscribe({
      next: (inStatus) => {
        this.admin = inStatus;
      }
    });
  }
  onclick(){
    this.loginService.logout();
    this.rutas.navigateByUrl('/Home');
  }
}
