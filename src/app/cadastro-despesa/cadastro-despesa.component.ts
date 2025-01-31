import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import flatpickr from 'flatpickr';
import { ChartComponentComponent } from 'app/core/components/dashboard/chart-component/chart-component.component';
import { ExpenseCardComponent } from 'app/core/components/dashboard/expense-card/expense-card.component';
import { TableComponent } from 'app/core/components/entity-creation/table/table.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cadastro-despesa',
  imports: [ChartComponentComponent, ExpenseCardComponent, TableComponent, CommonModule],
  templateUrl: './cadastro-despesa.component.html',
  styleUrl: './cadastro-despesa.component.scss'
})
export class CadastroDespesaComponent{
  @ViewChild('datePickerButton') datePickerButton!: ElementRef;
  selectedDateRange: string = new Date().toDateString();
  selectedTime: string = '24h';
  showTimeOptions: boolean = false
  constructor(private cdr: ChangeDetectorRef) {}
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
  
}
