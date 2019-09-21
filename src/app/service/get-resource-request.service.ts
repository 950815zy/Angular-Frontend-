import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject,BehaviorSubject }    from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetResourceRequestService {

  constructor(private http: HttpClient) { }

  getResponse(configUrl: string, id?: number) {
    if (id === undefined) {
      return this.http.get(configUrl);
    } else {
      return this.http.get(configUrl + id);
    }
  }

}

export class DeliverTableService {
  private resultTable = new BehaviorSubject([]);
  private colName = new BehaviorSubject([]);
  private pName = new BehaviorSubject<string>("");
  
  deliverAnnounced$ = this.resultTable.asObservable();
  deleverCol$ = this.colName.asObservable();
  delieverPid$ = this.pName.asObservable();

  announceDeliver(table){
    this.resultTable.next(table);
  }
  colDeliver(colList) {
    this.colName.next(colList);
  }

  pidDeliver(pid){
    this.pName.next(pid);
  }
}



