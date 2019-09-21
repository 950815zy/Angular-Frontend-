import { Component, OnInit, Input } from '@angular/core';
import { GetResourceRequestService, DeliverTableService } from 'src/app/service/get-resource-request.service';
import { Resource } from 'src/app/Model/Resource';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Subscription } from 'rxjs';
import { ProjectList } from '../Model/ProjectList';

interface rowObj {
  Field? : string,
  Type? : string,
  Formula? : string
};



@Component({
  selector: 'app-formula-checkbox',
  templateUrl: './formula-checkbox.component.html',
  styleUrls: ['./formula-checkbox.component.css']
})

export class FormulaCheckboxComponent implements OnInit {
  resourceList: Resource[];
  columnlist: string[];
  wholeTable: object[][] = [];
  selection = [];
  errorMessage: string;
  currentProjectTitle = 'no project selected';
  // show_me:boolean = true;
  // buttonName:any = 'Show';
  // element: HTMLElement;
  rowData = [{
    Field : '',
    Type : '',
    Formula : ''
  }];

  requestColumnURL = 'http://192.168.1.2:8080/Project1/res/getColumnNames';
  requestWholeURL = 'http://192.168.1.2:8080/Project1/res/displayWhole';
  subscription: Subscription;

  ngOnInit(): void { 
  // handleResource()  
    this.getColumn();
  }
  
  constructor(private getservice: GetResourceRequestService, 
    private getdeliver : DeliverTableService){
  }

  getColumn(){
    this.getservice.getResponse(this.requestColumnURL).subscribe(
      (data: string[]) => {
        this.columnlist = data;
        // console.log(this.columnlist);
        this.getWhole();
      },
      (error) => {this.errorMessage = error; }
    );
  }

  getWhole(){
    this.getservice.getResponse(this.requestWholeURL).subscribe(
      (data: Resource[]) => {
        this.resourceList = data;
        // console.log(this.resourceList);
        this.makeTable();
      },
      (error) => {this.errorMessage = error; }
    );
  }

  makeTable(){
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
  
  toggleSelection(col) {
    let idx = this.selection.indexOf(col);

    if(idx === -1 ){
      this.selection.push(col);
    }
    else{
      this.selection.splice(idx,1);
    }
  } 

  saveSelection(){
    for(let i = 0; i < this.rowData.length; i++){
      this.selection.push(this.rowData[i].Field);
    }
    return this.selection;
    
  }

  announce() {
    this.getdeliver.colDeliver(this.selection);
  }

  announceTable() {
    this.getdeliver.announceDeliver(this.wholeTable);
  }

  toggle(){
    this.rowData.push({Field:'',Type:'',Formula:''});
  }



  
  // submit() {
  //   this.res.push(this.tcode,this.tcode2);
  //   return(this.res);
  // }

  // allCol() {
  //   this.res = this.saveSelection().concat(this.submit());
  //   console.log (this.res);
  // }

  callall(){
    this.saveSelection();
    this.announce();
    this.announceTable();
  }


  dealPidChange(proj: ProjectList){
    this.getdeliver.pidDeliver(proj.project_name);
    this.currentProjectTitle = proj.project_name;
    let codeInProj = proj.resourceCode.map(a => a.cost_code);
    this.resourceList = this.resourceList.filter(obj => {return codeInProj.includes(obj.cost_code)});
    this.makeTable();
  
  }

}