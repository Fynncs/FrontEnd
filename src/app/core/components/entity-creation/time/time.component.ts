import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
import { ChartComponentComponent } from 'app/core/components/dashboard/chart-component/chart-component.component';
import { ExpenseCardComponent } from 'app/core/components/dashboard/expense-card/expense-card.component';
import { TableComponent } from 'app/core/components/entity-creation/table/table.component';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Portuguese } from 'flatpickr/dist/l10n/pt.js';

@Component({
  selector: 'app-time',
   imports: [ChartComponentComponent, ExpenseCardComponent, MatListModule, MatFormFieldModule, TableComponent, FormsModule, CommonModule, MatListModule, MatMenuModule, MatIconModule],
  templateUrl: './time.component.html',
  styleUrl: './time.component.scss'
})
export class TimeComponent {
  @ViewChild('datePickerButton') datePickerButton!: ElementRef;
  selectedDateRange: string = new Date().toDateString();
  selectedTime: string = '24h';
  showTimeOptions: boolean = false
  times: string[] = this.generateTimeOptions();
  constructor(private cdr: ChangeDetectorRef) { }
  generateTimeOptions(): string[] {
    const times = [];
    let hours = 0;
    while (hours < 24) {
      const time = this.formatTime(hours);
      times.push(time);
      hours += 6;
    }
    return times;
  }
  formatTime(hours: number): string {
    const formattedHours = hours < 10 ? '0' + hours : hours;
    return `${formattedHours}:00`;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      flatpickr(this.datePickerButton.nativeElement, {
        mode: 'range',
        dateFormat: 'd/m/Y',
        locale: Portuguese, // Aplica a localização em português
        onClose: (selectedDates, dateStr) => {
          if (selectedDates.length === 2) {
            const startDate = selectedDates[0].toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' });
            const endDate = selectedDates[1].toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric', year: 'numeric' });
            this.selectedDateRange = `${startDate} - ${endDate}`;
          }
        }
      });
    }, 0);
  }
  onTimeChange(event: any) {
    console.log('Horário selecionado:', this.selectedTime);
  }
}
