import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataService} from '../../_core/service/data.service';
import {Ng2TableModule} from '../../_share/table-directives/ng-table-module';
import {ModalModule} from 'ngx-bootstrap';
import {QuestionComponent} from './question.component';
import {QuestionNewComponent} from './question-new/question-new.component';
import {MultiselectDropdownModule} from '../../_share/dropdown/dropdown.module';
import {FilterModule} from '../../_share/filter/filter.module';
import { UploadService } from '../../_core/service/upload.service';

const routes: Routes = [
  {path: '', redirectTo: 'view', pathMatch: 'full'},
  {path: 'view', component: QuestionComponent},
  {path: 'new', component: QuestionNewComponent}
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
    Ng2TableModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    FilterModule
  ],
  declarations: [QuestionComponent, QuestionNewComponent],
  providers: [DataService,UploadService],
  entryComponents: []
})
export class QuestionModule {
}
