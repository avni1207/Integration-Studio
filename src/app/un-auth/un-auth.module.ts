import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnAuthRoutingModule } from './un-auth-routing.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    UnAuthRoutingModule,
    FormsModule
  ],
  declarations: []
})
export class UnAuthModule { }
