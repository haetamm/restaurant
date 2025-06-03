import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCartAdminItemComponent } from './list-cart-admin-item.component';

describe('ListCartAdminItemComponent', () => {
  let component: ListCartAdminItemComponent;
  let fixture: ComponentFixture<ListCartAdminItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCartAdminItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCartAdminItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
