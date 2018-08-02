import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSpecificationComponent } from './api-specification.component';

describe('ApiSpecificationComponent', () => {
  let component: ApiSpecificationComponent;
  let fixture: ComponentFixture<ApiSpecificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSpecificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSpecificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
