import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-new-password',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  passwordForm!: FormGroup;
  isPasswordValid = false;
  errorMessage = '';
  hidePassword = true; // Controla a visibilidade da senha

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.passwordForm = this.fb.group({
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        ]
      ],
      confirmPassword: ['', [Validators.required]]
    });
    this.passwordForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.checkPasswords();
    });
  }

  checkPasswords() {
    const newPassword = this.passwordForm?.get('newPassword')?.value;
    const confirmPassword = this.passwordForm?.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      this.passwordForm?.get('confirmPassword')?.setErrors({ mismatch: true });
      this.errorMessage = 'As senhas não coincidem.';
    } else {
      this.passwordForm?.get('confirmPassword')?.setErrors(null);
      this.errorMessage = '';
    }
  }

  onSubmitPassword() {
    const newPassword = this.passwordForm?.get('newPassword')?.value;
    const confirmPassword = this.passwordForm?.get('confirmPassword')?.value;

    if (this.passwordForm?.valid && newPassword === confirmPassword) {
      this.isPasswordValid = true;
      this.errorMessage = ''; // Limpa qualquer mensagem de erro anterior
    } else {
      this.errorMessage = 'As senhas não coincidem, por favor verifique e tente novamente.';
    }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword; // Alterna a visibilidade da senha
  }
}
