import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserviewclassComponent } from './userviewclass.component';

describe('UserviewclassComponent', () => {
  let component: UserviewclassComponent;
  let fixture: ComponentFixture<UserviewclassComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserviewclassComponent]
    });
    fixture = TestBed.createComponent(UserviewclassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
