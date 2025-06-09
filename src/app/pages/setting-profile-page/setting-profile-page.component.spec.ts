import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingProfilePageComponent } from './setting-profile-page.component';

describe('SettingProfilePageComponent', () => {
  let component: SettingProfilePageComponent;
  let fixture: ComponentFixture<SettingProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingProfilePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
