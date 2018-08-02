import { TestBed, inject } from '@angular/core/testing';

import { IntegrationStudioService } from './integration-studio.service';

describe('IntegrationStudioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntegrationStudioService]
    });
  });

  it('should be created', inject([IntegrationStudioService], (service: IntegrationStudioService) => {
    expect(service).toBeTruthy();
  }));
});
