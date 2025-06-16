import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModalSectionComponent } from './admin-modal-section.component';

describe('AdminModalSectionComponent', () => {
  let component: AdminModalSectionComponent;
  let fixture: ComponentFixture<AdminModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminModalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
