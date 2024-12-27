import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInFormComponentComponent } from './sign-in-form-component.component';

describe('SignInFormComponentComponent', () => {
  let component: SignInFormComponentComponent;
  let fixture: ComponentFixture<SignInFormComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInFormComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
