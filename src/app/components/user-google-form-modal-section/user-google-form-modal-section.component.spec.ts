import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGoogleFormModalSectionComponent } from './user-google-form-modal-section.component';

describe('UserGoogleFormModalSectionComponent', () => {
  let component: UserGoogleFormModalSectionComponent;
  let fixture: ComponentFixture<UserGoogleFormModalSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGoogleFormModalSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGoogleFormModalSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
