import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFormBulkComponent } from './menu-form-bulk.component';

describe('MenuFormBulkComponent', () => {
  let component: MenuFormBulkComponent;
  let fixture: ComponentFixture<MenuFormBulkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFormBulkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFormBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
