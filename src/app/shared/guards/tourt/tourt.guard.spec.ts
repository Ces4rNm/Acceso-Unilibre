import { TestBed } from '@angular/core/testing';

import { TourtGuard } from './tourt.guard';

describe('TourtGuard', () => {
  let guard: TourtGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TourtGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
