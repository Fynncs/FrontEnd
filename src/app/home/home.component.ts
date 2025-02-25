import { Component } from '@angular/core';
import { environment } from 'environments/environment';
import { ComumModule } from '@fynnc.module';


@Component({
  selector: 'app-home',
  imports: [
  ComumModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  isDevelopment = environment.isDevelopment;
  constructor() {
  }
}
