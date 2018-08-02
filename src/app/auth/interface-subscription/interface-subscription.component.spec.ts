import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceSubscriptionComponent } from './interface-subscription.component';

describe('InterfaceSubscriptionComponent', () => {
  let component: InterfaceSubscriptionComponent;
  let fixture: ComponentFixture<InterfaceSubscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterfaceSubscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterfaceSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
