import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../model/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts$: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  alerts: Alert[];

  constructor() {
    this.alerts$.subscribe((data: Alert[]) => this.alerts = data);
    console.log(this.alerts);
    // if (this.alerts) {
    //   this.alerts.forEach(element => {
    //     element.interval.subscribe(() => {
    //       console.log(this.alerts.indexOf(element));
    //       const obj = this.alerts.find(o => o.id = element.id);
    //       console.log(obj);
    //       this.alerts = this.alerts.splice(this.alerts.indexOf(obj), 1);
    //       // delete this.alerts[this.alerts.indexOf(obj)]
    //       console.log(this.alerts);
    //       this.alerts$.next(this.alerts);
    //     });
    //   });
    //   console.log(this.alerts);
    // }

   }


  addAlert(error: Alert) {
    this.setTimer(error);
    this.alerts$.next([...this.alerts$.getValue(), error]);
    // const alerts = this.alerts$.getValue();
    // alerts.push(error);
    // this.alerts$.next(alerts);
  }

  setTimer(obj: Alert) {
    obj.timer.subscribe(() => {
      const i = this.alerts.findIndex(({id}) => id = obj.id);
      console.log(i);
      this.alerts = this.alerts.filter((_, index) => index !== i);
      console.log(this.alerts);
      this.alerts$.next(this.alerts);
    });
  }


}
