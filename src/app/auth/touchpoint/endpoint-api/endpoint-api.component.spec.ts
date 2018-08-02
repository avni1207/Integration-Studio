import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointApiComponent } from './endpoint-api.component';

describe('EndpointApiComponent', () => {
  let component: EndpointApiComponent;
  let fixture: ComponentFixture<EndpointApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
