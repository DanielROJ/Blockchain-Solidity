import { TestBed } from '@angular/core/testing';

import { BDService } from './bd.service';

describe('BDService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BDService = TestBed.get(BDService);
    expect(service).toBeTruthy();
  });
});
