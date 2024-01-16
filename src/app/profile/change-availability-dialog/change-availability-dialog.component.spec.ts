import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAvailabilityDialogComponent } from './change-availability-dialog.component';

describe('ChangeAvailabilityDialogComponent', () => {
  let component: ChangeAvailabilityDialogComponent;
  let fixture: ComponentFixture<ChangeAvailabilityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeAvailabilityDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAvailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
