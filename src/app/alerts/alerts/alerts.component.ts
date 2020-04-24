import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/model/alert.model';
import { AlertService } from './../../service/alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  alerts: Alert[];

  constructor(
    private alertService: AlertService
  ) {  }

  ngOnInit(): void {

    this.alertService.alerts$.subscribe((data: Alert[]) => this.alerts = data);
    console.log(this.alerts);

  }

  // onChange() {
  //   console.log(this.alerts);
  //   this.alertService.onChange();
  // }

}
