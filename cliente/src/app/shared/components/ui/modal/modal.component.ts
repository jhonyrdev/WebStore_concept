import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  isOpen    = input.required<boolean>()
  maxWidth  = input<string>('max-w-lg')
  paddingTop = input<string>('pt-20')         
  closed    = output<void>()
}
