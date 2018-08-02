import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../alertmsg/alert-service';
import { ApiDataService } from '../api-data/api-data.service';
import { ApiConfigService } from '../api-configuration/api-config/api-config.service';
import { ZdocConfigService } from '../zdoc-configuration/zdoc-config/zdoc-config.service';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-api-configuration',
  templateUrl: './api-configuration.component.html',
  styleUrls: ['./api-configuration.component.scss']
})
@Pipe({
  name: 'filter'
}) 
export class ApiConfigurationComponent implements OnInit {
  public count:any = 10;
  constructor(private apiConfigservice : ApiConfigService, private alertService: AlertService, private router: Router, private apiData: ApiDataService, private zdocConfigservice : ZdocConfigService) { }

  /***Search bar ***/
  transform(items: any[], searchText: string): any[] {
    if(!items) return [];
    if(!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter( it => {
      return it.toLowerCase().includes(searchText);
    });
 }

  ngOnInit() {
    this.zdocConfigservice.checkIsuser();
    this.apiConfigservice.filterproducts();
    this.apiConfigservice.getAllapis();
  }
  createApiForm(){
    this.apiConfigservice.editApiData = [];
    this.apiData.data =  {
      "id" : "",
      "url": "",
      "prefixurl": "endpoint/",
      "suffixurl": "",
      "methodType": "",
      "source": "",
      "switchUrl": "",
      "batchSize": "1",
      "parameterJson": "",
      "requestEntity": "",
      "requestAction": "",
      "responseEntity": "",
      "responseAction": ""
    };
    this.router.navigate(['/auth/api-configuration/api-subscription']);
  }
  sendProduct(value){
    this.apiConfigservice.searchForProduct(value);
  }
  getEditDetails(api){
    this.apiConfigservice.editApi(api);
  }
  sendCount(val){
    this.count = val;
  }

}
