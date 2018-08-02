import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdocSummaryComponent } from './zdoc-summary.component';

describe('ZdocSummaryComponent', () => {
  let component: ZdocSummaryComponent;
  let fixture: ComponentFixture<ZdocSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZdocSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZdocSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
