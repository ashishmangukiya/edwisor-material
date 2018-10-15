import { TestBed, inject } from '@angular/core/testing';

import { SeriesHttpService } from './series-http.service';

describe('SeriesHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeriesHttpService]
    });
  });

  it('should be created', inject([SeriesHttpService], (service: SeriesHttpService) => {
    expect(service).toBeTruthy();
  }));
});
