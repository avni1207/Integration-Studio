import { Component, OnInit } from '@angular/core';
import { Dispatcher } from '../dispatcher';

@Component({
  selector: 'app-endpoint-api',
  templateUrl: './endpoint-api.component.html',
  styleUrls: ['./endpoint-api.component.scss']
})
export class EndpointApiComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    Dispatcher.subscribe((event: any) => {
      if(event.type == 'ConfigData') {
        //console.log("API",event.data);
      }
  })
  }

}
