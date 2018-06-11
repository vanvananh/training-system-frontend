import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {path: '', redirectTo: 'tranning-system', pathMatch: 'full'},
  {path: 'user', loadChildren: './user/user.module#UserModule'},
  {path: 'tranning-system', loadChildren: './admin/admin.module#AdminModule'}
];
