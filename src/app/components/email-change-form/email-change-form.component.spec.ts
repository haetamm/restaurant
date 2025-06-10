import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailChangeFormComponent } from './email-change-form.component';

describe('EmailChangeFormComponent', () => {
  let component: EmailChangeFormComponent;
  let fixture: ComponentFixture<EmailChangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailChangeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailChangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
