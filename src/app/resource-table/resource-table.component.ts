import { Component, OnInit } from '@angular/core';
import { GetRequestService } from '../service/get-request.service';
import { Resource } from '../Model/Resource';


@Component({
  selector: 'app-resource-table',
  templateUrl: './resource-table.component.html',
  styleUrls: ['./resource-table.component.css']
})
export class ResourceTableComponent implements OnInit {

  constructor(private getservice: GetRequestService) { }


  resourceListAll: Resource[];
  columnlist: string[] = ['cost_code', 'name'];

  errorMessage: string;

  requestResourceAll = 'http://192.168.1.172:8080/Project1/res/displayResources';

  ngOnInit(): void {
    this.displayTableAll();
  }

  displayTableAll() {
    this.getservice.getResponse(this.requestResourceAll).subscribe(
      (data: Resource[]) => {
        this.resourceListAll = data;
      },
      (error) => this.errorMessage = error
    );
  }

}
