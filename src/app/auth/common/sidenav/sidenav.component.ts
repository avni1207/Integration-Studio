import { Component, OnInit } from '@angular/core';
import { ZdocConfigService } from '../../zdoc-configuration/zdoc-config/zdoc-config.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  constructor(private zdocConfigservice : ZdocConfigService){}

  isVisible : boolean = false;
  isAdmin : boolean = false;

  ngOnInit() {
    if(localStorage.getItem("user") == 'admin'){
      this.isAdmin = true;
    }
   // alert("hiii"+this.zdocConfigservice.loginRole)
  }
  
  toggleSidebar(){
    this.isVisible = !this.isVisible;
  }

}
