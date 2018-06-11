import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoryQuestionComponent} from './categoryquestion.component';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../_core/service/data.service';
import {Routes, RouterModule} from '@angular/router';
import {Ng2TableModule} from '../../_share/table-directives/ng-table-module';
import {ModalModule} from 'ngx-bootstrap';
import { CategoryquestionDetailComponent } from './categoryquestion-detail/categoryquestion-detail.component';


const routes: Routes = [
  {path: '', redirectTo: 'view', pathMatch: 'full'},
  {path: 'view', component: CategoryQuestionComponent},
  {path: 'categoryquestion-detail/:id', component: CategoryquestionDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    RouterModule.forChild(routes),
    Ng2TableModule
  ],
  declarations: [CategoryQuestionComponent, CategoryquestionDetailComponent],
  providers: [DataService]
})

export class CategoryQuestionModule {
}
