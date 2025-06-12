import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDetailModalSectionComponent } from './customer-detail-modal-section.component';

describe('CustomerDetailModalSectionComponent', () => {
  let component: CustomerDetailModalSectionComponent;
  let fixture: ComponentFixture<CustomerDetailModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerDetailModalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerDetailModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
