import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFilterbarComponent } from './bill-filterbar.component';

describe('BillFilterbarComponent', () => {
  let component: BillFilterbarComponent;
  let fixture: ComponentFixture<BillFilterbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillFilterbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillFilterbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
