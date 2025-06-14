import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTableCardComponent } from './menu-table-card.component';

describe('MenuTableCardComponent', () => {
  let component: MenuTableCardComponent;
  let fixture: ComponentFixture<MenuTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuTableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
