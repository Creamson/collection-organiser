import { TestBed, inject } from '@angular/core/testing';

import { GoogleAuthService } from './google-auth.service';

describe('GoogleAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAuthService]
    });
  });

  it('should ...', inject([GoogleAuthService], (service: GoogleAuthService) => {
    expect(service).toBeTruthy();
  }));
});
