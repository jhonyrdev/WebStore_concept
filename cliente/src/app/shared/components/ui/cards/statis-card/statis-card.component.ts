import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { ThemeService } from '@/app/shared/services/theme.service';

@Component({
  selector: 'app-statis-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statis-card.component.html',
  styleUrl: './statis-card.component.css',
})
export class StatisCardComponent {
  @Input() iconClass = 'fa-solid fa-chart-line';
  @Input() title = 'Metric Title';
  @Input() value = '$0';
  @Input() subtitle = '';
  @Input() variant: 'purple' | 'blue' | 'green' | 'rose' = 'purple';

  private themeService = inject(ThemeService);

  darkMode = this.themeService.darkMode;

  getBgStyle(): string {
    const dark = this.darkMode();

    const mapLight: Record<string, string> = {
      purple: 'linear-gradient(135deg,#9f7aea,#d946ef)',
      blue: 'linear-gradient(135deg,#60a5fa,#6366f1)',
      green: 'linear-gradient(135deg,#34d399,#08b4a6)',
      rose: 'linear-gradient(135deg,#fb7185,#f43f5e)',
    };

    const mapDark: Record<string, string> = {
      purple: 'linear-gradient(135deg,#2b0440,#4b1658)',
      blue: 'linear-gradient(135deg,#073047,#154e6f)',
      green: 'linear-gradient(135deg,#04382b,#1b5f4a)',
      rose: 'linear-gradient(135deg,#3b1620,#6b2834)',
    };

    return dark ? mapDark[this.variant] : mapLight[this.variant];
  }
}
