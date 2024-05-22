import { TestBed } from '@angular/core/testing';

import { WebsService } from './webs.service';

describe('WebsService', () => {
  let service: WebsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
