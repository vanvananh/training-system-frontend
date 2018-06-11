import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDirectivesComponent } from './table-directives.component';

describe('TableDirectivesComponent', () => {
  let component: TableDirectivesComponent;
  let fixture: ComponentFixture<TableDirectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDirectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
