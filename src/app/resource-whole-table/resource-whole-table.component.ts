import { Component, OnInit } from '@angular/core';
import { GetResourceRequestService, DeliverTableService } from '../service/get-resource-request.service';
import { Resource } from '../Model/Resource';
import { Subscription } from 'rxjs';
import { Papa } from 'ngx-papaparse';
import { ProjectList } from 'src/app/Model/ProjectList';

@Component({
  selector: 'app-resource-whole-table',
  templateUrl: './resource-whole-table.component.html',
  styleUrls: ['./resource-whole-table.component.css']
})

export class ResourceWholeTableComponent implements OnInit {
  constructor(private getservice: GetResourceRequestService, private getdeliver : DeliverTableService) { }
  resourceList: Resource[];
  currentProjectTitle = 'no project selected';
  columnlist: string[];
  wholeTable: object[][] = [];
  subscription: Subscription;
  finalTable: string[];
  errorMessage: string;
  csvFile: any;
  strDelimiter : string;
  papa : Papa;
  requestColumnURL = 'http://192.168.1.2:8080/Project1/res/getColumnNames';
  requestWholeURL = 'http://192.168.1.2:8080/Project1/res/displayWhole';
    ngOnInit(){
      this.subscription = this.getdeliver.deliverAnnounced$.subscribe(
      table => {console.log(table); this.finalTable = table});
      this.getColumn();


  }


  getColumn(){
    this.getservice.getResponse(this.requestColumnURL).subscribe(
      (data: string[]) => {
        this.columnlist = data;
        console.log(this.columnlist);
        this.getWhole();
      },
      (error) => {this.errorMessage = error; }
    );
  }

  getWhole(){
    this.getservice.getResponse(this.requestWholeURL).subscribe(
      (data: Resource[]) => {
        this.resourceList = data;
        console.log(this.resourceList);
        this.makeTable();
      },
      (error) => {this.errorMessage = error; }
    );
  }

  makeTable(){
    this.wholeTable = [];
    for(let row of this.resourceList){
      let rowcnt: object[] = [];
      for(let columnname of this.columnlist){
        rowcnt.push({columnname: ''});
      }
      rowcnt['name'] = row.name;
      rowcnt['cost_code'] = row.cost_code;
      for(let columnpair of row.columns){
        rowcnt[columnpair[0]] = columnpair[1];
      }

      this.wholeTable.push(rowcnt);
    }
  }  

  dealPidChange(proj: ProjectList){
    this.getdeliver.pidDeliver(proj.project_name);
    this.currentProjectTitle = proj.project_name;
    let codeInProj = proj.resourceCode.map(a => a.cost_code);
    this.resourceList = this.resourceList.filter(obj => {return codeInProj.includes(obj.cost_code)});
    this.makeTable();
  
  }  

  edit(){
    this.getdeliver.announceDeliver(this.wholeTable);
    this.getdeliver.colDeliver(this.columnlist);
  }
 
}
