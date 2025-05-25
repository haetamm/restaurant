import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartItemComponent } from './list-cart-item.component';

describe('ListCartItemComponent', () => {
  let component: ListCartItemComponent;
  let fixture: ComponentFixture<ListCartItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCartItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCartItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
