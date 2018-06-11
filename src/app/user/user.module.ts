import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserComponent} from './user.component';
import {userRoutes} from './user.routes';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(userRoutes),
  ],
  declarations: [UserComponent],
  providers: []
})

export class UserModule {
}
