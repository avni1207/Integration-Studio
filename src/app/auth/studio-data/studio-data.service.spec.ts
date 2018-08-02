import { TestBed, inject } from '@angular/core/testing';

import { StudioDataService } from './studio-data.service';

describe('StudioDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudioDataService]
    });
  });

  it('should be created', inject([StudioDataService], (service: StudioDataService) => {
    expect(service).toBeTruthy();
  }));
});
