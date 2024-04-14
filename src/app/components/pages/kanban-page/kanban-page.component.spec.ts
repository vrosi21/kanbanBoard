import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanPageComponent } from './kanban-page.component';

describe('KanbanPageComponent', () => {
  let component: KanbanPageComponent;
  let fixture: ComponentFixture<KanbanPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KanbanPageComponent]
    });
    fixture = TestBed.createComponent(KanbanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
