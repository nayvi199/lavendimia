import { TestBed } from '@angular/core/testing';

import { ArticuloServiceService } from './articulo-service.service';

describe('ArticuloServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArticuloServiceService = TestBed.get(ArticuloServiceService);
    expect(service).toBeTruthy();
  });
});
