import { Component, EventEmitter, Output , OnInit, Input} from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {StudioDataService} from '../studio-data/studio-data.service';
import { IntegrationStudioService } from './integration-studio.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { allResolved } from 'q';
import { Router } from '@angular/router';
import { AlertService } from '../alertmsg/alert-service';
import { Pipe, PipeTransform } from '@angular/core';




@Component({
  selector: 'app-integration-studio',
  templateUrl: './integration-studio.component.html',
  styleUrls: ['./integration-studio.component.scss']
})
@Pipe({
  name: 'filter'
}) 
export class IntegrationStudioComponent implements OnInit {
  public count:any = 10;
  closeResult: string;
  addForm: FormGroup;

  constructor( private alertService: AlertService, private router: Router, private intStudioService: IntegrationStudioService, private modalService: NgbModal, private fb: FormBuilder, private interfaceData : StudioDataService) {

    this.addForm = this.fb.group({
      name: ['', Validators.required ],
    });
  }
  isHidden= false;

  ngAfterViewInit() {
    window.scrollTo(0, 0);
 }

 /***Search bar ***/
 transform(items: any[], searchText: string): any[] {
  if(!items) return [];
  if(!searchText) return items;
  searchText = searchText.toLowerCase();
  return items.filter( it => {
    return it.toLowerCase().includes(searchText);
  });
}

  ngOnInit() {
    
    this.intStudioService.getAllTouchpoints();
    this.intStudioService.getAllTenantIds();

  }

  getDetails(touchpoint){
    
    this.intStudioService.getEditDetails(touchpoint);
   // setTimeout(() => {
     
        // if(this.intStudioService.editResponse['responseCode'] == '500'){
        //   this.alertService.error(this.intStudioService.editResponse['errorMessage'] )
        //   window.scrollTo(0, 0);
        // }
        // else{
        //     this.interfaceData.fileName = "";
        //     this.router.navigate(['/auth/dashboard/integration-studio/interface-subscription']);
        //     this.interfaceData.setData(this.intStudioService.touchPointsEditData);
        //     this.intStudioService.getEvents(this.intStudioService.touchPointsEditData);
        //     this.intStudioService.getZdoc(this.intStudioService.touchPointsEditData);
        // }
       
   // },700);

    
   

  }
  editActive(activeValue , jobId){
    this.intStudioService.editActivefield(activeValue , jobId)
  }
  sendTenantId(tenantId){
    this.intStudioService.getfilteredTouchpoints(tenantId);

  }

  /*****Hide show dropdown****/

  toggleDropdown(){
    this.isHidden = !this.isHidden;
  }

  /*********Add data*******************/

  createForm() {
    this.intStudioService.touchPointsEditData = [];
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
      "active": true,
      "endpointUrl" : '',
      "encryptionType": '',
      "encryptionKey": '',
      "attachmentFolder": '',
      "actionRequired": false
    };
    this.intStudioService.touchPointsDataEntities = [];
    this.intStudioService.touchPointsDataEvents = [];
    this.intStudioService.interfaceIsexist = [];
    this.intStudioService.ackresponse = "";
    this.router.navigate(['/auth/dashboard/integration-studio/interface-subscription']);
  }

  sendCount(val){
    this.count = val;
  }

  /*******Model window for new touchpoint****/

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




}
