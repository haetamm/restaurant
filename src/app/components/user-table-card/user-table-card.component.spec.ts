import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTableCardComponent } from './user-table-card.component';

describe('UserTableCardComponent', () => {
  let component: UserTableCardComponent;
  let fixture: ComponentFixture<UserTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserTableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
