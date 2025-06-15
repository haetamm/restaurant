import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModalSectionComponent } from './user-modal-section.component';

describe('UserModalSectionComponent', () => {
  let component: UserModalSectionComponent;
  let fixture: ComponentFixture<UserModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserModalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
