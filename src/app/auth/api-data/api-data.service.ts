import { Injectable } from '@angular/core';

@Injectable()
export class ApiDataService {

  constructor() { }
  data = {
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

  setData(value){
    this.data = value ;
  }

}
