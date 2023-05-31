import { TestBed } from '@angular/core/testing';

import { MovieApiServicesService } from './movie-api-services.service';

describe('MovieApiServicesService', () => {
  let service: MovieApiServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieApiServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
