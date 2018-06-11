import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AdminComponent} from './admin.component';
import {adminRoutes} from './admin.routes';
import {TopMenuComponent} from '../_share/top-menu/top-menu.component';
import {SidebarMenuComponent} from '../_share/sidebar-menu/sidebar-menu.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(adminRoutes)
  ],
  declarations: [AdminComponent, TopMenuComponent,
    SidebarMenuComponent,
  ],
  providers: []
})
export class AdminModule {
}
