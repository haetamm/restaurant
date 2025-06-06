import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBottomComponent } from './button-bottom.component';

describe('ButtonBottomComponent', () => {
  let component: ButtonBottomComponent;
  let fixture: ComponentFixture<ButtonBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonBottomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
