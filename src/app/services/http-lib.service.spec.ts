import { TestBed } from '@angular/core/testing';

import { HttpLibService } from './http-lib.service';

describe('HttpLibService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpLibService = TestBed.get(HttpLibService);
    expect(service).toBeTruthy();
  });
});
