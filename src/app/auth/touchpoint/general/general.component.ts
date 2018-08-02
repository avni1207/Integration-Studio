import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {
  closeResult: string;
  Isdirect : boolean;
  constructor(private modalService: NgbModal) { }
  public interfaceData = {
      "product": 'tms',
      "entity": 'entity1',
      "direction": 'inbound',
      "action": '',
      "jobName": 'tenantname_interface_description',
      "requestBaseVersion": 'version1.1',
      "responseBaseVersion": 'Generic Ack zDoc',
      "specType": 'file',
      "packerRequired": true,
      "cron": '',
      "generatePackerFiles": true,
      "enableAttachment": true,
      "sftpHost": '',
      "sftpPort": '',
      "sftpUserName": '',
      "sftpPassword": '',
      "folderToWatch": '',
      "targetFolder": '',
      "fileNamePattern": '',
      "generateChecksum": true,
      "enableEncryption": false,
      "activateEmailNotification": false,
      "notificationEmailAddress": '',
      "notificationEmailSubject": '',
      "active": false,
      "endpointUrl" : '',

    }

  ngOnInit() {
      this.Isdirect = true;
  }

  onSelect(value){
    if(value == "inbound"){
        this.Isdirect = true;
        this.interfaceData.responseBaseVersion = "Generic Ack zDoc";
      }
    if(value == "outbound"){
       this.Isdirect = false;
       this.interfaceData.responseBaseVersion = "Please subscribe to PO_Inbound_Ack seperately";
     }
   }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onSubmit(){
   // console.log("general form data",this.interfaceData)
  }

}
