import { Component, OnInit } from '@angular/core';
import { ZdocConfigService } from '../zdoc-configuration/zdoc-config/zdoc-config.service';

@Component({
  selector: 'app-api-specification',
  templateUrl: './api-specification.component.html',
  styleUrls: ['./api-specification.component.scss']
})
export class ApiSpecificationComponent implements OnInit {

  constructor(private zdocConfigservice : ZdocConfigService) { }

  ngOnInit() {
    
  }

}
