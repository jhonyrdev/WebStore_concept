import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  darkMode = signal(false);

  constructor() {
    this.initializeTheme();
  }

  private initializeTheme() {
    const saved = localStorage.getItem('theme');

    const initial =
      saved === 'dark' ||
      (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);

    this.darkMode.set(initial);

    this.applyTheme(initial);
  }

  toggleTheme() {
    const next = !this.darkMode();

    this.darkMode.set(next);

    this.applyTheme(next);

    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  private applyTheme(isDark: boolean) {
    const el = document.documentElement;

    if (isDark) {
      el.classList.add('dark');
      el.classList.remove('light');
    } else {
      el.classList.add('light');
      el.classList.remove('dark');
    }
  }
}