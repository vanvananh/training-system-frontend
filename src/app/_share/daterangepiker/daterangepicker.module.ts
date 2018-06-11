import {NgModule} from '@angular/core';
import {DaterangePickerDirective} from './daterangepicker.component';
import {DaterangepickerConfig} from '../../_core/service/config.service';

@NgModule({
  //imports: [FormsModule],
  declarations: [DaterangePickerDirective],
  providers: [DaterangepickerConfig],
  exports: [DaterangePickerDirective]

})
export class Daterangepicker {
}
