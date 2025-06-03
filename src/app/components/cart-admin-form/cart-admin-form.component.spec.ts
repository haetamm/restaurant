import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAdminFormComponent } from './cart-admin-form.component';

describe('CartAdminFormComponent', () => {
  let component: CartAdminFormComponent;
  let fixture: ComponentFixture<CartAdminFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartAdminFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
