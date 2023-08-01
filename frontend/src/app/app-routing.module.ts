import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';
import { VertodoComponent } from './vertodo/vertodo.component';


const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'Login',component:LoginComponent},
  {path:'Dashboards',component:DashboardComponent},
  {path:'Crear',component:AddUserComponent},
  {path:'verUsuarios',component:VertodoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
