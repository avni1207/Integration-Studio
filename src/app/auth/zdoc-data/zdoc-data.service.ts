import { Injectable } from '@angular/core';

@Injectable()
export class ZdocDataService {
  xsdfilename = "No file chosen";
  xsdfileType = "XSD_FILE";
  xsdapifilename = "No file chosen";
  xsdfileapiType = "XSD_API"
  jsonfilename = "No file chosen";
  jsonfileType = "JSON";
  
  data = {
    "id" : "",
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
}

  setData(value){ 
    this.data = value;
  }

}
