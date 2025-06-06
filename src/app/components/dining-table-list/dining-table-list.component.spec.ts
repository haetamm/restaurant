import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTableListComponent } from './dining-table-list.component';

describe('DiningTableListComponent', () => {
  let component: DiningTableListComponent;
  let fixture: ComponentFixture<DiningTableListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiningTableListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiningTableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
