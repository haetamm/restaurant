import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTableCardComponent } from './dining-table-card.component';

describe('DiningTableCardComponent', () => {
  let component: DiningTableCardComponent;
  let fixture: ComponentFixture<DiningTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiningTableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiningTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
