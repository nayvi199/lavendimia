import { TestBed } from '@angular/core/testing';

import { ServiceLService } from './service-l.service';

describe('ServiceLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceLService = TestBed.get(ServiceLService);
    expect(service).toBeTruthy();
  });
});
