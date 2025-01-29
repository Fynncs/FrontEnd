import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar/nav-bar.component';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('toggleNav', [
      state('open', style({
        width: '220px',
      })),
      state('closed', style({
        width: '90px',
      })),
      transition('open <=> closed', [
        animate('300ms ease-in-out')
      ]),
    ])
  ]
})
export class AppComponent {
  title = 'FYNNC';
  
  exibirNavbar: boolean = false;
  navbarFechada: boolean = false;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  toggleNavbar() {
    this.navbarFechada = !this.navbarFechada;
  }
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.exibirNavbar = event.url === '/login' ? this.exibirNavbar = false 
        : this.exibirNavbar = true;
        this.exibirNavbar
        this.cdr.detectChanges();
      });
  }
}
