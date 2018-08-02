import { Component, OnInit } from '@angular/core';
import { ApiConfigService } from '../api-configuration/api-config/api-config.service';
import { ApiDataService } from '../api-data/api-data.service';
import { Router } from '@angular/router';
import { AlertService } from '../alertmsg/alert-service';
import { ZdocConfigService } from '../zdoc-configuration/zdoc-config/zdoc-config.service';

@Component({
  selector: 'app-api-summary',
  templateUrl: './api-summary.component.html',
  styleUrls: ['./api-summary.component.scss']
})
export class ApiSummaryComponent implements OnInit {

  constructor(private alertService: AlertService, private apiConfigservice : ApiConfigService, private apiData : ApiDataService, private router : Router, private zdocConfigservice : ZdocConfigService) { }

  ngOnInit() {
    this.zdocConfigservice.checkIsuser();
  }
  submitApi(apiData){
    this.apiConfigservice.submitApi(apiData);
  }

}
