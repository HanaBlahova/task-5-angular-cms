import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { Alert } from '../model/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alerts$: BehaviorSubject<Alert[]> = new BehaviorSubject<Alert[]>([]);
  alerts: Alert[];

  constructor() {
    this.alerts$.subscribe((data: Alert[]) => this.alerts = data);

  }

  addAlert(error: Alert) {
    this.setTimer(error);
    this.alerts$.next([...this.alerts$.getValue(), error]);
  }

  setTimer(obj: Alert) {
    obj.timer.subscribe(() => {
      this.deleteAlert(obj);
    });
  }

    deleteAlert(obj: Alert) {
      const i = this.alerts.findIndex(({id}) => id = obj.id);
      this.alerts = this.alerts.filter((_, index) => index !== i);
      this.alerts$.next(this.alerts);
    }


}
