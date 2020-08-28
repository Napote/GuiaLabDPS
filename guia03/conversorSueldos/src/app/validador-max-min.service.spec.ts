import { TestBed } from '@angular/core/testing';

import { ValidadorMaxMinService } from './validador-max-min.service';

describe('ValidadorMaxMinService', () => {
  let service: ValidadorMaxMinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidadorMaxMinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
