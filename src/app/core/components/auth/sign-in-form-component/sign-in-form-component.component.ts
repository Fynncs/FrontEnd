import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IUser } from '@fynnc.models';
import { MatDialog } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { CodePasswordComponent } from '../code-password/code-password.component';

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
    ReactiveFormsModule
  ],
})
export class SignInFormComponent {
  @Output() goBackToLogin = new EventEmitter<void>();
  form!: FormGroup;
  errorMessage: string | undefined
  tentativasFalhas: number = 0;
  maxTentativas: number = 3;
  isLoading: boolean = false;
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  changeToSingUp() {
    this.goBackToLogin.emit();
  }
  openForgotPassword() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '600px',
      maxWidth: '90vw',
    });
  
    // Após o fechamento do primeiro diálogo, abrir o segundo
    dialogRef.afterClosed().subscribe(() => {
      this.openCodeDialog(); // Abre o segundo componente
    });
  }
  
  openCodeDialog() {
    const dialogRef = this.dialog.open(CodePasswordComponent, {
      width: '600px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        console.log('Código validado com sucesso!');
      } else {
        console.log('Diálogo fechado sem validação.');
      }
    });
  }
  
  
  onSubmit(): void {
    if (!this.form.valid) {
      this.tentativasFalhas += 1
      this.form.markAllAsTouched();
      return;
    } else {
      const user: IUser = this.form.value;
      this.authService.login(user.email, user.password).subscribe({
        next: (response) => {
          const token = response.token;
          this.authService.saveToken(token);
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
          console.error('Login error', error);
        }
      });
    }
  }
}
