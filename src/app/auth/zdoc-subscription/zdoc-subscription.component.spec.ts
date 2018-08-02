import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZdocSubscriptionComponent } from './zdoc-subscription.component';

describe('ZdocSubscriptionComponent', () => {
  let component: ZdocSubscriptionComponent;
  let fixture: ComponentFixture<ZdocSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZdocSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZdocSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
