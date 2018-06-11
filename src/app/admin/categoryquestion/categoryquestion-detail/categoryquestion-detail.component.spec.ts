import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryquestionDetailComponent } from './categoryquestion-detail.component';

describe('CategoryquestionDetailComponent', () => {
  let component: CategoryquestionDetailComponent;
  let fixture: ComponentFixture<CategoryquestionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryquestionDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryquestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
