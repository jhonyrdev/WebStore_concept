import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (message()) {
      <div class="pt-1 pb-2 text-red-700 text-sm flex items-center" aria-live="polite">
        <span>{{ message() }}</span>
      </div>
    }
  `,
})
export class ErrorMessageComponent {
  message = input<string | null | undefined>('');
}
