import { Component } from '@angular/core';

@Component({
  selector: 'app-public-footer',
  imports: [],
  templateUrl: './public-footer.component.html',
  styleUrl: './public-footer.component.css',
})
export class PublicFooterComponent {
readonly currentYear = new Date().getFullYear();
 
  readonly enlaces = [
    { label: 'Sobre nosotros', href: '/nosotros' },
    { label: 'Términos y condiciones', href: '/terminos' },
    { label: 'Política de privacidad', href: '/privacidad' },
    { label: 'Preguntas frecuentes', href: '/faq' },
    { label: 'Contacto', href: '/contacto' },
  ];
 
  readonly redes = [
    {
      label: 'Facebook',
      href: 'https://facebook.com',
      icon: `<i class="fa-brands fa-facebook-f"></i>`,
    },
    {
      label: 'Instagram',
      href: 'https://instagram.com',
      icon: `<i class="fa-brands fa-instagram"></i>`,
    },
    {
      label: 'TikTok',
      href: 'https://tiktok.com',
      icon: `<i class="fa-brands fa-tiktok"></i>`,
    },
  ];
}