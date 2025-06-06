import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTablePageComponent } from './dining-table-page.component';

describe('DiningTablePageComponent', () => {
  let component: DiningTablePageComponent;
  let fixture: ComponentFixture<DiningTablePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiningTablePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiningTablePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
