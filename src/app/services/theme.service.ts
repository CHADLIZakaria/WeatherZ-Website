import { effect, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = "theme";
  #path: string = "/assets/themes";
  #stylesheet: HTMLLinkElement | null = document.getElementById("theme") as HTMLLinkElement;
  themeSignal: WritableSignal<string> = signal<string>("light");

  constructor() {
    this.initializeThemeFromPreferences();
    effect(() => {
      this.updateRenderedTheme();
    });
  }

  toggleTheme(): void {
    this.themeSignal.update((prev) =>
      this.isDarkThemeActive() ? "light" : "dark"
    );
  }

  isDarkThemeActive(): boolean {
    return this.themeSignal() === "dark" ? true : false;
  }

  private initializeThemeFromPreferences(): void {
    if (!this.#stylesheet) {
      this.initializeStylesheet();
    }
    const storedTheme = localStorage.getItem(this.THEME_KEY);
    if (storedTheme) {
      this.themeSignal.update(() => storedTheme);
    }
  }

  private initializeStylesheet(): void {
    this.#stylesheet = document.createElement("link");
    this.#stylesheet.id = "theme";
    this.#stylesheet.rel = "stylesheet";
    document.head.appendChild(this.#stylesheet);
  }

  private updateRenderedTheme(): void {
    if (this.#stylesheet) {
      this.#stylesheet.href = `${this.#path}/${this.themeSignal()}.css`;
    }
    localStorage.setItem(this.THEME_KEY, this.themeSignal());
  }
}
