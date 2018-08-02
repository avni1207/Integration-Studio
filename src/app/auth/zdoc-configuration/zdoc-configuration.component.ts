import { Component, OnInit, EventEmitter} from '@angular/core';
import { ZdocDataService } from '../zdoc-data/zdoc-data.service';
import { AlertService } from '../alertmsg/alert-service';
import { Router } from '@angular/router';
import { ZdocConfigService } from '../zdoc-configuration/zdoc-config/zdoc-config.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-zdoc-configuration',
  templateUrl: './zdoc-configuration.component.html',
  styleUrls: ['./zdoc-configuration.component.scss']
})

@Pipe({
  name: 'filter'
})
export class ZdocConfigurationComponent implements OnInit {
  product:string = '';
  constructor(private alertService: AlertService, private zdocConfigservice : ZdocConfigService, private zdocData : ZdocDataService, private router : Router) { }
  model = {
    product: '',
    direction: '',
    action: '',
  }
  public count:any = 10;
  public isTrue:boolean = false;
 
  /***Search bar ***/
  transform(items: any[], searchText: string): any[] {
     console.log("test");
      if(!items) return [] ;
      if(!searchText) return  items;
       this.isTrue = false;
      searchText = searchText.toLowerCase();
      
      return items.filter( it => {
        return it.toLowerCase().includes(searchText);
      });
   }
  ngOnInit() {
    this.zdocConfigservice.checkIsuser();
    this.zdocConfigservice.getAllZdocs();
    this.zdocConfigservice.getzdocProducts();
    this.zdocConfigservice.getListzdocActions();
  }
  
  createZdocForm(){
    this.zdocConfigservice.editZdocResponse = [];
    this.zdocData.xsdfilename = "No file chosen";
    this.zdocData.xsdapifilename = "No file chosen";
    this.zdocData.jsonfilename = "No file chosen";
    
    this.zdocData.data =  {
      "id": "",
      "product": "",
      "entity": "",
      "action": "",
      "zDocBaseVersion": "",
      "zDocCustomVersion": "0",
      "directionFlag":"",
      "engine":"",
      "mapping":"",
      "xsd":"",
      "xsdFile":""
    };
    this.zdocConfigservice.validvar = '';
    this.router.navigate(['/auth/zdoc-configuration/zdoc-subscription']);
  }

  onSort(data){
    this.zdocConfigservice.allZdocs = [];
    this.zdocConfigservice.getFilteredZdoc(data);
  }

  onClear(){
   // location.reload();
    this.model.product = '';
    this.model.direction = '';
    this.model.action = '';
    this.zdocConfigservice.filteredZdocs = [];
    this.zdocConfigservice.getAllZdocs();
    
  }
  getZdocDetails(zdoc){
    this.zdocConfigservice.getEditZdocDetails(zdoc);
  }
  sendCount(val){
    this.count = val;
  }

}
