import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerTableComponent } from './worker-table.component';

describe('WorkerTableComponent', () => {
  let component: WorkerTableComponent;
  let fixture: ComponentFixture<WorkerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
