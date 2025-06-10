import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeLayoutComponent } from './authorize-layout.component';

describe('AuthorizeLayoutComponent', () => {
  let component: AuthorizeLayoutComponent;
  let fixture: ComponentFixture<AuthorizeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorizeLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorizeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
