import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
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
    trigger('slideAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 0, transform: 'translateX(-100%)' })),
      ]),
    ]),
  ]
})
export class AppComponent implements OnInit {
  title = 'WeatherZ';
  #theme: ThemeService = inject(ThemeService);
  images = [
    'screen1',
    'screen2',
  ]
  currentIndex = 0;

  constructor() {
  }

  ngOnInit(): void {
    setInterval(() => {
      this.nextSlide()
    }, 3000)
  }

  nextSlide() {
    if(this.currentIndex >= this.images.length-1) {
      this.currentIndex = 0
    }
    else {
      this.currentIndex = this.currentIndex+1
    }
  }

  toggleTheme() {
    this.#theme.toggleTheme()
  }

  isThemeDark(): boolean {
    return this.#theme.isDarkThemeActive()
  }

}

