import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmineditclassComponent } from './admineditclass.component';

describe('AdmineditclassComponent', () => {
  let component: AdmineditclassComponent;
  let fixture: ComponentFixture<AdmineditclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdmineditclassComponent]
    });
    fixture = TestBed.createComponent(AdmineditclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
