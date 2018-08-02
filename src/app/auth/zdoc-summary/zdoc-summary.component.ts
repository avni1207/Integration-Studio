import { Component, OnInit } from '@angular/core';
import { ZdocDataService } from '../zdoc-data/zdoc-data.service';
import { Router } from '@angular/router';
import { ZdocConfigService } from '../zdoc-configuration/zdoc-config/zdoc-config.service';


@Component({
  selector: 'app-zdoc-summary',
  templateUrl: './zdoc-summary.component.html',
  styleUrls: ['./zdoc-summary.component.scss']
})
export class ZdocSummaryComponent implements OnInit {

  constructor(private zdocConfigservice : ZdocConfigService, private zdocData : ZdocDataService, private router : Router) { }

  ngOnInit() {
    this.zdocConfigservice.checkIsuser();
  }

  submitZdoc(data){
    this.zdocConfigservice.submitZdocData(data);
  }

}
