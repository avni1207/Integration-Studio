import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointReviewComponent } from './endpoint-review.component';

describe('EndpointReviewComponent', () => {
  let component: EndpointReviewComponent;
  let fixture: ComponentFixture<EndpointReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
