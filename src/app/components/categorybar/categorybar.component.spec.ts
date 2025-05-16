import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorybarComponent } from './categorybar.component';

describe('CategorybarComponent', () => {
  let component: CategorybarComponent;
  let fixture: ComponentFixture<CategorybarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorybarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorybarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
