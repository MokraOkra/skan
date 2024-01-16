import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeExpierienceDialogComponent } from './change-expierience-dialog.component';

describe('ChangeExpierienceDialogComponent', () => {
  let component: ChangeExpierienceDialogComponent;
  let fixture: ComponentFixture<ChangeExpierienceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeExpierienceDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeExpierienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
