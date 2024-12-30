import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { CodePasswordComponent } from '../code-password/code-password.component';

@Component({
  selector: 'app-reset-password',
  imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  form!: FormGroup
  isCodeSent: boolean = false;
  ngOnInit() {
    this.form = this.fb.group({
      emaio: ['',[]]
    })
  }
  constructor(
    private readonly fb: FormBuilder,
    private dialog: MatDialog
  ){}
  
  onSubmit(){
    this.dialog.closeAll()
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
}
