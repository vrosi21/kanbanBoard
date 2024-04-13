import { TestBed } from '@angular/core/testing';

import { NewWorkspaceTemplateService } from './new-workspace-template.service';

describe('NewWorkspaceTemplateService', () => {
  let service: NewWorkspaceTemplateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewWorkspaceTemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
