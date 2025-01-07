import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar/nav-bar.component';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FYNNC';
  exibirNavbar: boolean = true;
  navbarFechada: boolean = false; // Estado inicial

  toggleNavbar() {
    this.navbarFechada = !this.navbarFechada; // Alterna entre aberta/fechada
  }
  // constructor(private router: Router) {
  //   this.router.events.subscribe(event => {
  //     if (event instanceof NavigationEnd) {
  //       this.exibirNavbar = event.url !== '/login';
  //     }
  //   });
  // }
}
