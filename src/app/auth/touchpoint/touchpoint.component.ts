import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Dispatcher } from './dispatcher';
import { TouchpointService } from './touchpoint.service';
import{ AppState } from './shared.service'

@Component({
  selector: 'app-touchpoint',
  templateUrl: './touchpoint.component.html',
  styleUrls: ['./touchpoint.component.scss'],
  providers:[TouchpointService,AppState],

})
export class TouchpointComponent implements OnInit {

public touchpointData = {
  configData: {},
  summaryData: {}
}
constructor(private store : TouchpointService,private appState: AppState ) { }
  ngOnInit() {
  Dispatcher.subscribe((event: any) => {
      if(event.type == 'ConfigData') {
        //console.log("touchpoints data entity",event.data);
        //this.store.addTouchpointsData(event.data);
      }
    })
  }

}
