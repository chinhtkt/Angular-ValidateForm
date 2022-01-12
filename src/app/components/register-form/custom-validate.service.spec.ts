import { TestBed } from '@angular/core/testing';

import { CustomValidateService } from './custom-validate.service';

describe('CustomValidateService', () => {
  let service: CustomValidateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomValidateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
