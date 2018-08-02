import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'unauth',
    loadChildren: './un-auth/un-auth.module#UnAuthModule'
  },
 
   {
    path: '**',
    redirectTo: 'unauth/login'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true
  })],
  exports: [RouterModule],
  declarations: [],
})
export class AppRoutingModule { }
