import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableDirectivesComponent } from './table-directives.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TableDirectivesComponent],
  exports: [TableDirectivesComponent]
})
export class Ng2TableModule {
}
