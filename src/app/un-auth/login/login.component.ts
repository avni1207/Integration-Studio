import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { ZdocConfigService } from '../../auth/zdoc-configuration/zdoc-config/zdoc-config.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  IsShowloader = false;
  constructor( private router : Router, private zdocConfigservice : ZdocConfigService ) { }

  ngOnInit() {
    this.zdocConfigservice.isLoginInValid = null;
    this.zdocConfigservice.logout();
    
  }
  login(value){
    this.zdocConfigservice.checkUserRole(value);
    //  if(value.username=='admin' && value.password=='admin'){
    //   this.IsShowloader = true;
    //   setTimeout(() => {this.router.navigate(['/auth/dashboard/integration-studio'])} , 3000)
    // }

  }

}
