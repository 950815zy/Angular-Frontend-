
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ResourceWholeTableComponent } from './resource-whole-table/resource-whole-table.component';
import { GetResourceRequestService, DeliverTableService } from './service/get-resource-request.service';
import { FormulaCheckboxComponent } from './formula-checkbox/formula-checkbox.component';
import { CommonModule } from '@angular/common';
import { FinalTableComponent } from './final-table/final-table.component';
// import { ProjectPageComponent } from 'app/united-folder/project-page/project-page.component';

import { DropdownModule } from 'primeng/dropdown';
import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {TableModule} from 'primeng/table';
import {TieredMenuModule} from 'primeng/tieredmenu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ProjectSelctorComponent } from './project-selctor/project-selctor.component';
import { DisplayResourceByProjectComponent } from './display-resource-by-project/display-resource-by-project.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {HttpClientModule} from '@angular/common/http';
import {SplitButtonModule} from 'primeng/splitbutton';
import {DialogModule} from 'primeng/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import {ProgressBarModule} from 'primeng/progressbar';
import { ResourceTableComponent } from './resource-table/resource-table.component';
@NgModule({
  declarations: [
    AppComponent,
    ResourceWholeTableComponent,
    FormulaCheckboxComponent,
    FinalTableComponent,
    ProjectPageComponent,
    ProjectSelctorComponent,
    DisplayResourceByProjectComponent,
    HeaderComponent,
    ProjectSelctorComponent,
    ResourceTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    DropdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    SplitButtonModule,
    ToolbarModule,
    SidebarModule,
    MenuModule,
    TableModule,
    TieredMenuModule
  ],
  providers: [GetResourceRequestService,DeliverTableService],
  bootstrap: [AppComponent]
})
export class AppModule { }
