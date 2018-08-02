import { Injectable } from '@angular/core';
import { ZdocDataService } from '../../zdoc-data/zdoc-data.service';
import { RestClientService } from '../../../global/rest-client/rest-client.service';
import { AlertService } from '../../alertmsg/alert-service';
import { Router } from '@angular/router';

@Injectable()
export class ZdocConfigService {

  notFoundzdocError = [];
  zdocDataProducts = [];
  zDocactions = [];
  zdocDataposted = [];
  zdocDataActions = [];
  filteredZdocs = [];
  filterData = [];
  validZdoc = [];
  allZdocs = [];
  editZdocResponse = [];
  validvar = '';
  engineVal = '';
  xsdpath = '';
  xsdupoloadSuccess = "";
  xsdshowloader : boolean = false;
  zdocFlag : boolean = false;
  xsdapipath = '';
  xsdapiupoloadSuccess = "";
  xsdapishowloader : boolean = false;
  xsdFlag : boolean = false;
  xsdapiFlag : boolean = false;
  jsonFlag : boolean = false;
  jsonpath = '';
  jsonupoloadSuccess = "";
  jsonshowloader : boolean = false;
  notFoundMsg = "Could not connect to IntegrationStudio-API services";
  invalidVersionMsg = "";
  invalidEngineMsg = "";
  loginRole = "";
  isAdmin : boolean = false;
  loginMsg = "";
  isLoginInValid : boolean = true;
  isValidUser : boolean = false;
  

  constructor(private alertService: AlertService, private rest: RestClientService,private zdocData: ZdocDataService, private router: Router) { }

  getzdocProducts() {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/api/sourceproducts',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.zdocDataProducts = response.result[0].payload || [];
      // console.log("Success touchPointsDataProducts", this.touchPointsDataProducts);
    })

  }

  getActions(data){
    // alert("hii");
     const requestParamsMock = {
       url: 'api/IntegrationStudio-API/web/zdocs/zdocaction',
       method: 'post',
       mock: true,
       data:{
         "directionFlag": data.directionFlag,
       }
     }
     this.rest.request(requestParamsMock).catch(error => {
       this.notFoundzdocError = error;
       // console.log("Error", error);
     })
     .subscribe((response) => {
       this.zdocData.data.action = '';
       this.zDocactions = response.result[0].payload;
      
     })
   }

  getListzdocActions() {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/zdocs/acks',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.zdocDataActions = response.result[0].payload[0] || [];
      // console.log("Success touchPointsDataProducts", this.touchPointsDataProducts);
    })

  }

  getAllZdocs() {
    this.filterData = [];
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/zdocs/zdoc',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response['responseCode'] == 200){
        this.zdocFlag = true;
        this.allZdocs = response.result[0].payload || [];
      }
      else{
        this.zdocFlag = false;
      }
      
      // console.log("Success touchPointsDataProducts", this.touchPointsDataProducts);
    })

  }

  getFilteredZdoc(data){
   // alert("hii");
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/zdocs/zdocsearch',
      method: 'post',
      mock: true,
      data:{
        "product": data.product,
        "directionFlag": data.direction,
        "action": data.action
       
      }
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.filterData = response;
      if(this.filterData['responseCode'] == 200){
        this.filteredZdocs = response.result[0].payload || [];
        //this.allZdocs = this.filteredZdocs;
      }
    })
  }

  
  getEditZdocDetails(zdoc){
    var data = {
      "id": zdoc.id
    };
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/zdocs/getzdoc',
      method: 'post',
      mock: true,
      data: JSON.parse(JSON.stringify(data))

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
    
      if(response['responseCode'] == '200'){
        this.editZdocResponse = response.result[0].payload[0] || [];
        this.router.navigate(['/auth/zdoc-configuration/zdoc-subscription']);
        this.zdocData.setData(this.editZdocResponse);
       }
      else{
        this.alertService.error(response['errorMessage'] )
        window.scrollTo(0, 0);
      }
      
    });
  }

  getEngineData(zdocData){
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/zdocs/engine',
      method: 'post',
      mock: true,
      data:{
        "action": zdocData.action,
        "directionFlag": zdocData.directionFlag   
      }
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response.responseCode == 200){
        this.engineVal = response.result[0].payload[0] || [];
        this.zdocData.data.engine = this.engineVal;
        this.validvar = '';
        this.zdocExists(zdocData);
      }
      else{
        this.invalidEngineMsg = response.errorMessage;
        
      }

      
    })
  }

  zdocExists(zdocData){
   
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/zdocs/zdocexists',
      method: 'post',
      mock: true,
      data:{
        "product": zdocData.product,
        "entity": zdocData.entity,
        "directionFlag": zdocData.directionFlag,
        "action": zdocData.action,
        "zDocBaseVersion": zdocData.zDocBaseVersion,
        "zDocCustomVersion": zdocData.zDocCustomVersion

      }
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response.responseCode == 200){
        this.validZdoc = response.result[0].payload || [];
        this.validvar = 'true';
        //alert(this.validvar)
        
      }
      else{
         this.validvar = 'false';
         this.invalidVersionMsg = response.errorMessage;
        // alert(this.validvar);
        
      }
      
    })
  }
  
  xsdgetFilePath(fileval): any{
    this.xsdshowloader = true
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/api/zdocfile',
      method: 'post',
      mock: true,
      data: fileval
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response.responseCode == 200){
        this.xsdpath = response.result[0].payload[0] || [];
        this.zdocData.data.xsdFile  = this.xsdpath;
        this.xsdshowloader = false;
        this.xsdupoloadSuccess = "true";
        this.xsdFlag = false;
        
      }
      
    })
  }

  xsdapigetFilePath(fileval): any{
    this.xsdapishowloader = true
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/api/zdocfile',
      method: 'post',
      mock: true,
      data: fileval
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response.responseCode == 200){
        this.xsdapipath = response.result[0].payload[0] || [];
        this.zdocData.data.xsd  = this.xsdapipath;
        this.xsdapishowloader = false;
        this.xsdapiupoloadSuccess = "true";
        this.xsdapiFlag = false;
        
      }
      
    })
  }
  
  jsongetFilePath(fileval): any{
    this.jsonshowloader = true
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/api/zdocfile',
      method: 'post',
      mock: true,
      data: fileval
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response.responseCode == 200){
        this.jsonpath = response.result[0].payload[0] || [];
        this.zdocData.data.mapping  = this.jsonpath;
        this.jsonshowloader = false;
        this.jsonupoloadSuccess = "true";
        this.jsonFlag = false;
        
      }
      
    })
  }
  
  submitZdocData(zdocForm){
    //zdocForm.zDocBaseVersion = zdocForm.zDocBaseVersion.toFixed(2);
    //zdocForm.zDocCustomVersion = zdocForm.zDocCustomVersion.toFixed(2);
    //alert(JSON.stringify(zdocForm))
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/zdocs/zmapping',
      method: 'post',
      mock: true,
      data: zdocForm
     }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.zdocDataposted = response || [];
      this.router.navigate(['/auth/zdoc-configuration']);
      if(this.zdocDataposted['responseCode'] != '200'){
        this.alertService.error(this.zdocDataposted['errorMessage'])
      }
      else{
        this.alertService.success(this.zdocDataposted['result'][0].payload[0].status);
      
      }
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
    })
  }

  checkUserRole(val){
    //alert("before" +JSON.stringify(val));
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/jobs/login',
      method: 'post',
      mock: true,
      data:{
        "id": val.username,
        "password": val.password
      }
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundzdocError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response.responseCode == 200){
        this.isLoginInValid = false;
        this.loginRole = response.result[0].payload[0] || [];
        //alert(this.loginRole)
        if(this.loginRole){
          localStorage.setItem("user", this.loginRole);
          setTimeout(() => {
            this.router.navigate(['/auth/dashboard/integration-studio']);
          } , 500)
          
          }
      }
      else{
        this.isLoginInValid = true;
        this.loginMsg = response.errorMessage;
        //alert(this.loginMsg);
      }
      
    })
  }

  logout(){
    
    localStorage.removeItem("user");
    this.router.navigate(['/unauth/login']);

  }
  
  checkCredentials(){
    //alert("hiiii");
    if (localStorage.getItem("user") === null){
      this.isValidUser = false;
      this.router.navigate(['/unauth/login']);
    } 
    else{
      this.isValidUser = true;
    }
  }

  checkIsuser(){
    if (localStorage.getItem("user") === 'user'){
        this.router.navigate(['/unauth/404']);
    } 
  }

}
