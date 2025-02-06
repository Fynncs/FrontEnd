import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-wallet-tracker',
  imports: [CommonModule],
  templateUrl: './wallet-tracker.component.html',
  styleUrl: './wallet-tracker.component.scss'
})
export class WalletTrackerComponent {
  saldo: number = 1000.50;
}
