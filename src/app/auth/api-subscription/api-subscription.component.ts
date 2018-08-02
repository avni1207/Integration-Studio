import { Component, OnInit } from '@angular/core';
import { ApiConfigService } from '../api-configuration/api-config/api-config.service';
import { ApiDataService } from '../api-data/api-data.service';
import { Router } from '@angular/router';
import { ZdocConfigService } from '../zdoc-configuration/zdoc-config/zdoc-config.service';

@Component({
  selector: 'app-api-subscription',
  templateUrl: './api-subscription.component.html',
  styleUrls: ['./api-subscription.component.scss']
})
export class ApiSubscriptionComponent implements OnInit {
  switchUrl = "";
  finalUrl = "";
  

  constructor( private apiConfigservice : ApiConfigService, private apiData : ApiDataService, private router : Router,private zdocConfigservice : ZdocConfigService ) { }
  
  ngOnInit() {
     //this.apiData.data.prefixurl = "endpoint/";
    //this.apiConfigservice.validationMsg='';
    this.zdocConfigservice.checkIsuser();
    this.apiConfigservice.getapiProducts();
    if(this.apiConfigservice.editApiData['id']){
      if(this.apiData.data.methodType=="POST"){
        this.apiConfigservice.getRequestActions();
      }
    }
   }
   changeOptioncolor(value){
     value.style.color = "black";
   }

   getMethod(val){
    this.apiData.data.requestAction = "";
     if(val.methodType == "GET"){
        this.apiData.data.responseAction = "GET";
     }
     else{
      this.apiConfigservice.getRequestActions();
      this.apiData.data.responseAction = "ACK";
     }
   }
   sendProductName(val){
      this.apiConfigservice.validationMsg='';
      this.switchUrl =  "v2/"+val.toLowerCase()+"/";
      this.apiData.data.switchUrl =  this.switchUrl;
    }
   validateUrl(apiForm){
    this.apiConfigservice.validationMsg='';
    this.apiConfigservice.checkUrl(apiForm);
   }
   onPreview(apiForm){
    this.router.navigate(['/auth/api-configuration/summary']);
    this.apiData.setData(apiForm);
   }
  
}
