import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuFormModalSectionComponent } from './menu-form-modal-section.component';

describe('MenuFormModalSectionComponent', () => {
  let component: MenuFormModalSectionComponent;
  let fixture: ComponentFixture<MenuFormModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuFormModalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuFormModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
