import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdocConfigurationComponent } from './zdoc-configuration.component';

describe('ZdocConfigurationComponent', () => {
  let component: ZdocConfigurationComponent;
  let fixture: ComponentFixture<ZdocConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZdocConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZdocConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
