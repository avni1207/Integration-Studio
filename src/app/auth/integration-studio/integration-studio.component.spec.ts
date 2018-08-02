import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationStudioComponent } from './integration-studio.component';

describe('IntegrationStudioComponent', () => {
  let component: IntegrationStudioComponent;
  let fixture: ComponentFixture<IntegrationStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
