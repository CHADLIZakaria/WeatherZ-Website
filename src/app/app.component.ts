import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WeatherZ';
  #theme: ThemeService = inject(ThemeService);

  constructor() {
  }

  toggleTheme() {
    this.#theme.toggleTheme()
  }

}
