import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAdminItemComponent } from './cart-admin-item.component';

describe('CartAdminItemComponent', () => {
  let component: CartAdminItemComponent;
  let fixture: ComponentFixture<CartAdminItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartAdminItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartAdminItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
