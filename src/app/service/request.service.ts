import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetResourceRequestService, DeliverTableService } from './get-resource-request.service';
import { ProjectList } from '../Model/ProjectList';
import { Resource } from '../Model/Resource';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private getservice: GetResourceRequestService, private getdeliver: DeliverTableService, private http: HttpClient) { }

  projectList: ProjectList[];
  resourceList: Resource[];
  allColumnList: string[];
  displayedColumnList: string[];
  currentPid: number;
  wholeTable: object[] = [];
  wholeTableByProject: {pid: number, columns: object[], wholetable: object[]}[] = [];
  wholeTableByProjectElement: object[] = [];
  displayedWholeTableByProject: object[] = [];

  subscription: Subscription;

  private wholeTableSubject = new BehaviorSubject([]);
  deliverWholeTable$ = this.wholeTableSubject.asObservable();

  finalTable: string[];

  errorMessage: string;
  targetURL = 'http://192.168.1.172:8080/Project1';
  requestColumnURL = this.targetURL + '/res/getColumnNames';
  requestWholeURL = this.targetURL + '/res/displayWhole';
  requestProjectURL = this.targetURL + '/project/display';

  ngOnInit() {
    this.subscription = this.getdeliver.deliverAnnounced$.subscribe(
      table => {this.finalTable = table; });
}

  setGlobalProperties(){
    this.displayedColumnList = this.allColumnList;
    this.displayedWholeTableByProject = this.wholeTable;
  }

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

  startDeliverTable(){
    this.getColumn();
  }

  deliverTable(){
    this.wholeTableSubject.next(this.wholeTableByProject);
  }

  getColumn() {
    this.getservice.getResponse(this.requestColumnURL).subscribe(
      (data: string[]) => {
        this.allColumnList = data;
        // console.log(this.columnlist);
        this.getWhole();
      },
      (error) => {this.errorMessage = error; }
    );
  }

  getWhole() {
    this.getservice.getResponse(this.requestWholeURL).subscribe(
      (data: Resource[]) => {
        this.resourceList = data;
        // console.log(this.resourceList);
        this.makeTable();
        this.getProject();
      },
      (error) => {this.errorMessage = error; }
    );
  }

  makeTable() {
    for (const row of this.resourceList) {
      const rowcnt: object[] = [];

      rowcnt['name'] = row.name;
      rowcnt['cost_code'] = row.cost_code;
      for (const columnpair of row.columns) {
        rowcnt[columnpair[0]] = columnpair[1];
      }

      this.wholeTable.push(rowcnt);
    }
  }

  getProject() {
    this.getservice.getResponse(this.requestProjectURL).subscribe(
      (data: ProjectList[]) => {
        this.projectList = data;
        this.makeWholeByProject();
        this.setGlobalProperties();
        this.deliverTable();
      }
    );
  }

  makeWholeByProject() {
    for (const proj of this.projectList) {

      const thistable: object[] = [];
      for (const projcode of proj.resources) {
        const row = this.wholeTable.find(thisrow => thisrow['cost_code'] === projcode.cost_code);
        if (row) {
          thistable.push(row);
        }
      }

      const columns = proj.columns;

      this.wholeTableByProject.push({pid: proj.pid, columns, wholetable: thistable});
    }
  }

  

  

}
