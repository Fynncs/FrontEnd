import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ComumModule } from '@fynnc.module';


@Component({
  selector: 'app-nav-bar',
  imports: [
    ComumModule
  ],
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
  @Input() situationNavBar!: boolean;
  sidenavOpened = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['situationNavBar']) {
      this.sidenavOpened = this.situationNavBar;
    }
  }
  toggleNavbar() {
    this.toggle.emit();
  }
}
