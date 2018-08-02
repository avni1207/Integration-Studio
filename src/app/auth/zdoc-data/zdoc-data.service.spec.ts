import { TestBed, inject } from '@angular/core/testing';

import { ZdocDataService } from './zdoc-data.service';

describe('ZdocDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZdocDataService]
    });
  });

  it('should be created', inject([ZdocDataService], (service: ZdocDataService) => {
    expect(service).toBeTruthy();
  }));
});
