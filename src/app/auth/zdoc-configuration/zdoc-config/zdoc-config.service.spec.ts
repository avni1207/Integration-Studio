import { TestBed, inject } from '@angular/core/testing';

import { ZdocConfigService } from './zdoc-config.service';

describe('ZdocConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZdocConfigService]
    });
  });

  it('should be created', inject([ZdocConfigService], (service: ZdocConfigService) => {
    expect(service).toBeTruthy();
  }));
});
