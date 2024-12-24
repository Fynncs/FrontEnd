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
        label: 'Email Address',
        placeholder: 'Enter email',
        required: true,
        appearance: 'outline',
        hint: 'We will never share your email',
        attributes: {
          autocomplete: 'off',
        }
      },
      id: 'custom-input',
      className: 'custom-input', // ou use ngClass
    },
    {
      key: 'name',
      type: 'input',
      props: {
        label: 'Full Name',
        placeholder: 'Enter your full name',
        required: true,
        appearance: 'outline'
      },
      className: 'custom-input custom-name-field'
    },
    {
      key: 'phone',
      type: 'input',
      props: {
        label: 'Phone',
        placeholder: 'Enter your phone number',
        required: false,
        type: 'tel',
        appearance: 'outline'
      },
      className: 'custom-input'
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
