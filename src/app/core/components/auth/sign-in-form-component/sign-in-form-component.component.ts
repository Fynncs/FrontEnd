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
    RecaptchaModule,
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
  recaptchaResponse: string | undefined
  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      recaptcha: ['', Validators.required]
    });
  }
  changeToSingUp() {
    this.goBackToLogin.emit();
  }

  openForgotPassword() {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '600px',
      maxWidth: '90vw',
      backdropClass: 'custom-backdrop'
    });
    dialogRef.afterClosed().subscribe((sendCode) => {
    //  if (!sendCode) return;
      this.openCodeDialog();
    });
  }

  openCodeDialog() {
    const dialogRef = this.dialog.open(CodePasswordComponent, {
      width: '600px',
      backdropClass: 'custom-backdrop'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        console.log('Código validado com sucesso!');
      } else {
        console.log('Diálogo fechado sem validação.');
      }
    });
  }
  onCaptchaResolved(captchaResponse: string | null | undefined) {
    if (captchaResponse) {
      this.recaptchaResponse = captchaResponse;
      this.form.get('recaptcha')?.setValue(captchaResponse);
      this.form.get('recaptcha')?.updateValueAndValidity();
    }
  }
mostrarCaptcha: boolean = false;
mostrarEsqueceuSenha: boolean = false;

verificarTentativas(): void {
  if (this.tentativasFalhas >= this.maxTentativas) {
    setTimeout(() => {
      this.mostrarEsqueceuSenha = true;
      this.mostrarCaptcha = true;
    }, 500); // Delay de 500ms
  }
}

  onSubmit(): void {
    if (this.tentativasFalhas >= this.maxTentativas) {
      this.form.get('recaptcha')?.setValidators([Validators.required]);
      this.form.get('recaptcha')?.updateValueAndValidity();
    }

    if (!this.form.valid) {
      this.tentativasFalhas += 1;
      this.form.markAllAsTouched();
      return;
    }

    const user: IUser = this.form.value;
    this.authService.login(user.email, user.password).subscribe({
      next: (response) => {
        const token = response.token;
        this.authService.saveToken(token);
        this.router.navigate(['/home']);
        this.tentativasFalhas = 0;
      },
      error: (error: HttpErrorResponse) => {
        this.errorMessage = 'Login falhou. Verifique suas credenciais.';
        console.error('Erro no login:', error);
        this.tentativasFalhas += 1;
      }
    });
  }
}
