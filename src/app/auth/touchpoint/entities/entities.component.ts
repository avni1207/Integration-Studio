import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder , FormControl, FormGroup , Validators  } from '@angular/forms';
import { TouchpointService } from '../touchpoint.service';
import{ AppState } from '../shared.service'
import {Router} from "@angular/router";





@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.scss'],
  //providers:[TouchpointService,AppState]
})
export class EntitiesComponent implements OnInit {
  constructor(private formbuilder : FormBuilder ,  private router: Router,private appState: AppState) { }
  // userform1 : FormGroup;
  //isClassPresent = false;
  //selectedValue = null;
public entitydata = {
    "product": 'tms',
    "entity": 'entity1',
    "direction": 'inbound',
    "action": '',
    "jobName": 'tenantname_interface_description',
    "requestBaseVersion": 'doc1',
    "responseBaseVersion": 'Generic Ack zDoc',
    "specType": 'file',
  }

  Isdirect : boolean;


  ngOnInit() {
    this.Isdirect = true;
  }
  onSelect(value){

    if(value == "inbound"){
        this.Isdirect = true;
        this.entitydata.responseBaseVersion = "Generic Ack zDoc";
      }
   if(value == "outbound"){
       this.Isdirect = false;
       this.entitydata.responseBaseVersion = "Please subscribe to PO_Inbound_Ack seperately";
     }

  }

  onSubmit(value){
  //console.log("entity daaaaata",value);
    if(this.entitydata.specType == "file")
    {
       this.router.navigate(['/auth/touchpoint/entities/ftp']);
    }
    else{
      this.router.navigate(['/auth/touchpoint/entities/api']);
    }
  /*  Dispatcher.emit({
      type: 'ConfigData',
      data: this.entitydata
    })*/

    this.appState.setData(value);

  }

  }
