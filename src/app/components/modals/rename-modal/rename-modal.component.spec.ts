import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenameModalComponent } from './rename-modal.component';

describe('RenameModalComponent', () => {
  let component: RenameModalComponent;
  let fixture: ComponentFixture<RenameModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenameModalComponent]
    });
    fixture = TestBed.createComponent(RenameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
