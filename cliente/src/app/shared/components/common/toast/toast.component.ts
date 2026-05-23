import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="flex items-center p-4 min-w-[300px] rounded-lg shadow-lg border-l-4 pointer-events-auto transition-all animate-in slide-in-from-right duration-300"
          [ngClass]="{
            'bg-emerald-50 border-emerald-500 text-emerald-800': toast.type === 'success',
            'bg-red-50 border-red-500 text-red-800': toast.type === 'error',
            'bg-blue-100 border-blue-500 text-blue-800': toast.type === 'info',
            'bg-amber-50 border-amber-500 text-amber-800': toast.type === 'warning',
          }"
        >
          <div class="mr-3">
            @switch (toast.type) {
              @case ('success') {
                <i class="fa-solid fa-circle-check"></i>
              }
              @case ('error') {
                <i class="fa-solid fa-circle-xmark"></i>
              }
              @case ('warning') {
                <i class="fa-solid fa-triangle-exclamation"></i>
              }
              @default {
                <i class="fa-solid fa-circle-info"></i>
              }
            }
          </div>
          <div class="flex-1 text-sm font-medium">
            {{ toast.message }}
          </div>
          <button
            (click)="toastService.remove(toast.id)"
            class="ml-4 opacity-70 hover:opacity-100 p-1"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      }
    </div>
  `,
  styles: [
    `
      @keyframes slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-in {
        animation: slide-in 0.3s ease-out forwards;
      }
    `,
  ],
})
export class ToastComponent {
  toastService = inject(ToastService);
}
