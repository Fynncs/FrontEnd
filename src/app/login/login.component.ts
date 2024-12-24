import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyConfigModule } from '../core/config/formly.config'
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { IUser, User } from '@fynnc.models';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormlyConfigModule, ReactiveFormsModule, FormlyModule, FormlyBootstrapModule,CommonModule]
})
export class LoginComponent {
  form = new FormGroup({});
  // model: Partial<IUser> = {
  //   email: '',
  //   name: '',
  //   phone: ''
  // };
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
