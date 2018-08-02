import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
//import { EndpointFtpComponent } from './touchpoint/endpoint-ftp/endpoint-ftp.component';
import { EndpointApiComponent } from './touchpoint/endpoint-api/endpoint-api.component';
import { EndpointReviewComponent } from './touchpoint/endpoint-review/endpoint-review.component';
import { GeneralComponent } from './touchpoint/general/general.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    NgbModule.forRoot(),


  ],
  declarations: [EndpointApiComponent, EndpointReviewComponent, GeneralComponent]
})
export class AuthModule { }
