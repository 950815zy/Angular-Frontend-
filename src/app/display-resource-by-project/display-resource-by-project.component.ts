import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { Resource } from '../Model/Resource';
import { GetRequestService } from '../service/get-request.service';

@Component({
  selector: 'app-display-resource-by-project',
  templateUrl: './display-resource-by-project.component.html',
  styleUrls: ['./display-resource-by-project.component.css']
})
export class DisplayResourceByProjectComponent implements OnInit {

  @Input() id=1;

  constructor(private getservice: GetRequestService) { }

  resourceListByProject: Resource[];
  requestResourceByProjectURL = 'http://192.168.1.172:8080/Project1/res/displayByProjectId/';

  errorMessage: string;
  columnlist: string[];


  ngOnInit() {
    this.displayTableByProject();
  }

  ngOnChanges(changes: SimpleChanges){
    // Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    // Add '${implements OnChanges}' to the class.
    for(let propname in changes) {
      if(propname === 'pid') {
        this.id = changes[propname].currentValue;
      }
    }
    if (this.id) {
      this.displayTableByProject(this.id);
    }
  }

  displayTableByProject(id?: number) {
    if (id === undefined) { id = this.id; }
    this.getservice.getResponse(this.requestResourceByProjectURL + '/' + id).subscribe(
      (data: Resource[]) => {
        this.resourceListByProject = data; console.log(data); this.columnlist = Object.keys(data[0]);
      },
      (error) => this.errorMessage = error
    );
  }

  

}
