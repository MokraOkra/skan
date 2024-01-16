import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeServicesDialogComponent } from './change-services-dialog.component';

describe('ChangeServicesDialogComponent', () => {
  let component: ChangeServicesDialogComponent;
  let fixture: ComponentFixture<ChangeServicesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeServicesDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeServicesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
