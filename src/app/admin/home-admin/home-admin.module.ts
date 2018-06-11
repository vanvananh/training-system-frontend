import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeAdminComponent} from './home-admin.component';
import {Routes, RouterModule} from '@angular/router';

const homeRoutes: Routes = [
  {path: '', redirectTo: 'index', pathMatch: 'full'},
  {path: 'index', component: HomeAdminComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [HomeAdminComponent]
})
export class HomeAdminModule {
}
