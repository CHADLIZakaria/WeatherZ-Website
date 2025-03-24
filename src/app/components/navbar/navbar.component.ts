import { Component, HostListener, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [   
    trigger('button-theme', [
      state('default', style({
        transform: 'scale(0) rotate(-90deg) translateX(-100%)',
      })),
      state('active', style({
        transform: 'scale(1) rotate(0deg) translateX(0%)',
      })),
      transition('default <=> active', [
        animate('500ms ease-in-out')
      ])
    ]),
    trigger('background', [
      state('hidden', style({ 'background-color': 'transparent' })),
      state('visible', style({ 'background': "var(--navbar-background-color)" })),
      transition('hidden <=> visible', animate('250ms ease-out')),
    ])
  ]
})
export class NavbarComponent {
  #theme: ThemeService = inject(ThemeService);
  showBackground = false

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop > 10) {
      this.showBackground = true;
    } 
    else if (this.showBackground && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.showBackground = false;
    }
  }

  toggleTheme() {
    this.#theme.toggleTheme()
  }

  isThemeDark(): boolean {
    return this.#theme.isDarkThemeActive()
  }

}
