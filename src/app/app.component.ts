import { Component } from '@angular/core';
import { RequestService } from './service/request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project';
  constructor(private requestservice: RequestService){}

  ngOnInit() {
    this.requestservice.startDeliverTable();
  }
}
