import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';  
import { DeliverTableService } from '../service/get-resource-request.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  display;

  items: MenuItem[];
  sub : Subscription;
  pname : string;
  constructor(private getdeliver : DeliverTableService) { }

  ngOnInit() {
    this.items = [
      {label: 'Angular.io', icon: 'fa fa-link', url: 'http://angular.io'},
      {label: 'Theming', icon: 'fa fa-paint-brush', routerLink: ['/theming']}
    ];

    this.sub = this.getdeliver.delieverPid$.subscribe (
      pname => {this.pname = pname}
    )
  }

}
