import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {DataService} from '../../_core/service/data.service';
import {Routes, RouterModule} from '@angular/router';
import {Ng2TableModule} from '../../_share/table-directives/ng-table-module';
import {ModalModule} from 'ngx-bootstrap';
import {ExamComponent} from './exam.component';
import { ExamNewComponent } from './exam-new/exam-new.component';
import {MultiselectDropdownModule} from '../../_share/dropdown/dropdown.module';
import {FilterModule} from '../../_share/filter/filter.module';



const routes: Routes = [
  {path: '', redirectTo: 'view', pathMatch: 'full'},
  {path: 'view', component: ExamComponent},
  {path: 'new', component: ExamNewComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    RouterModule.forChild(routes),
    Ng2TableModule,
    MultiselectDropdownModule,
    FilterModule

  ],
  declarations: [ExamComponent, ExamNewComponent],
  providers: [DataService]
})


export class ExamModule {
}
