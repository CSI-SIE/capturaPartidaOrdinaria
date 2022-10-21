import { TestBed } from '@angular/core/testing';

import { PanelAdminResolver } from './panel-admin.resolver';

describe('PanelAdminResolver', () => {
  let resolver: PanelAdminResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PanelAdminResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
