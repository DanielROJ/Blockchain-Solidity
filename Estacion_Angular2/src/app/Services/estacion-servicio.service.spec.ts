import { TestBed } from '@angular/core/testing';

import { EstacionService } from './estacion-servicio.service';

describe('EstacionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstacionService = TestBed.get(EstacionService);
    expect(service).toBeTruthy();
  });
});
