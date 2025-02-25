import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMessage } from '@fynnc/message';
import { ComumModule } from '@fynnc/module';

@Component({
  selector: 'app-relatar-bug',
  imports: [ComumModule],
  templateUrl: './relatar-bug.component.html',
  styleUrl: './relatar-bug.component.scss'
})
export class RelatarBugComponent {
  form: FormGroup ;
  message: IMessage;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: IMessage,
    private dialogRef: MatDialogRef<RelatarBugComponent>
  ) {
    this.form = this.fb.group({
      content: [this.data.content || '', Validators.required],
    });
    this.message = this.data || {};
    if (this.message) {
      this.form.patchValue(this.message);
    }
    this.form.valueChanges.subscribe(value => {
      Object.assign(this.data, value);  
    });
  }
  manter(): void {
    this.data
    if (this.form?.valid) {
      const formValue = this.form.value;
      console.log('Mensagem enviada:', formValue);
      this.dialogRef.close(formValue); 
    } else {
      console.log('Formulário inválido');
    }
  }

 
  onCancel(): void {
    this.dialogRef.close();
  }
}