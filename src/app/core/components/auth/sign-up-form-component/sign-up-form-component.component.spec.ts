import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpFormComponentComponent } from './sign-up-form-component.component';

describe('SignUpFormComponentComponent', () => {
  let component: SignUpFormComponentComponent;
  let fixture: ComponentFixture<SignUpFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
