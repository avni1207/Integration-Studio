import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Dispatcher } from '../dispatcher';
import { Router,ActivatedRoute } from '@angular/router';
import { TouchpointService } from '../touchpoint.service';
import{ AppState } from '../shared.service'
import { Subscription }   from 'rxjs/Subscription';


@Component({
  selector: 'app-endpoint-ftp',
  templateUrl: './endpoint-ftp.component.html',
  styleUrls: ['./endpoint-ftp.component.scss'],
  //providers:[ AppState ]
})
export class EndpointFtpComponent implements OnInit {

  public testdata = {};
  constructor( private route: ActivatedRoute,private appState: AppState ) {
    //this.data = this.appState.getData();
    //console.log("entity daaaaaaaaaaaattaa",this.data);

  }
  data: any;

  public ftpfield: boolean;
  public ftpdata = {
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
  }

  ngOnInit() {


    /*Dispatcher.subscribe((event: any) => {
        if(event.type == 'ConfigData') {
         
         // console.log("ftp entitydata", event.data);
          this.ftpfield = event.data.direction == 'outbound';
          //console.log("ftp entitydata", this.ftpfield);
        }
      })*/

}

  onSubmit(val){
   this.appState.formdata$.subscribe(
      ddata => {
         //console.log("EntityFtpdataaaa",ddata);
      }
    );
    //console.log("ftp daaaaaaata",val)

  }
}
