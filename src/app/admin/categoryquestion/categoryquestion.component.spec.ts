import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryquestionComponent } from './categoryquestion.component';

describe('CategoryquestionComponent', () => {
  let component: CategoryquestionComponent;
  let fixture: ComponentFixture<CategoryquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
