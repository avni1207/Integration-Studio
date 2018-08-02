import { Injectable } from '@angular/core';
import { RestClientService } from '../../global/rest-client/rest-client.service';
import {StudioDataService} from '../studio-data/studio-data.service';
import { Router } from '@angular/router';
import { AlertService } from '../alertmsg/alert-service';

@Injectable()
export class IntegrationStudioService {
  tenantIds = [];
  touchPointsDataProducts = [];
  touchPointsDataApproach = [];
  touchPointsDataDirection = [];
  touchPointsDataEntities = [];
  touchPointsDataEvents = [];
  interfaceIsexist = [];
  touchPointsDataEntityZdoc = [];
  touchPointsDataAckZdoc = [];
  touchPointsDataEncryptionType = [];
  touchPointDataSftp = [];
  touchPointDataApiurl = [];
  AllTouchpointsList = [];
  touchPointsDataGetdownloadZdoc = [];
  getTouchpointData = [];
  touchPointsEditData = [];
  touchPointsDataAesKey = "";
  touchPointsDataJobName =  "";
  env = "";
  tenantNames = "";
  touchPointsDataGetEntitydownloadZdoc = "";
  touchPointsDataGetAckdownloadZdoc = "";
  AckdownloadZdocfileName = "";
  EntitydownloadZdocfileName = "";
  touchPointsDataGetfilePath = "";
  ackresponse = "";
  editResponse = "";
  touchpointStatus = "";
  notFoundError = [];
  notFoundMsg = "Could not connect to IntegrationStudio-API services";
  showSuccessfulMsg = false; 
  actionvar = [];
  ackerr = "";


  constructor(private rest: RestClientService, private interfaceData : StudioDataService, private router: Router, private alertService: AlertService) { }
  touchPointsDataTenantIds = [];
  showloader : boolean = false;

 checkInterface(entityForm){

    if(entityForm.direction == "INBOUND"){
       this.actionvar = entityForm.action
      }
      else{
       this.actionvar = [];
      }
    const requestParamsMock = {
    
      url: '/api/IntegrationStudio-API/web/jobs/jobexists',
      method: 'post',
      mock: true,
      data:{
        "tenantId": entityForm.tenantId,
        "product": entityForm.product,
        "entity": entityForm.entity,
        "direction": entityForm.direction,
        "action": this.actionvar

      }
    }
      this.rest.request(requestParamsMock).catch(error => {
        this.notFoundError = error;
        // console.log("Error", error);
      })
    .subscribe((response) => {
             this.interfaceIsexist = response || [];
              // console.log("interface exists", this.interfaceIsexist);
            });

  }
  getTenantId(){

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/tenants',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.tenantIds = response || [];
      // console.log("Success tenantIds", this.tenantIds);
    })

  }

  getTenantName(value) {
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/tenantname',
      method: 'post',
      mock: true,
      data:{
        "tenantId": value,
      }
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response.responseCode == '200'){
        this.tenantNames = response.result[0].payload[0] || [];
      }
        
              // console.log("Success tenantname", this.tenantNames);
            });
    }


  getAllTenantIds(){
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/tenants',
      method: 'get',
      mock: true

    }
    this.rest.request(requestParamsMock).catch(error => {
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataTenantIds = response.result[0].payload || [];
      // console.log("Success touchPointsDataTenantIds", this.touchPointsDataTenantIds);
    })
  }

  getProducts() {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/api/products',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataProducts = response || [];
      // console.log("Success touchPointsDataProducts", this.touchPointsDataProducts);
    })

  }
  getfilteredTouchpoints(tenantId){
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/jobDetails',
      method: 'post',
      mock: true,
      data:{
        "tenantId":tenantId,
      }

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error || [];
      // console.log("Error", error);
    })
    .subscribe((response) => {

      let Filterdtouchpoints = response.result[0].payload || [];
      this.AllTouchpointsList = Filterdtouchpoints ;
      // let i;
      // for (i = 0; i < this.AllTouchpointsList.length; i++) {
      //   if(this.AllTouchpointsList[i].active == "y"){
      //     this.AllTouchpointsList[i].active = "true";
      //     return this.AllTouchpointsList[i].active
      //   }
      //   else{
      //     this.AllTouchpointsList[i].active = "false";
      //     return this.AllTouchpointsList[i].active
      //   }
      // }
      // console.log("Success AllTouchpointsList", this.AllTouchpointsList);
    });
  }
  getDirection(entityForm) {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/direction',
      method: 'get',
      mock: true,
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataDirection = response || [];
      // console.log("Success touchPointsDataDirection", this.touchPointsDataDirection);
    })

  }

  getIntegrationApproach() {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/integrationapproach',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataApproach = response || [];
      // console.log("Success touchPointsDataApproach", this.touchPointsDataApproach);
    })

  }
  getEntities(entityForm) {
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/api/products/entities',
      method: 'post',
      mock: true,
      data:{
        "source": entityForm.product,
        "directionFlag": entityForm.direction
      }

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataEntities = response || [];

      // console.log("Success touchPointsDataEntities", this.touchPointsDataEntities);
    });
  }
  getEvents(entityForm) {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/api/products/events',
      method: 'post',
      mock: true,
      data:{
        "source": entityForm.product,
        "directionFlag": entityForm.direction,
        "entity": entityForm.entity
      }

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataEvents = response || [];
      // console.log("Success touchPointsDataEvents", this.touchPointsDataEvents);
    });

  }
  getZdoc(entityForm) {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/zdocbaseversions',
      method: 'post',
      mock: true,
      data:{
        "product": entityForm.product,
        "entity": entityForm.entity,
        "direction": entityForm.direction,
        "action": entityForm.action
      }
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
        this.touchPointsDataEntityZdoc = response.result[0].payload[0] || [];
        // console.log("Success touchPointsDataEntityZdoc", this.touchPointsDataEntityZdoc);
        this.touchPointsDataAckZdoc = response.result[0].payload[1] || [];
        this.ackresponse = response;
        // console.log("Success touchPointsDataAckZdoc", this.touchPointsDataAckZdoc);



    });

  }

  getJobName(entityForm) {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/jobname',
      method: 'post',
      mock: true,
      data: {
        "tenantName": entityForm.tenantName,
        "direction": entityForm.direction,
        "entity": entityForm.entity
      }

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataJobName = response.result[0].payload || [];
      // console.log("Success touchPointsDataJobName", this.touchPointsDataJobName);
    });

  }
  getEncryptionTypes() {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/encryptionlist',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataEncryptionType = response || [];
      // console.log("Success touchPointsDataEncryptionType", this.touchPointsDataEncryptionType);
    });

  }
  getAesKey() {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/aeskey',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataAesKey = response.result[0].payload[0]|| [];
      // console.log("Success touchPointsDataAesKey", this.touchPointsDataAesKey);
    });

  }

  getSftpdetails(entityForm) {
    
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/sftpdetails',
      method: 'post',
      mock: true,
      data: {
        "tenantId": entityForm.tenantId,
        "entity": entityForm.entity,
        "direction": entityForm.direction,
        "action": entityForm.action,
        "actionRequired" : entityForm.actionRequired
      }

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointDataSftp = response.result[0].payload || [];
      // console.log("Success touchPointsDataSftpdetails", this.touchPointDataSftp);

    });

  }
  getApiurl(entityForm) {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/api/endpoint',
      method: 'post',
      mock: true,
      data: {
        "product": entityForm.product,
        "entity": entityForm.entity,
        "direction": entityForm.direction,
        "action": entityForm.action
      }

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointDataApiurl = response.result[0].payload || [];
      // console.log("Success touchPointsApiurl", this.touchPointDataApiurl);

    });

  }

  getDownloadEntityZdoc(entityForm) {
    var data = {
      "product": entityForm.product ,
      "entity": entityForm.entity,
      "direction": entityForm.direction,
      "specType": entityForm.specType,
      "action": entityForm.action,
      "requestBaseVersion": entityForm.requestBaseVersion
    };
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/zdocs/downloadzdoc',
      method: 'post',
      mock: true,
      data: JSON.parse(JSON.stringify(data))

    }


    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchPointsDataGetEntitydownloadZdoc = response.result[0].payload[0] || [];
      this.EntitydownloadZdocfileName = response.result[0].payload[1];
      this.downloadEntity();
      // console.log("Success touchPointsDataGetEntitydownloadZdoc", this.touchPointsDataGetEntitydownloadZdoc);
    });

  }

  getDownloadAckZdoc(entityForm) {
    var data = {
      "product": entityForm.product ,
      "entity": entityForm.entity,
      "direction": entityForm.direction,
      "specType": entityForm.specType,
      "action": entityForm.action,
      "responseBaseVersion": entityForm.responseBaseVersion,

    };
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/zdocs/downloadzdoc',
      method: 'post',
      mock: true,
      data: JSON.parse(JSON.stringify(data))
    }

    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      if(response.responseCode == "200"){
        this.touchPointsDataGetAckdownloadZdoc = response.result[0].payload[0] || [];
        this.AckdownloadZdocfileName = response.result[0].payload[1];
        this.downloadAck();
      }
      else{
    
        this.ackerr = response.errorMessage;
        setTimeout(() => {
          this.ackerr = " ";
         },3000);
        
      }
      
      // console.log("Success touchPointsDataGetAckdownloadZdoc", this.touchPointsDataGetAckdownloadZdoc);
    });

  }

  getAllTouchpoints() {

    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/jobDetails',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.AllTouchpointsList = response.result[0].payload || [];
      // console.log("Success AllTouchpointsList", this.AllTouchpointsList);
    });

  }

  submitTouchpointData(interfaceData){
   
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/job',
      method: 'post',
      mock: true,
      data: interfaceData

    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.touchpointStatus = response;
      this.router.navigate(['/auth/dashboard/integration-studio']);
      if(this.touchpointStatus['responseCode'] != '200'){
        this.alertService.error(this.touchpointStatus['errorMessage'])
      }
      else{
        this.getTouchpointData = response.result[0].payload || [];
        this.alertService.success(this.getTouchpointData[0].status)
      }
      this.interfaceData.data = {
        "tenantId": '',
        "tenantName": '',
        "userId": '',
        "product": '',
        "entity": '',
        "direction": '',
        "action": '',
        "jobName": '',
        "requestBaseVersion": '',
        "responseBaseVersion": '',
        "specType": '',
        "packerRequired": null,
        "cron": '',
        "generatePackerFiles": true,
        "enableAttachment": true,
        "server": '',
        "port": '',
        "userName": '',
        "password": '',
        "folderToWatch": '',
        "pgpFile": '',
        "targetFolder": '',
        "filePrefix":'',
        "fileSuffix":'',
        "fileNamePattern": '',
        "generateChecksum": true,
        "enableEncryption": false,
        "activateEmailNotification": true,
        "notificationEmailAddress": '',
        "notificationEmailSubject": '${env} ${entityType} Integration ${status}',
        "active": false,
        "endpointUrl" : '',
        "encryptionType": '',
        "encryptionKey": '',
        "attachmentFolder": '',
        "actionRequired": false
      };
      this.touchPointsDataEntities = [];
      this.touchPointsDataEvents = [];
      this.interfaceIsexist = [];
      this.ackresponse = "";
      this.showSuccessfulMsg = false;

      });

      }

  downloadAck() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.touchPointsDataGetAckdownloadZdoc));
    element.setAttribute('download', this.AckdownloadZdocfileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  downloadEntity() {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.touchPointsDataGetEntitydownloadZdoc));
    element.setAttribute('download', this.EntitydownloadZdocfileName);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  getpgpFilePath(fileValue) : any{
    this.showloader = true
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/api/file',
      method: 'post',
      mock: true,
      data: fileValue
    }

    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {

      this.touchPointsDataGetfilePath = response.result[0].payload[0] || [];
      // console.log("Success touchPointsDataGetfilePath", this.touchPointsDataGetfilePath);
      this.showloader = false

    });
  }


  getenv(){
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/env',
      method: 'get',
      mock: true
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      this.env = response.result[0].payload[0]|| [];
      // console.log("Success enviorment", this.env);
    });

  }

  getEditDetails(touchpoint){
      var data = {
        "jobId": touchpoint.jobId,
        "direction": touchpoint.direction
      };
      const requestParamsMock = {
        url: '/api/IntegrationStudio-API/web/jobs/tpc',
        method: 'post',
        mock: true,
        data: JSON.parse(JSON.stringify(data))

      }
      this.rest.request(requestParamsMock).catch(error => {
        this.notFoundError = error;
        // console.log("Error", error);
      })
      .subscribe((response) => {
        this.editResponse = response;
        if(this.editResponse['responseCode'] == '200'){
          this.touchPointsEditData = response.result[0].payload[0] || [];
          this.interfaceData.fileName = "";
          this.router.navigate(['/auth/dashboard/integration-studio/interface-subscription']);
          this.interfaceData.setData(this.touchPointsEditData);
          this.getEvents(this.touchPointsEditData);
          this.getZdoc(this.touchPointsEditData);
        }
        else{
          this.alertService.error(this.editResponse['errorMessage'] )
          window.scrollTo(0, 0);
        }
        
      });
    }
  editActivefield(activeValue , jobId){
    // console.log(activeValue , jobId)
    var data = {
      "jobId": jobId ,
      "active": activeValue,
    };
    const requestParamsMock = {
      url: '/api/IntegrationStudio-API/web/jobs/jobactivate',
      method: 'post',
      mock: true,
      data: data
    }
    this.rest.request(requestParamsMock).catch(error => {
      this.notFoundError = error;
      // console.log("Error", error);
    })
    .subscribe((response) => {
      // console.log("Success response", response);
    });
  }

}
