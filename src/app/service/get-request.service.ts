import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetRequestService {

  constructor(private http: HttpClient) { }

  getResponse(configUrl: string, id?: number) {
    if (id === undefined) {
      return this.http.get(configUrl);
    } else {
      return this.http.get(configUrl + id);
    }
  }

}



