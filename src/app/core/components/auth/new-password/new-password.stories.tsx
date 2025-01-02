import { moduleMetadata, Meta, StoryFn } from '@storybook/angular';
import { NewPasswordComponent } from './new-password.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/NewPassword',
  component: NewPasswordComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
      ],
      providers: [FormBuilder],
    }),
  ],
} as Meta<NewPasswordComponent>;

const Template: StoryFn = (args) => ({
  component: NewPasswordComponent,
  props: {
    ...args,
    passwordForm: new FormBuilder().group({
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      confirmPassword: ['', [Validators.required]],
    }),
  },
});

export const Default = Template.bind({});
Default.args = {
  isPasswordValid: false,
};
