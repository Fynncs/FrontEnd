import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up-form-component',
  templateUrl: './sign-up-form-component.component.html',
  styleUrls: ['./sign-up-form-component.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
})
export class SignUpFormComponent implements OnInit {
  form!: FormGroup;
  hidePassword = true;
    hideConfirmPassword = true;
  sanitizedOutput: SafeHtml = '';

  @Output() goBackToLogin = new EventEmitter<void>();

  private passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      control.get('confirmPassword')?.setErrors({ mismatch: true });
      return { mismatch: true };
    } else {
      control.get('confirmPassword')?.setErrors(null);
      return null;
    }
  };

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.form = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      fullName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      nationality: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      profession: ['', [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]+$/)]],
      academicBackground: ['', Validators.required],
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });
  }


  private sanitizeString(input: string): string {
    return input
      .replace(/<script.*?>.*?<\/script>/gim, '')
      .replace(/<\/?[^>]+(>|$)/g, '')
      .replace(/javascript:/gi, '')
      .trim();
  }

  private sanitizeWithDomSanitizer(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.sanitizeString(input));
  }


  changeToSingIn() {
    this.goBackToLogin.emit();
  }

  onSubmit() {
    if (this.form.valid) {
      const sanitizedData = Object.keys(this.form.controls).reduce((acc, key) => {
        acc[key] = this.sanitizeWithDomSanitizer(this.form.get(key)?.value || ''); 
        return acc;
      }, {} as Record<string, SafeHtml>); 
      console.log('Dados Sanitizados:', sanitizedData);
    } else {
      console.warn('Formulário inválido. Corrija os erros.');
      this.form.markAllAsTouched();
    }
  }
  
}
