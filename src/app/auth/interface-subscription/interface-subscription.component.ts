import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {StudioDataService} from '../studio-data/studio-data.service';
import { Router } from '@angular/router';
import { IntegrationStudioService } from '../integration-studio/integration-studio.service';
import { CronEditorModule } from "cron-editor/cron-editor";
import {MultiSelectModule} from 'primeng/multiselect';
import {SelectItem} from 'primeng/api';
import { CronOptions } from "cron-editor/cron-editor";
import { DatePipe } from '@angular/common';
import { ZdocConfigService } from '../zdoc-configuration/zdoc-config/zdoc-config.service';




@Component({
  selector: 'app-interface-subscription',
  templateUrl: './interface-subscription.component.html',
  styleUrls: ['./interface-subscription.component.scss'],
 
})
export class InterfaceSubscriptionComponent {

  //interfaceData
 // events: SelectItem[];
 // selectedEvent: string[] = [];
  constructor(private router: Router , private modalService: NgbModal , private interfaceData : StudioDataService , private intStudioService : IntegrationStudioService, private zdocConfigservice : ZdocConfigService) {

  }

  /*  public */
  today: any;
  activationMessage : string;
  IsactivationMessage :boolean = false;
  showError : boolean;
  //showDataError : boolean;
  pgpValidationMsg : string;
  pgperrorShow : boolean;
  $ :any;
  closeResult: string;
  Isdirect : boolean = false;
  public cron = '0 0 0/1 1/1 * ? *';

  public cronOptions: CronOptions = {

    formInputClass: 'form-control cron-editor-input',
    formSelectClass: 'form-control cron-editor-select',
    formRadioClass: 'cron-editor-radio',
    formCheckboxClass: 'cron-editor-checkbox',
    defaultTime: "10:00:00",
    hideMinutesTab: true,
    hideHourlyTab: false,
    hideDailyTab: false,
    hideWeeklyTab: false,
    hideMonthlyTab: true,
    hideYearlyTab: true,
    hideAdvancedTab: false,
    use24HourTime: true,
    hideSeconds: true
  };


  ngOnInit() {
    //alert(localStorage.getItem("user"));
    
    if(!this.intStudioService.touchPointsEditData['jobId']){
      this.interfaceData.cronMsg
      .subscribe(cron => {
          this.cron = cron;
      });
    }
    if(this.intStudioService.touchPointsEditData['jobId']){
      this.cron = this.intStudioService.touchPointsEditData['cron'];
      this.pgperrorShow = false;
    }
    this.intStudioService.getTenantId();
    this.intStudioService.getEncryptionTypes();
    this.intStudioService.getAesKey();
    this.intStudioService.getProducts();
    this.intStudioService.getIntegrationApproach();
    this.today = new Date();
    //alert(today);
    
  }
  copyText(id){
    var copyText = (<HTMLInputElement>document.getElementById(id))
    copyText.select();
    document.execCommand("Copy");
    alert("Copied the text: " + copyText.value);
  }
  sendId(value){
   
    this.intStudioService.tenantNames = '';
    this.interfaceData.data.userId= '';
    this.intStudioService.ackresponse = "";
    this.intStudioService.interfaceIsexist = [];
    this.interfaceData.data.product='';
    this.interfaceData.data.entity='';
    this.interfaceData.data.action='';
    this.intStudioService.touchPointsDataEntities = [];
    this.intStudioService.touchPointsDataEvents = [];
    this.intStudioService.getTenantName(value);
    setTimeout(() => {
      if(this.intStudioService.tenantNames == ''){
        this.interfaceData.data.tenantName = '';
      }else{
        this.interfaceData.data.tenantName = this.intStudioService.tenantNames;
      }
    }, 500);

  }
  showAesKey(value){
    this.intStudioService.showSuccessfulMsg = false;
    //this.interfaceData.data.pgpFile = ''; 
    if(value == "AES")
    {
      if (this.interfaceData.data.encryptionKey == null || this.interfaceData.data.encryptionKey == ''){
        this.interfaceData.data.encryptionKey = this.intStudioService.touchPointsDataAesKey;
      }
    }
   
  }

  onSelect(entityForm){
    this.interfaceData.data.jobName = '';
    this.interfaceData.data.entity = '';
    this.intStudioService.touchPointsDataEntities = [];
    this.intStudioService.touchPointsDataAckZdoc = [];
    this.intStudioService.ackresponse = "";
    this.intStudioService.touchPointsDataEvents = [];
    this.intStudioService.interfaceIsexist = [];
    this.intStudioService.touchPointsDataEntityZdoc = [];
    this.interfaceData.data.responseBaseVersion = "";
    this.interfaceData.data.requestBaseVersion = "";
    this.intStudioService.touchPointDataSftp = [];
    this.interfaceData.data.specType = "";
    this.interfaceData.data.server = "";
    this.interfaceData.data.port = "";
    this.interfaceData.data.userName = "";
    this.interfaceData.data.password = "";
    this.interfaceData.data.folderToWatch = "";
    this.interfaceData.data.targetFolder = "";
    this.interfaceData.data.attachmentFolder = "";
    this.interfaceData.data.endpointUrl = "";
    // this.interfaceData.data.direction = "";
    this.interfaceData.data.action = "";
    this.interfaceData.data.jobName = "";
    this.showError = false;
    this.intStudioService.getEntities(entityForm);
    if(entityForm.direction == "INBOUND"){
      this.Isdirect = true;
      this.interfaceData.data.packerRequired = 'true';
      //this.interfaceData.data.responseBaseVersion = "Generic Ack zDoc";
    }
    else{
      this.interfaceData.data.packerRequired = null;
    }

    if(entityForm.direction == "OUTBOUND"){
      this.Isdirect = false;
      // setTimeout(() => { this.interfaceData.data.responseBaseVersion = "Please subscribe to PO_Inbound_Ack seperately"; }, 4000);
    }

  }
  open(content) {
    this.IsactivationMessage = true
    if(this.interfaceData.data.active == false){
      this.activationMessage = "Interface will be activated";
      setTimeout(()=>{this.IsactivationMessage = false} , 3000)
    }
    else{
      this.activationMessage = "Interface will be deactivated";
      setTimeout(()=>{this.IsactivationMessage = false} , 3000)
    }

  }

actioncheck(entityForm,event){
      entityForm.actionRequired = event;
      this.interfaceData.data.folderToWatch = "";
      this.interfaceData.data.targetFolder = "";
      this.intStudioService.getSftpdetails(entityForm);
      setTimeout(()=>{
        this.interfaceData.data.folderToWatch = this.intStudioService.touchPointDataSftp[0].folderToWatch;
        this.interfaceData.data.targetFolder = this.intStudioService.touchPointDataSftp[0].targetFolder;
      }, 500);
  }

onSubmit(val){
    //console.log("val",val)
    this.router.navigate(['/auth/dashboard/integration-studio/summary']);
    this.interfaceData.setData(val);
  }

  sendProductName(entityForm){
    this.intStudioService.touchPointsDataAckZdoc = [];
    this.intStudioService.ackresponse = "";
    this.intStudioService.touchPointsDataEntityZdoc = [];
    this.intStudioService.touchPointsDataEvents = [];
    this.intStudioService.interfaceIsexist = [];
    this.intStudioService.touchPointsDataDirection = [];
    this.intStudioService.touchPointsDataEntities = [];
    this.intStudioService.touchPointDataSftp = [];
    this.interfaceData.data.specType = "";
    this.interfaceData.data.server = "";
    this.interfaceData.data.port = "";
    this.interfaceData.data.userName = "";
    this.interfaceData.data.password = "";
    this.interfaceData.data.folderToWatch = "";
    this.interfaceData.data.targetFolder = "";
    this.interfaceData.data.attachmentFolder = "";
    this.interfaceData.data.endpointUrl = "";
    this.interfaceData.data.direction = "";
    this.interfaceData.data.entity = "";
    this.interfaceData.data.action = "";
    this.interfaceData.data.responseBaseVersion = "";
    this.interfaceData.data.requestBaseVersion = "";
    this.intStudioService.getDirection(entityForm);
    this.interfaceData.data.jobName = "";
    this.showError = false;
 
  }
  sendEntity(entityForm){
    // no error
    this.intStudioService.touchPointsDataGetdownloadZdoc = [];
    this.intStudioService.touchPointsDataGetEntitydownloadZdoc = "";
    this.intStudioService.touchPointsDataGetAckdownloadZdoc = "";
    this.intStudioService.AckdownloadZdocfileName = "";
    this.intStudioService.EntitydownloadZdocfileName = "";
    this.intStudioService.touchPointsDataGetfilePath = "";
    this.interfaceData.data.fileSuffix = "_"+ "<TIMESTAMP>.xml";
    this.intStudioService.touchPointsDataAckZdoc = [];
    this.intStudioService.ackresponse = "";
    this.intStudioService.touchPointsDataEvents = [];
    this.intStudioService.interfaceIsexist = [];
    //this.intStudioService.touchPointsDataDirection = [];
    this.intStudioService.touchPointsDataEntityZdoc = [];
    this.interfaceData.data.responseBaseVersion = "";
    this.interfaceData.data.requestBaseVersion = "";
    this.intStudioService.touchPointDataSftp = [];
    this.interfaceData.data.specType = "";
    this.interfaceData.data.server = "";
    this.interfaceData.data.port = "";
    this.interfaceData.data.userName = "";
    this.interfaceData.data.password = "";
    this.interfaceData.data.folderToWatch = "";
    this.interfaceData.data.targetFolder = "";
    this.interfaceData.data.attachmentFolder = "";
    this.interfaceData.data.endpointUrl = "";
    // this.interfaceData.data.direction = "";
    this.interfaceData.data.action = "";
    this.interfaceData.data.jobName = "";
    this.showError = false;
    if(this.interfaceData.data.direction == "OUTBOUND"){
      this.intStudioService.checkInterface(entityForm);
    }
    this.intStudioService.getJobName(entityForm);
    this.intStudioService.getEvents(entityForm)
    setTimeout(() => { 
        this.interfaceData.data.jobName = this.intStudioService.touchPointsDataJobName[0];
       // this.events = this.intStudioService.touchPointsDataEvents['result'][0]['payload'];
    }, 1000);
  
  }
  sendName(entityForm){
    
    this.intStudioService.getJobName(entityForm);
    setTimeout(() => { 
      this.interfaceData.data.jobName = this.intStudioService.touchPointsDataJobName[0] 
    }, 500);
  }
  sendAction(entityForm){
    //this.intStudioService.touchPointDataSftp = [];
    this.intStudioService.getZdoc(entityForm);
    setTimeout(() => {this.interfaceData.data.requestBaseVersion = this.intStudioService.touchPointsDataEntityZdoc[0] ; this.interfaceData.data.responseBaseVersion = this.intStudioService.touchPointsDataAckZdoc[0] } , 1500);
    this.intStudioService.getSftpdetails(entityForm);
    this.intStudioService.getApiurl(entityForm);
    if(this.interfaceData.data.direction == "INBOUND"){
      this.intStudioService.checkInterface(entityForm);
      if(this.interfaceData.data.action.length > 1){
        this.showError = true;
      }
      else{
        this.showError = false;
      }
    }
    else{
      this.showError = false;
    }
    
  }
  onPrefixChange(value){
    let prefixVal = value.toUpperCase();
    this.interfaceData.data.fileNamePattern = prefixVal + this.interfaceData.data.fileSuffix;
  }
  showfiledetails(val){
   
    this.interfaceData.data.server = this.intStudioService.touchPointDataSftp[0].server;
    this.interfaceData.data.port = this.intStudioService.touchPointDataSftp[0].port;
    this.interfaceData.data.userName = this.intStudioService.touchPointDataSftp[0].userName;
    this.interfaceData.data.password = this.intStudioService.touchPointDataSftp[0].password;
    this.interfaceData.data.folderToWatch = this.intStudioService.touchPointDataSftp[0].folderToWatch;
    this.interfaceData.data.targetFolder = this.intStudioService.touchPointDataSftp[0].targetFolder;
    this.interfaceData.data.attachmentFolder = this.intStudioService.touchPointDataSftp[0].attachmentFolder;
    this.interfaceData.data.endpointUrl = this.intStudioService.touchPointDataApiurl[0];
    if(val =='FILE BASED INTEGRATION'){
      this.interfaceData.data.activateEmailNotification = true;
    }
    else{
      this.interfaceData.data.activateEmailNotification = false;
    }

  }
  sendEntityFileversion(entityForm){


  }
  sendAckFileversion(entityForm){


  }
  downloadAckZdoc(){
    this.intStudioService.getDownloadAckZdoc(this.interfaceData.data);
    // setTimeout(() => {
    //   this.intStudioService.downloadAck();
    // },500);

  }
  downloadEntityZdoc(){
    this.intStudioService.getDownloadEntityZdoc(this.interfaceData.data);
    // setTimeout(() => {
    //   this.intStudioService.downloadEntity();
    // },500);

  }
  uploadFile(){
   
    //this.intStudioService.getpgpFilePath(file)
    this.pgperrorShow = false;
    this.pgpValidationMsg = "";
    let fileValue = (<HTMLInputElement>document.getElementById('input')).files[0];
    var formData = new FormData();
    formData.append('file', fileValue);
    this.intStudioService.getpgpFilePath(formData);
    setTimeout(() => {
      // this.interfaceData.data.pgpFile = this.intStudioService.touchPointsDataGetfilePath;
      this.interfaceData.data.pgpFile = this.intStudioService.touchPointsDataGetfilePath;
      this.intStudioService.showSuccessfulMsg = true;
     // this.intStudioService.touchPointsDataGetfilePath = '';
    }, 9000);


  }
  validateEmail(field) {
    var regex = /^[\w-']+(\.[\w-']+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/;
    return (regex.test(field)) ? true : false;
  }
  validateMultipleEmailsCommaSeparated(emailcntl, seperator) {
    var value = emailcntl;
    if (value != '') {
      var result = value.split(seperator);
      for (var i = 0; i < result.length; i++) {
        if (result[i] != '') {
          if (!this.validateEmail(result[i])) {
            this.showError = true;
            return false;
          }
          else{
            this.showError = false;
          }

        }
      }
    }
    else{
      this.showError = false;
    }

    return true;
  }
  fileValidation(){
    this.interfaceData.data.pgpFile = ''; 
    this.intStudioService.touchPointsDataGetfilePath = '';
    let fileValue = (<HTMLInputElement>document.getElementById('input')).files[0];
    //console.log(fileValue);
    this.interfaceData.fileName = fileValue.name 
    let fileInput = (<HTMLInputElement>document.getElementById('input'));
    let filePath = fileInput.value;
    var allowedExtensions = /(\.pgp)$/i;
    if(!allowedExtensions.exec(filePath)){
      this.pgperrorShow = true;
      this.pgpValidationMsg = "Please upload file having extension .pgp ";
      fileInput.value = '';
      return false;
    }
    else{
      this.pgperrorShow = true;
      this.pgpValidationMsg = "Please click upload";
    }
  }


}
