import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEmailModalSectionComponent } from './confirm-email-modal-section.component';

describe('ConfirmEmailModalSectionComponent', () => {
  let component: ConfirmEmailModalSectionComponent;
  let fixture: ComponentFixture<ConfirmEmailModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmEmailModalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmEmailModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
