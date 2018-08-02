import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GlobalModule } from '@global/global.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout.component';
import { IntegrationStudioComponent } from './integration-studio/integration-studio.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TouchpointComponent } from './touchpoint/touchpoint.component';
import { EntitiesComponent } from './touchpoint/entities/entities.component';
import { EndpointComponent } from './touchpoint/endpoint/endpoint.component';
import { EndpointFtpComponent } from './touchpoint/endpoint-ftp/endpoint-ftp.component';
import { EndpointApiComponent } from './touchpoint/endpoint-api/endpoint-api.component';
import { EndpointReviewComponent } from './touchpoint/endpoint-review/endpoint-review.component';
import { IntegrateComponent } from './touchpoint/integrate/integrate.component';
import { GeneralComponent } from './touchpoint/general/general.component'
import { HeadernavComponent } from './common/headernav/headernav.component';
import { InterfaceSubscriptionComponent } from './interface-subscription/interface-subscription.component';
import { SummaryComponent } from './summary/summary.component';
import { ApiSummaryComponent } from './api-summary/api-summary.component';
import { SidenavComponent } from './common/sidenav/sidenav.component';
import { FilterPipe } from './touchpoint/pipes';
import {NgxPaginationModule} from 'ngx-pagination';
import { StudioDataService } from './studio-data/studio-data.service';
import { IntegrationStudioService } from './integration-studio/integration-studio.service';
import { ApiDataService } from './api-data/api-data.service';
import { ApiConfigService } from './api-configuration/api-config/api-config.service';
import { ZdocConfigService } from './zdoc-configuration/zdoc-config/zdoc-config.service';
import { ZdocDataService } from './zdoc-data/zdoc-data.service';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';
import { CronEditorModule } from 'cron-editor/cron-editor';
import {MultiSelectModule} from 'primeng/multiselect';
import { ApiSpecificationComponent } from "./api-specification/api-specification.component";
import { ApiConfigurationComponent } from "./api-configuration/api-configuration.component";
import { ApiSubscriptionComponent } from "./api-subscription/api-subscription.component";
import { AlertmsgComponent } from './alertmsg/alertmsg.component';
import { AlertService } from './alertmsg/alert-service';
import { ZdocSubscriptionComponent } from './zdoc-subscription/zdoc-subscription.component';
import { ZdocConfigurationComponent } from './zdoc-configuration/zdoc-configuration.component';
import { ZdocSummaryComponent } from './zdoc-summary/zdoc-summary.component';
import { NgUploaderModule } from 'ngx-uploader';




const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          {
            path: 'integration-studio',
            component: IntegrationStudioComponent,
          },
          {
            path: 'integration-studio/interface-subscription',
            component: InterfaceSubscriptionComponent,
            data: {
              breadcrumb: "interface-subscription"
            }
          },
          {
            path: 'integration-studio/summary',
            component: SummaryComponent,
            data: {
              breadcrumb: "summary"
            }
          },
        ]

      },
      {
        path: 'api-specification',
        component: ApiSpecificationComponent,
        data: {
          breadcrumb: "api specification"
        }
      },
      {
        path: 'api-configuration',
        component: ApiConfigurationComponent,
        data: {
          breadcrumb: "api-configuration"
        }
      },
      {
        path: 'api-configuration/api-subscription',
        component: ApiSubscriptionComponent,
        data: {
          breadcrumb: "api-subscription"
        }
      },
      {
        path: 'api-configuration/summary',
        component: ApiSummaryComponent,
        data: {
          breadcrumb: "summary"
        }
      },
      {
        path: 'zdoc-configuration',
        component: ZdocConfigurationComponent,
        data: {
          breadcrumb: "zdoc-configuration"
        }
      },
      {
        path: 'zdoc-configuration/zdoc-subscription',
        component: ZdocSubscriptionComponent,
        data: {
          breadcrumb: "zdoc-subscription"
        }
      },
      {
        path: 'zdoc-configuration/summary',
        component: ZdocSummaryComponent,
        data: {
          breadcrumb: "summary"
        }
      },
      
      // {
      //   path: '**',
      //   redirectTo: 'dashboard'
      // }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    // NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    GlobalModule,
    NgxPaginationModule,
    HttpClientModule,
    BreadcrumbModule,
    CronEditorModule,
    MultiSelectModule,
    NgUploaderModule
   
  ],
  exports: [RouterModule],
  declarations: [ ZdocSummaryComponent, ZdocConfigurationComponent, ZdocSubscriptionComponent, ApiSummaryComponent, ApiConfigurationComponent,ApiSubscriptionComponent, ApiSpecificationComponent,InterfaceSubscriptionComponent,SummaryComponent,LayoutComponent,EndpointFtpComponent, IntegrationStudioComponent, DashboardComponent, HeadernavComponent, SidenavComponent, TouchpointComponent, EntitiesComponent, EndpointComponent, IntegrateComponent,FilterPipe, AlertmsgComponent ],
  providers: [StudioDataService , IntegrationStudioService , AlertService, ApiDataService, ApiConfigService, ZdocConfigService, ZdocDataService]
})
export class AuthRoutingModule { }
