import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointFtpComponent } from './endpoint-ftp.component';

describe('EndpointFtpComponent', () => {
  let component: EndpointFtpComponent;
  let fixture: ComponentFixture<EndpointFtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointFtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointFtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
