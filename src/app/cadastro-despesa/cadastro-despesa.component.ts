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


@Component({
  selector: 'app-cadastro-despesa',
  imports: [ChartComponentComponent, ExpenseCardComponent, MatListModule, MatFormFieldModule, TableComponent, FormsModule, CommonModule, MatListModule, MatMenuModule, MatIconModule],
  templateUrl: './cadastro-despesa.component.html',
  styleUrl: './cadastro-despesa.component.scss'
})
export class CadastroDespesaComponent {
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
        dateFormat: 'M d',
        onClose: (selectedDates, dateStr) => {
          if (selectedDates.length === 2) {
            const startDate = selectedDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            const endDate = selectedDates[1].toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
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
