import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Alert } from '../model/alert.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  url = environment.api.url;

  constructor(
    private alertService: AlertService,
    private http: HttpClient
  ) { }

  get<T>(url: string, params?: any): Observable<T> {
    return this.http.get<T>(url, params).pipe(
      catchError<HttpEvent<T>, Observable<any>>(
        (e: any) => {
          this.alertService.addAlert(new Alert(e.status, e.error.message));
          console.log(e);
          return throwError((e));
        }
      ),
    );
  }

  post(url: string, data: any, other?: any) {
    return this.http.post(url, data, other).pipe(
      catchError(
        e => {
          this.alertService.addAlert(new Alert(e.status, e.error.message));
          console.log(e);
          return throwError((e));
        }
      ),
    );
  }

  put(url: string, data: any, other?: any) {
    return this.http.put(url, data, other).pipe(
      catchError(
        e => {
          this.alertService.addAlert(new Alert(e.status, e.error.message));
          console.log(e);
          return throwError((e));
        }
      ),
    );
  }

  delete(url: string, other?: any) {
    return this.http.delete(url, other).pipe(
      catchError(
        e => {
          this.alertService.addAlert(new Alert(e.status, e.error.message));
          console.log(e);
          return throwError((e));
        }
      ),
    );
  }
}
