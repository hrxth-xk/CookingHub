import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminaddclassComponent } from './adminaddclass.component';

describe('AdminaddclassComponent', () => {
  let component: AdminaddclassComponent;
  let fixture: ComponentFixture<AdminaddclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminaddclassComponent]
    });
    fixture = TestBed.createComponent(AdminaddclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
