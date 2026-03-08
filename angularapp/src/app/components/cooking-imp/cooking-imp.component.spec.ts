import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingImpComponent } from './cooking-imp.component';

describe('CookingImpComponent', () => {
  let component: CookingImpComponent;
  let fixture: ComponentFixture<CookingImpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CookingImpComponent]
    });
    fixture = TestBed.createComponent(CookingImpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
