import { Injectable } from '@angular/core';
import { RestClientService } from '@global/rest-client/rest-client.service';

@Injectable()
export class TouchpointService {

  touchPointsData = [];
  touchPointsData2 = [];

  constructor(private rest: RestClientService) { }

  getTouchpointsData() {
     const requestParams = {
        url: 'dd/users/getDetails',
        method: 'get'
      }
      const requestParamsMock = {
        url: 'http://192.168.6.155:8080/IntegrationStudio-API/web/api/products',
        method: 'get',
        mock: true
      }
      const requestParamsMock2 = {
        url: 'assets/mocks/studio-table-data.json',
        method: 'get',
        mock: true
      }

     this.rest.request(requestParamsMock)
        .catch(error => {
          //console.log("Error", error);
        })
        .subscribe((response) => {
          this.touchPointsData = response.data || [];
         // console.log("Success", this.touchPointsData);
        });
     this.rest.request(requestParamsMock2)
         .catch(error => {
          // console.log("Error", error);
        })
         .subscribe((response) => {
           this.touchPointsData2 = response.data || [];
           //console.log("Success", this.touchPointsData2);
        });
  }
  addTouchpointsData(data){
    //console.log("service data captured", data);
    const requestParamsMock = {
      url: 'assets/mocks/studio-data.json',
      method: 'post',
      mock: true,
      data: data
    }
    this.rest.request(requestParamsMock)
      .catch(error => {
        //console.log("Error", error);
      })
      .subscribe((response) => {
        this.touchPointsData = response.data || [];
       // console.log("Success", this.touchPointsData);
      })
  }

}
