import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {StudioDataService} from '../studio-data/studio-data.service';
import { IntegrationStudioService } from '../integration-studio/integration-studio.service';
import { AlertService } from '../alertmsg/alert-service';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  //testdata
  message = "";
  constructor(private alertService: AlertService,public interfaceData: StudioDataService, private intStudioService : IntegrationStudioService, private router: Router) { }

  ngOnInit() {
    //console.log("sum:",this.interfaceData);
    // this.interfaceData.appData2.subscribe((response) => {console.log("ftp response",response);
    // this.testdata = response})
  }
  submitInterface(interfaceData){
  
   
    this.intStudioService.submitTouchpointData(interfaceData);


  }


  backToEdit(){
    this.intStudioService.showSuccessfulMsg = false
  } 

}
