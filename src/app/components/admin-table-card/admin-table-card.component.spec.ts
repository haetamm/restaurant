import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTableCardComponent } from './admin-table-card.component';

describe('AdminTableCardComponent', () => {
  let component: AdminTableCardComponent;
  let fixture: ComponentFixture<AdminTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
