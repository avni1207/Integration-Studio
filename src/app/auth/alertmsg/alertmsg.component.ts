import { Component, OnInit } from '@angular/core';
import { Alert, AlertType } from '../alertmsg/alert';
import { AlertService } from './alert-service'

@Component({
  selector: 'alert',
  templateUrl: './alertmsg.component.html',
  styleUrls: ['./alertmsg.component.scss']
})

export class AlertmsgComponent {
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            // add alert to array
            this.alerts.push(alert);
            // Hide alert after 4 seconds
            setTimeout(() => { this.alerts = [];},4000);
            
        });
    }

    removeAlert(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }

    cssClass(alert: Alert) {
        
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
            case AlertType.Info:
                return 'alert alert-info';
            case AlertType.Warning:
                return 'alert alert-warning';
        }
    }
}
