import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DataService} from '../../_core/service/data.service';
import {Routes, RouterModule} from '@angular/router';
import {Ng2TableModule} from '../../_share/table-directives/ng-table-module';
import {AccountDetailComponent} from './account-detail/account-detail.component';
import {ModalModule} from 'ngx-bootstrap';
import {Daterangepicker} from '../../_share/daterangepiker/daterangepicker.module';
import {FilterModule} from '../../_share/filter/filter.module';
import {MultiselectDropdownModule} from '../../_share/dropdown/dropdown.module';


const routes: Routes = [
  {path: '', redirectTo: 'view', pathMatch: 'full'},
  {path: 'view', component: AccountComponent},
  {path: 'account-detail/:id', component: AccountDetailComponent}
];

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    RouterModule.forChild(routes),
    Ng2TableModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    FilterModule
  ],
  declarations: [AccountComponent, AccountDetailComponent],
  providers: [DataService]
})
export class AccountModule {
}
