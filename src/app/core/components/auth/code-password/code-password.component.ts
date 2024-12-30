import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-code-password',
  imports: [
            CommonModule,
            MatFormFieldModule,
            MatInputModule,
            MatButtonModule,
            MatIconModule,
            ReactiveFormsModule
  ],
  templateUrl: './code-password.component.html',
  styleUrl: './code-password.component.scss'
})
export class CodePasswordComponent {
  codeForm!: FormGroup;
  digits = Array(6).fill(0); 
  isCodeValid: boolean = false;

  @ViewChildren('inputRef') inputs!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.codeForm = this.fb.group({});
    this.digits.forEach((_, i) => {
      this.codeForm.addControl(`digit${i}`, new FormControl('', [Validators.required, Validators.pattern('[0-9]')]));
    });
  }

  moveFocus(event: any, index: number) {
    const input = event.target;
    if (input.value.length === 1 && index < 5) {
      this.inputs.toArray()[index + 1].nativeElement.focus();
    } else if (event.key === 'Backspace' && index > 0) {
      this.inputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  onSubmitCode() {
    if (this.codeForm.valid) {
      const code = this.digits.map((_, i) => this.codeForm.get(`digit${i}`)?.value).join('');

      this.http.post('/api/validate-reset-code', { code }).subscribe({
        next: () => {
          this.isCodeValid = true;
          console.log('Código validado com sucesso!');
        },
        error: (err) => {
          console.error('Erro ao validar código:', err);
        }
      });
    }
  }
}
