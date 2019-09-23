import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ProjectList } from '../Model/ProjectList';
import { GetRequestService } from '../service/get-request.service';
import { Resource } from '../Model/Resource';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
    
  constructor(private getservice: GetRequestService) { }
  selection :  Array<Resource> =[];
  pid = 1;
  resourceListAll: Resource[];
  errorMessage: string;
  @Input() id=1;
  resourceListByProject: Resource[];
  wholeTableByProject: object[] = [];
  requestResourceByProjectURL = 'http://192.168.1.172:8080/Project1/res/displayByProjectId/';
  requestResourceAll = 'http://192.168.1.172:8080/Project1/res/displayResources';
  columnlist: string[];


  ngOnInit() {
    this.displayTableByProject();
    this.displayTableAll();

  }

  // ngOnChanges(changes: SimpleChanges){
  //   // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
  //   // Add '${implements OnChanges}' to the class.
  //   for(let propname in changes) {
  //     if(propname === 'pid') {
  //       this.id = changes[propname].currentValue;
  //     }
  //   }
  //   if (this.id) {
  //     this.displayTableByProject(this.id);
  //   }
  // }

  displayTableByProject(id?: number) {
    if (id === undefined) { id = this.id; }
    this.getservice.getResponse(this.requestResourceByProjectURL + '/' + id).subscribe(
      (data: Resource[]) => {
        this.resourceListByProject = data; console.log(data); this.columnlist = Object.keys(data[0]);
      },
      (error) => this.errorMessage = error
    );
  }


  displayTableAll() {
    this.getservice.getResponse(this.requestResourceAll).subscribe(
      (data: Resource[]) => {
        this.resourceListAll = data;
      },
      (error) => this.errorMessage = error
    );
  }
  
  dealPidChange(proj: ProjectList) {
    this.pid = proj.pid;
    this.displayTableByProject(this.pid);
  }

  toggleSelection(col) {
    
    let result = this.resourceListByProject.map(a => a.name);
    // let idx = this.selection.indexOf(this.search(col,this.resourceListAll));
    if(!result.includes(col)){
      this.selection.push(this.search(col,this.resourceListAll));   }
    // else{
    //   this.selection.splice(idx,1);
    // }
  } 

  move(){
    this.resourceListByProject=this.resourceListByProject.concat(this.selection);
  }

  search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].name === nameKey) {
            return myArray[i];
        }
    }
  } 
}
