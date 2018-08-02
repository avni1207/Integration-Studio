import { Component, OnInit} from '@angular/core';
import { ZdocConfigService } from './zdoc-configuration/zdoc-config/zdoc-config.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],

})
export class LayoutComponent implements OnInit {


  constructor(private zdocConfigservice : ZdocConfigService ) { }

  ngOnInit() {
    this.zdocConfigservice.checkCredentials();
    //alert("Hello");
  }
  onNotify(message:string):void {
   alert(message);
 }

}
