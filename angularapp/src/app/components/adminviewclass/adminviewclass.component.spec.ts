import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminviewclassComponent } from './adminviewclass.component';

describe('AdminviewclassComponent', () => {
  let component: AdminviewclassComponent;
  let fixture: ComponentFixture<AdminviewclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminviewclassComponent]
    });
    fixture = TestBed.createComponent(AdminviewclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
