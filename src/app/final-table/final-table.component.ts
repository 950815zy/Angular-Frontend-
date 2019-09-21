import { Component, OnInit, Input } from '@angular/core';
import { GetResourceRequestService, DeliverTableService } from 'src/app/service/get-resource-request.service';
import { Resource } from 'src/app/Model/Resource';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ViewChild, AfterViewInit } from '@angular/core';
import { FormulaCheckboxComponent } from '../formula-checkbox/formula-checkbox.component';
import { Subscription } from 'rxjs';
import { ProjectList } from '../Model/ProjectList';
FormulaCheckboxComponent

@Component({
  selector: 'app-final-table',
  templateUrl: './final-table.component.html',
  styleUrls: ['./final-table.component.css']
})
export class FinalTableComponent  implements OnInit{
  subscription: Subscription;
  wholeTable: object[][] = [];
  sub : Subscription;
  columnList : string[];
  currentProjectTitle = 'no project selected';

    constructor( private getdeliver : DeliverTableService){
    }
    
    ngOnInit(){
        this.subscription = this.getdeliver.deleverCol$.subscribe(
          colList => {this.columnList = colList});
        this.sub = this.getdeliver.deliverAnnounced$.subscribe(
          table => {this.wholeTable = table});      
    }

    dealPidChange(proj: ProjectList){
      this.currentProjectTitle = proj.project_name;
      console.log(proj.resourceCode);
    }
  }
