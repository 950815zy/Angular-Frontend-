import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) { }

  get(url: string, pathparam?: string) {
    let requrl = url;
    if (pathparam !== undefined) {
      requrl += pathparam;
      }
    // this.http.get<T>(requrl).subscribe(
    //   (data: T) => {result = data; console.log(result); },
    //   error => {console.log(error); result = null; }
    // );

    return this.http.get(requrl);
  }


}
