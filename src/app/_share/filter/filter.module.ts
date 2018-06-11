import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilterComponent} from './filter.component';
import {MultiselectDropdownModule} from '../dropdown/dropdown.module';
import {FormsModule} from '@angular/forms';
import {Daterangepicker} from '../daterangepiker/daterangepicker.module';

@NgModule({
  imports: [CommonModule, MultiselectDropdownModule, FormsModule, Daterangepicker],
  declarations: [FilterComponent],
  exports: [FilterComponent]
})
export class FilterModule {
}
