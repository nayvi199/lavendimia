import { TestBed } from '@angular/core/testing';

import { ConfiguracionServiceService } from './configuracion-service.service';

describe('ConfiguracionServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfiguracionServiceService = TestBed.get(ConfiguracionServiceService);
    expect(service).toBeTruthy();
  });
});
