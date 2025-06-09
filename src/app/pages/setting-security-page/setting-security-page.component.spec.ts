import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingSecurityPageComponent } from './setting-security-page.component';

describe('SettingSecurityPageComponent', () => {
  let component: SettingSecurityPageComponent;
  let fixture: ComponentFixture<SettingSecurityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingSecurityPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingSecurityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
