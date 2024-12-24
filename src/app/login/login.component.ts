import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { IUser, User } from '@fynnc.models';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [ReactiveFormsModule, FormlyModule, FormlyBootstrapModule,CommonModule]
})
export class LoginComponent {
  form = new FormGroup({});
  model: User = new User();
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      props: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    },
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
      }
    },
    {
      key: 'phone',
      type: 'input',
      props: {
        label: 'Phone',
        placeholder: 'Enter your phone number',
        required: false,
      }
    }
  ];

  onSubmit(model: Partial<IUser>) {
    if (this.form.valid) {
      console.log('Form Submitted:', model);
    } else {
      console.warn('Form is invalid');
    }
  }
}
