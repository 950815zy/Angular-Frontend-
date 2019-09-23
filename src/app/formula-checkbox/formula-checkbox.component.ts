import { Component, OnInit, Input } from '@angular/core';
import { GetResourceRequestService, DeliverTableService } from 'src/app/service/get-resource-request.service';
import { Resource } from 'src/app/Model/Resource';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { THIS_EXPR, collectExternalReferences } from '@angular/compiler/src/output/output_ast';
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
  constructor(private getservice: GetResourceRequestService, 
    private getdeliver : DeliverTableService){}
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
  options : string[];
  requestColumnURL = 'http://192.168.1.172:8080/Project1/res/getColumnNames';
  finalCols = [];

  
  subscription: Subscription;

  ngOnInit(): void { 
  // handleResource()  
    // this.getColumn();
    this.subscription = this.getdeliver.deliverAnnounced$.subscribe(
      data => {this.wholeTable = data; });
    this.subscription = this.getdeliver.deleverCol$.subscribe(
      (colList) => {this.columnlist = colList;});
      this.getColumn();
  }

  getColumn(){
    this.getservice.getResponse(this.requestColumnURL).subscribe(
      (data: string[]) => {
        this.options = data; },
      (error) => {this.errorMessage = error; }
    );
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
    this.selection.forEach(e => {
      this.finalCols = [...this.finalCols, {name: e, editable: false}];
    });

    this.rowData.forEach(e => {
      this.finalCols = [...this.finalCols, {name: e.Field, editable: true, type: e.Type, formula: e.Formula}];
    });

    for(let i = 0; i < this.rowData.length; i++){
      this.selection.push(this.rowData[i].Field);
    }
    return this.selection;
    
  }

  announce() {
    // this.getdeliver.colDeliver(this.selection);
    this.getdeliver.colDeliver(this.finalCols);
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
  
  }

  deleteRow(Field){
    for(let i = 0; i < this.rowData.length; ++i){
        if (this.rowData[i].Field === Field) {
            this.rowData.splice(i,1);
        }
    }
}

}