// import { Component, OnInit } from '@angular/core';
// import { GetResourceRequestService, DeliverTableService } from '../service/get-resource-request.service';
// import { Resource } from '../Model/Resource';
// import { Subscription } from 'rxjs';
// import { Papa } from 'ngx-papaparse';
// import { ProjectList } from 'src/app/Model/ProjectList';

// @Component({
//   selector: 'app-resource-whole-table',
//   templateUrl: './resource-whole-table.component.html',
//   styleUrls: ['./resource-whole-table.component.css']
// })

// export class ResourceWholeTableComponent implements OnInit {
//   constructor(private getservice: GetResourceRequestService, private getdeliver : DeliverTableService) { }
//   resourceList: Resource[];
//   currentProjectTitle = 'no project selected';
//   columnlist: string[];
//   wholeTable: object[][] = [];
//   subscription: Subscription;
//   finalTable: string[];
//   errorMessage: string;
//   csvFile: any;
//   strDelimiter : string;
//   papa : Papa;
//   requestColumnURL = 'http://192.168.1.172:8080/Project1/res/getColumnNames';
//   requestWholeURL = 'http://192.168.1.172:8080/Project1/res/displayWhole';
//     ngOnInit(){
//       this.subscription = this.getdeliver.deliverAnnounced$.subscribe(
//       table => {console.log(table); this.finalTable = table});
//       this.getColumn();


//   }


//   getColumn(){
//     this.getservice.getResponse(this.requestColumnURL).subscribe(
//       (data: string[]) => {
//         this.columnlist = data;
//         this.getWhole();
//       },
//       (error) => {this.errorMessage = error; }
//     );
//   }

//   getWhole(){
//     this.getservice.getResponse(this.requestWholeURL).subscribe(
//       (data: Resource[]) => {
//         this.resourceList = data;
//         this.makeTable();
//       },
//       (error) => {this.errorMessage = error; }
//     );
//   }

//   makeTable(){
//     this.wholeTable = [];
//     for(let row of this.resourceList){
//       let rowcnt: object[] = [];
//       for(let columnname of this.columnlist){
//         rowcnt.push({columnname: ''});
//       }
//       rowcnt['name'] = row.name;
//       rowcnt['cost_code'] = row.cost_code;
//       for(let columnpair of row.columns){
//         rowcnt[columnpair[0]] = columnpair[1];
//       }

//       this.wholeTable.push(rowcnt);
//     }
//   }  

//   dealPidChange(proj: ProjectList){
//     this.getdeliver.pidDeliver(proj.project_name);
//     this.currentProjectTitle = proj.project_name;
//     let codeInProj = proj.resourceCode.map(a => a.cost_code);
//     this.resourceList = this.resourceList.filter(obj => {return codeInProj.includes(obj.cost_code)});
//     this.makeTable();
  
//   }  

import { Component, OnInit, Input } from '@angular/core';
import { GetResourceRequestService, DeliverTableService } from '../service/get-resource-request.service';
import { Resource } from '../Model/Resource';
import { Subscription } from 'rxjs';
import { ProjectList } from '../Model/ProjectList';

import { element } from 'protractor';
import { RequestService } from '../service/request.service';

@Component({
  selector: 'app-resource-whole-table',
  templateUrl: './resource-whole-table.component.html',
  styleUrls: ['./resource-whole-table.component.css']
})

export class ResourceWholeTableComponent implements OnInit {

  constructor(private getservice: GetResourceRequestService, private getdeliver: DeliverTableService, private reqeustservice: RequestService) { }

  projectList: ProjectList[];
  resourceList: Resource[];
  allColumnList: string[];
  displayedColumnList: string[];
  currentPid: number;
  wholeTable: object[] = [];
  wholeTableByProject: {pid: number, columns: object[], wholetable: object[]}[] = [];
  wholeTableByProjectElement: object[] = [];
  displayedWholeTableByProject: object[] = [];

  subscription1: Subscription;
  subscription2: Subscription;
  finalTable: string[];

  errorMessage: string;
    ngOnInit() {
        this.subscription1 = this.getdeliver.deliverAnnounced$.subscribe(
          table => {this.finalTable = table; });
        // this.getColumn();
        this.subscription2 = this.reqeustservice.deliverWholeTable$.subscribe();
  }

  setGlobalProperties(){
    this.displayedColumnList = this.allColumnList;
    this.displayedWholeTableByProject = this.wholeTable;
  }

  // getColumn() {
  //   this.getservice.getResponse(this.requestColumnURL).subscribe(
  //     (data: string[]) => {
  //       this.allColumnList = data;
  //       // console.log(this.columnlist);
  //       this.getWhole();
  //     },
  //     (error) => {this.errorMessage = error; }
  //   );
  // }

  // getProject() {
  //   this.getservice.getResponse(this.requestProjectURL).subscribe(
  //     (data: ProjectList[]) => {
  //       this.projectList = data;
  //       this.makeWholeByProject();
  //       this.setGlobalProperties();
  //     }
  //   );
  // }

  // makeWholeByProject() {
  //   for (const proj of this.projectList) {

  //     const thistable: object[] = [];
  //     for (const projcode of proj.resources) {
  //       const row = this.wholeTable.find(thisrow => thisrow['cost_code'] === projcode.cost_code);
  //       if (row) {
  //         thistable.push(row);
  //       }
  //     }

  //     const columns = proj.columns;

  //     this.wholeTableByProject.push({pid: proj.pid, columns, wholetable: thistable});
  //   }
  // }

  // getWhole() {
  //   this.getservice.getResponse(this.requestWholeURL).subscribe(
  //     (data: Resource[]) => {
  //       this.resourceList = data;
  //       // console.log(this.resourceList);
  //       this.makeTable();
  //       this.getProject();
  //     },
  //     (error) => {this.errorMessage = error; }
  //   );
  // }

  // makeTable() {
  //   for (const row of this.resourceList) {
  //     const rowcnt: object[] = [];

  //     rowcnt['name'] = row.name;
  //     rowcnt['cost_code'] = row.cost_code;
  //     for (const columnpair of row.columns) {
  //       rowcnt[columnpair[0]] = columnpair[1];
  //     }

  //     this.wholeTable.push(rowcnt);
  //   }
  // }

  dealPidChange(proj: ProjectList) {
    if (!proj || proj.pid == 0) {
      this.displayedColumnList = this.allColumnList;
      this.displayedWholeTableByProject = this.wholeTable;
      
    } else {
      let displayedContent = this.wholeTableByProject.find(projtable => projtable.pid === proj.pid);
      let commonContent = this.wholeTableByProject.find(projtable => projtable.pid === 0).columns.map(element => element['column_name']);
      this.displayedWholeTableByProject = displayedContent.wholetable;
      this.displayedColumnList = ['cost_code', 'name'];
      this.getdeliver.pidDeliver(proj.project_name);
      this.displayedColumnList = this.displayedColumnList.concat(commonContent)
        .concat(displayedContent.columns.map(element => element['column_name']));
        console.log(this.displayedWholeTableByProject);
    }

  }

  edit(){
    this.getdeliver.announceDeliver(this.displayedWholeTableByProject);
    this.getdeliver.colDeliver(this.displayedColumnList);
  }
}
 

