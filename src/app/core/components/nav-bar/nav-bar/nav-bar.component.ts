import { Component, HostListener } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-nav-bar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  animations: [
    trigger('sidenavAnimation', [
      state('void', style({ transform: 'translateX(-100%)' })),
      state('open', style({ transform: 'translateX(0)' })),
      transition('void <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class NavBarComponent {
  sidenavOpened = false;

  // Função para alternar o estado do sidenav
  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

  // Função para fechar o sidenav
  closeSidenav() {
    this.sidenavOpened = false;
  }
}
