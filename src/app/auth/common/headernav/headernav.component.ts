import { Component, OnInit } from '@angular/core';
import { IntegrationStudioService } from '../../integration-studio/integration-studio.service';
import { ZdocConfigService } from '../../zdoc-configuration/zdoc-config/zdoc-config.service';

@Component({
  selector: 'app-headernav',
  templateUrl: './headernav.component.html',
  styleUrls: ['./headernav.component.scss']
})
export class HeadernavComponent{

  constructor( private intStudioService : IntegrationStudioService, private zdocConfigservice : ZdocConfigService ) { }
  env : any;
  ngOnInit() {
     this.intStudioService.getenv();
   }
  logout(){
    this.zdocConfigservice.logout();
  }

}
