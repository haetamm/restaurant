import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageMenuSectionComponent } from './landing-page-menu-section.component';

describe('LandingPageMenuSectionComponent', () => {
  let component: LandingPageMenuSectionComponent;
  let fixture: ComponentFixture<LandingPageMenuSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageMenuSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageMenuSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
