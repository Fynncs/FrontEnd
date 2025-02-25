import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './core/components/nav-bar/nav-bar/nav-bar.component';
import { Router, NavigationEnd } from '@angular/router';
import { trigger, state, style, transition, animate, query, group } from '@angular/animations';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    // 🔹 Animação da navbar (mantida)
    trigger('toggleNav', [
      state('open', style({ width: '220px' })),
      state('closed', style({ width: '90px' })),
      transition('open <=> closed', [animate('300ms ease-in-out')])
    ]),

    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
        group([
          query(
            ':leave',
            [
              style({ opacity: 1, transform: 'translateY(0)' }),
              animate(
                '300ms ease-out',
                style({ opacity: 0, transform: 'translateY(-20px)' })
              )
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({ opacity: 0, transform: 'translateY(20px)' }),
              animate(
                '300ms ease-in',
                style({ opacity: 1, transform: 'translateY(0)' })
              )
            ],
            { optional: true }
          )
        ])
      ])
    ])
  ]
})
export class AppComponent {
  title = 'FYNNC';

  exibirNavbar: boolean = false;
  navbarFechada: boolean = true;
  constructor(
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  toggleNavbar() {
    this.navbarFechada = !this.navbarFechada;
  }
  prepareRoute(outlet: any): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  ngOnInit() {
    // Inicialize exibirNavbar baseado na URL atual
    if (this.router.url === '/login') {
      this.exibirNavbar = false;
    } else {
      this.exibirNavbar = true;
    }
  
    // Inscreva-se nos eventos de navegação para atualizações subsequentes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.exibirNavbar = event.url !== '/login';
        this.cdr.detectChanges(); // Garantir que as mudanças sejam detectadas
      });
  }
  
}
