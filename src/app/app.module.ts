import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';


import {AppComponent} from './app.component';
import {appRoutes} from './app.routes';
import {NotificationService} from './_core/service/notification.service';
import {CustomInterceptor, DataService} from './_core/service/data.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(appRoutes, {useHash: true}),
    FormsModule,
    HttpClientModule
  ],
  providers: [NotificationService,
    [DataService, {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomInterceptor,
      multi: true,
    }]],
  bootstrap: [AppComponent]
})
export class AppModule {
}
