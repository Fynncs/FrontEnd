import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { LoginComponent } from 'app/login/login.component';
import { AppComponent } from 'app/app.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    AppComponent,
    LoginComponent,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
    }),
    FormlyBootstrapModule, 
  ],
  providers: [],
})
export class FormlyConfigModule {}
