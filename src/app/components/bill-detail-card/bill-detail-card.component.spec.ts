import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BillDetailCardComponent } from './bill-detail-card.component';

describe('BillDetailCardComponent', () => {
  let component: BillDetailCardComponent;
  let fixture: ComponentFixture<BillDetailCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillDetailCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BillDetailCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
