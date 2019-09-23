import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulaCheckboxComponent } from './formula-checkbox/formula-checkbox.component';
import { FinalTableComponent } from './final-table/final-table.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import { DisplayResourceByProjectComponent } from './display-resource-by-project/display-resource-by-project.component';
import { HeaderComponent } from './header/header.component';
import { ResourceWholeTableComponent } from './resource-whole-table/resource-whole-table.component';
// import { ProjectPageComponent } from './project-page/project-page.component';

const routes: Routes = [
  {
    path: 'formula',
    component: ResourceWholeTableComponent
  },
  {
    path: 'checkBox',
    component: FormulaCheckboxComponent
  },
  {
    path: 'finalTable',
    component: FinalTableComponent
  },
  {
    path: 'project',
    component: ProjectPageComponent
  },
  {
    path: 'try',
    component: ProjectPageComponent
  }

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule {
  
}