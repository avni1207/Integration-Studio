import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';



const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) , FormsModule ,CommonModule, AuthModule],
  exports: [RouterModule],
  declarations: [LoginComponent, NotFoundComponent],

})
export class UnAuthRoutingModule { }
