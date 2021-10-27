import { Injectable } from "@angular/core";

import {
  HttpClient,
  HttpParams,
  HttpEventType,
  HttpEvent,
  HttpResponse,
  HttpProgressEvent,
} from '@angular/common/http';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(payload: any) {
    return this.http
      .post(`${environment.baseURL}/auth/token`, payload)
      .toPromise();
  }
}