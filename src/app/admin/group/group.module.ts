import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GroupComponent} from './group.component';
import {DataService} from '../../_core/service/data.service';
import {Ng2TableModule} from '../../_share/table-directives/ng-table-module';
import {ModalModule} from 'ngx-bootstrap';

import {GroupDetailComponent} from './group-detail/group-detail.component';
import {MultiselectDropdownModule} from '../../_share/dropdown/dropdown.module';
import {FilterModule} from '../../_share/filter/filter.module';

const routes: Routes = [
  {path: '', redirectTo: 'view', pathMatch: 'full'},
  {path: 'view', component: GroupComponent},
  {path: 'group-detail/:id', component: GroupDetailComponent}
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
  declarations: [GroupComponent, GroupDetailComponent],
  providers: [DataService]
})
export class GroupModule {

}
