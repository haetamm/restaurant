import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillDetailModalSectionComponent } from './bill-detail-modal-section.component';

describe('BillDetailModalSectionComponent', () => {
  let component: BillDetailModalSectionComponent;
  let fixture: ComponentFixture<BillDetailModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillDetailModalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillDetailModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
