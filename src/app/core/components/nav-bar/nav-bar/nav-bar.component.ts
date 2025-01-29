import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-nav-bar',
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
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
  @Output() toggle = new EventEmitter<void>(); 
  sidenavOpened = true;  
  toggleNavbar() {
    this.toggle.emit(); 
    this.sidenavOpened = !this.sidenavOpened;
  }
}
