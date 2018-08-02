import { Injectable } from '@angular/core';
import { ApiDataService } from '../../api-data/api-data.service';
import { RestClientService } from '../../../global/rest-client/rest-client.service';
import { AlertService } from '../../alertmsg/alert-service';
import { Router } from '@angular/router';

@Injectable()
export class ApiConfigService {

  notFoundapiError = [];
  apiDataProducts = [];
  isUrlExists = [];
  apiDataposted = [];
  getAllapidata = [];
  filteredProducts = [];
  searchedProducts = [];
  apiDataReqActions = [];
  editApiData = [];
  validationMsg = "";
  urlFailureMsg = "";
  notFoundMsg = "Could not connect to IntegrationStudio-API services";

  constructor(private alertService: AlertService, private rest: RestClientService,private apiData: ApiDataService, private router: Router) { }

    getapiProducts() {

      const requestParamsMock = {
        url: '/api/IntegrationStudio-API/web/api/products',
        method: 'get',
        mock: true
      }
      this.rest.request(requestParamsMock).catch(error => {
        this.notFoundapiError = error;
        // console.log("Error", error);
      })
      .subscribe((response) => {
        this.apiDataProducts = response.result[0] || [];
        // console.log("Success touchPointsDataProducts", this.touchPointsDataProducts);
      })

    }
    getRequestActions() {

      const requestParamsMock = {
        url: '/api/IntegrationStudio-API/web/api/actionpost',
        method: 'get',
        mock: true
      }
      this.rest.request(requestParamsMock).catch(error => {
        this.notFoundapiError = error;
        // console.log("Error", error);
      })
      .subscribe((response) => {
        this.apiDataReqActions = response.result[0] || [];
        // console.log("Success touchPointsDataProducts", this.touchPointsDataProducts);
      })

    }

    checkUrl(apiForm) {
      apiForm.url = apiForm.prefixurl+apiForm.suffixurl;
      this.apiData.data.url = apiForm.url;
      const requestParamsMock = {
        url: 'api/IntegrationStudio-API/web/jobs/checkapiexists',
        method: 'post',
        mock: true,
        data:{
          "url": apiForm.url,
          "switchUrl": apiForm.switchUrl,
          "methodType" : apiForm.methodType,
          "requestEntity" : apiForm.requestEntity,
          "responseEntity" : apiForm.responseEntity
        }

      }
      this.rest.request(requestParamsMock).catch(error => {
        this.notFoundapiError = error;
        // console.log("Error", error);
      })
      .subscribe((response) => {
        this.isUrlExists = response || [];
        if(this.isUrlExists["responseCode"] == 200)
        {
          this.validationMsg = "true";
          this.urlFailureMsg = "No duplicate configuration found";

        }
       else{
          this.validationMsg = "false";
          this.urlFailureMsg = this.isUrlExists["errorMessage"];
        }
        setTimeout(() => {
          this.urlFailureMsg = "";
        } , 4000)
    })
  }

  submitApi(apiForm){
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/jobs/urlRepositories',
      method: 'post',
      mock: true,
      data: apiForm
     }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundapiError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.apiDataposted = response || [];
      this.router.navigate(['/auth/api-configuration']);
      if(this.apiDataposted['responseCode'] != '200'){
        this.alertService.error(this.apiDataposted['errorMessage'])
      }
      else{
        this.alertService.success(this.apiDataposted['result'][0].payload[0].status)
      }
      this.apiData.data =  {
        "id": "",
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
    })

  }

  getAllapis(){
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/urls',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundapiError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.getAllapidata = response.result[0].payload || [];
    })
  }

  filterproducts(){
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/apiproducts',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundapiError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.filteredProducts = response.result[0].payload || [];
      
    })

  }

  searchForProduct(productName){
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/jobs/apisearch',
      method: 'post',
      mock: true,
      data:{
        "source": productName
      }

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundapiError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.searchedProducts = response.result[0].payload || [];
      this.getAllapidata = this.searchedProducts;
    })
  }

  editApi(api){
    const requestParamsMock = {
      url: 'api/IntegrationStudio-API/web/jobs/getrepo',
      method: 'post',
      mock: true,
      data:{
        "id": api.id
      }

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundapiError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.editApiData = response.result[0].payload[0] || [];
      this.router.navigate(['/auth/api-configuration/api-subscription']);
      this.apiData.setData(this.editApiData);

    })

  }

}
