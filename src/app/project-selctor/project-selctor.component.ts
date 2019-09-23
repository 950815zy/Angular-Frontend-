import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { RequestService } from '../service/request.service';
import { ProjectList } from '../Model/ProjectList';
import { GetRequestService } from '../service/get-request.service';

@Component({
  selector: 'app-project-selctor',
  templateUrl: './project-selctor.component.html',
  styleUrls: ['./project-selctor.component.css']
})
export class ProjectSelctorComponent implements OnInit {
  @Output() pidChange = new EventEmitter<ProjectList>();

  requestProjectURL = 'http://192.168.1.172:8080/Project1/project/display';
  projectList: ProjectList[];
  selectedProject: ProjectList;

  constructor(private requestservice: RequestService) { }

  ngOnInit() {
    this.getProjectList();
  }

  getProjectList() {
    // this.requestservice.get<ProjectList[]>(this.requestProjectURL, this.projectList);
    this.requestservice.get(this.requestProjectURL).subscribe(
      (data: ProjectList[]) => {this.projectList = data; }
    );
  }

  updateProjectId() {
    this.pidChange.emit(this.selectedProject);
  }
}
