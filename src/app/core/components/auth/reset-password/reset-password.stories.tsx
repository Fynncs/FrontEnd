import { moduleMetadata, Meta, StoryFn } from '@storybook/angular';
import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

export default {
  title: 'Components/ResetPassword',
  component: ResetPasswordComponent,
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
      ],
      providers: [
        FormBuilder,
        { provide: MatDialog, useValue: { open: () => {} } }, 
      ],
    }),
  ],
} as Meta<ResetPasswordComponent>;
const Template: StoryFn = (args) => ({
  component: ResetPasswordComponent,
  props: {
    ...args,
    form: new FormBuilder().group({
      email: [''],
      password: [''],
    }),
    isCodeSent: false,
  },
});

export const Default = Template.bind({});
Default.args = {
  isCodeSent: false,
};
