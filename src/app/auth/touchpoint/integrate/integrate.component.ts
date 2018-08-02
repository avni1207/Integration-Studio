import { Component, OnInit } from '@angular/core';
import { TouchpointService } from '../touchpoint.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Dispatcher } from '../dispatcher';


@Component({
  selector: 'app-integrate',
  templateUrl: './integrate.component.html',
  styleUrls: ['./integrate.component.scss'],
  providers:[TouchpointService],

})
export class IntegrateComponent implements OnInit {
  closeResult: string;
  constructor(private store : TouchpointService ,private modalService: NgbModal) { }
  public summarydata = {
    "activateEmailNotification": true,
    "notificationEmailAddress": '',
    "notificationEmailSubject": '',
    "active": true,
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


  ngOnInit() {
  /*  Dispatcher.subscribe((event: any) => {
      if(event.type == 'ConfigData') {
        console.log("Integrate entitydata", event.data);
      }
    })*/
  }

}
