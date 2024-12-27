import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in-form-component',
  templateUrl: './sign-in-form-component.component.html',
  styleUrl: './sign-in-form-component.component.scss',
  imports: [
    CommonModule,
    MatFormFieldModule, 
    MatInputModule,
    MatButtonModule,
    MatIconModule, 
    ReactiveFormsModule,
  ],
})
export class SignInFormComponentComponent {
  @Output() goBackToLogin = new EventEmitter<void>();
  form!: FormGroup;
  tentativasFalhas: number = 0;
  maxTentativas: number = 3;
  isLoading: boolean = false;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }
  changeToSingUp() {
    this.goBackToLogin.emit(); 
  }
  onSubmit() {
    if (this.form.valid) {
      return;
    } else {
      console.log('Form is invalid');
      this.tentativasFalhas++;
      this.form.markAllAsTouched(); 
    }
  }
}
