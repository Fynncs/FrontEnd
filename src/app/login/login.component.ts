import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { SignUpFormComponent } from "../core/components/auth/sign-up-form-component/sign-up-form-component.component";
import { SignInFormComponent } from "../core/components/auth/sign-in-form-component/sign-in-form-component.component";
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    SignUpFormComponent,
    SignInFormComponent
],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoading: boolean = false;
  singUp: boolean = false;
  singIn: boolean = true;


  constructor(
    private readonly router: Router
  ) {}

  ngOnInit() {
  }
  navegate(){
    this.router.navigate(['/home']);
  }
  singUpForm(){
    this.singUp = true
    this.singIn = false
  }
  singInForm() {
    this.singUp = false;
    setTimeout(() => {
      this.singIn = true;
    }, 100);
  }
}
