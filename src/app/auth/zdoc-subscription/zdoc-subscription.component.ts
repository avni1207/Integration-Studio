import { Component, OnInit, EventEmitter} from '@angular/core';
import { ZdocDataService } from '../zdoc-data/zdoc-data.service';
import { Router } from '@angular/router';
import { ZdocConfigService } from '../zdoc-configuration/zdoc-config/zdoc-config.service';


@Component({
  selector: 'app-zdoc-subscription',
  templateUrl: './zdoc-subscription.component.html',
  styleUrls: ['./zdoc-subscription.component.scss']
  
})
export class ZdocSubscriptionComponent implements OnInit {

  jsonfileValidationMsg : string;
  jsonfileErr : boolean;
  xsdfileValidationMsg : string;
  xsdfileErr : boolean;
  xsdapifileValidationMsg : string;
  xsdapifileErr : boolean;

  constructor( private zdocConfigservice : ZdocConfigService, private zdocData : ZdocDataService, private router : Router ) {

  }
 

  ngOnInit() {
    this.zdocConfigservice.checkIsuser();
    this.zdocConfigservice.jsonupoloadSuccess = "false",
    this.zdocConfigservice.xsdupoloadSuccess = "false",
    this.zdocConfigservice.xsdapiupoloadSuccess = "false",
    this.zdocConfigservice.xsdapiFlag = false,
    this.zdocConfigservice.xsdFlag = false,
    this.zdocConfigservice.jsonFlag = false,
    this.jsonfileErr = false;
    this.xsdfileErr = false;
    this.xsdapifileErr = false;
    this.jsonfileValidationMsg = '';
    this.xsdfileValidationMsg  = '';
    this.xsdapifileValidationMsg = '';
    this.zdocConfigservice.getzdocProducts();
    if(this.zdocConfigservice.editZdocResponse['id']){
      this.zdocData.jsonfilename = "entity.json";
      this.zdocData.xsdapifilename = "entity.xsd";  
      this.zdocData.xsdfilename = "entity_file.xsd"; 
    
    }
    
  }

  changeOptioncolor(value){
    value.style.color = "black";
  }

  getZdocaction(val){
    this.zdocConfigservice.getActions(val);
  }

  getEngineVal(zdocData){
    
    if(zdocData.action && zdocData.directionFlag){
      this.zdocConfigservice.getEngineData(zdocData);
    }
  }

  validateVersion(zdocData){
    this.zdocConfigservice.validvar = '';
    this.zdocConfigservice.zdocExists(zdocData);
  }
  

  jsonfileValidation(){
    if(this.zdocConfigservice.editZdocResponse['id'])
      {
         this.zdocConfigservice.jsonFlag = true;
      }
    this.jsonfileErr = false;
    this.jsonfileValidationMsg = '';
    this.zdocConfigservice.jsonupoloadSuccess = "false";
    let jsonfileValue = (<HTMLInputElement>document.getElementById('jsoninput')).files[0];
    let jsonfileInput = (<HTMLInputElement>document.getElementById('jsoninput'));
    this.zdocData.jsonfilename = jsonfileValue.name;
    let filePath = jsonfileInput.value;
    var allowedExtensions = /(\.json)$/i;
    if(!allowedExtensions.exec(filePath)){
      this.jsonfileErr = true;
      this.jsonfileValidationMsg = "Upload a valid a .json file";
      jsonfileInput.value = '';     
      return false;
    }
    else{
      var formDatar = new FormData();
      formDatar.append('file', jsonfileValue);
      formDatar.append('type', this.zdocData.jsonfileType);
      this.zdocConfigservice.jsongetFilePath(formDatar);
    }
  }

  xsdfileValidation(){
    if(this.zdocConfigservice.editZdocResponse['id'])
      {
         this.zdocConfigservice.xsdFlag = true;
      }
    this.xsdfileErr = false;
    this.xsdfileValidationMsg  = '';
    this.zdocConfigservice.xsdupoloadSuccess = "false";
    let xsdfileValue = (<HTMLInputElement>document.getElementById('xsdinput')).files[0];
    this.zdocData.xsdfilename = xsdfileValue.name;
    let xsdfileInput = (<HTMLInputElement>document.getElementById('xsdinput'));
    let filePath = xsdfileInput.value;
    var allowedExtensions = /(\.xsd)$/i;
    if(!allowedExtensions.exec(filePath)){
      this.xsdfileErr = true;
      this.xsdfileValidationMsg = "Upload a valid .xsd file ";
      xsdfileInput.value = '';     
      return false;
    }
    else{
      var formDataq = new FormData();
      formDataq.append('file', xsdfileValue);
      formDataq.append('type', this.zdocData.xsdfileType);
      this.zdocConfigservice.xsdgetFilePath(formDataq);
    }
  }


  xsdapifileValidation(){
    if(this.zdocConfigservice.editZdocResponse['id'])
      {
         this.zdocConfigservice.xsdapiFlag = true;
      }
    this.xsdapifileErr = false;
    this.xsdapifileValidationMsg = '';
    this.zdocConfigservice.xsdapiupoloadSuccess = "false";
    let xsdapifileValue = (<HTMLInputElement>document.getElementById('xsdapiinput')).files[0];
    let xsdapifileInput = (<HTMLInputElement>document.getElementById('xsdapiinput'));
    this.zdocData.xsdapifilename = xsdapifileValue.name;
    let filePath = xsdapifileInput.value;
    var allowedExtensions = /(\.xsd)$/i;
    if(!allowedExtensions.exec(filePath)){
      this.xsdapifileErr = true;
      this.xsdapifileValidationMsg = "Upload a valid .xsd file";
      xsdapifileInput.value = '';     
      return false;
    }
    else{
      var formDatas = new FormData();
      formDatas.append('file', xsdapifileValue);
      formDatas.append('type', this.zdocData.xsdfileapiType);
      this.zdocConfigservice.xsdapigetFilePath(formDatas);
    }
  }

  onSubmit(val){
    this.router.navigate(['/auth/zdoc-configuration/summary']);
    this.zdocData.setData(val);
  }

}
