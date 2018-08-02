import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'
import { Subject } from 'rxjs';

@Injectable()
export class StudioDataService {
  fileName = ''; 
  cronMsg = new Subject<string>();
  data = {
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
    "active": true,
    "endpointUrl" : '',
    "encryptionType": '',
    "encryptionKey": '',
    "attachmentFolder": '',
    "actionRequired": false
  };


  setData(value){
   
    this.data = value ;
    if(this.data.cron) {
      this.cronMsg.next(this.data.cron);
    }
  }
}
