import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private readonly defaultConfirmColor = '#a00691';
  private readonly defaultCancelColor = '#6b7280';

  /**
   * Muestra una alerta de éxito simple.
   */
  success(title: string, text: string = '', options: any = {}): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonColor: this.defaultConfirmColor,
      ...options,
    });
  }

  /**
   * Muestra una alerta de error.
   */
  error(
    title: string,
    text: string = '',
    footer: string = '',
    options: any = {},
  ): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'error',
      footer,
      confirmButtonColor: this.defaultConfirmColor,
      ...options,
    });
  }

  /**
   * Muestra una alerta de advertencia.
   */
  warning(title: string, text: string = '', options: any = {}): Promise<SweetAlertResult> {
    return Swal.fire({
      title,
      text,
      icon: 'warning',
      confirmButtonColor: this.defaultConfirmColor,
      ...options,
    });
  }

  /**
   * Muestra un diálogo de confirmación personalizado.
   */
  async confirm(options: {
    title: string;
    text: string;
    icon?: SweetAlertIcon;
    confirmButtonText?: string;
    cancelButtonText?: string;
    showCancelButton?: boolean;
    reverseButtons?: boolean;
  }): Promise<SweetAlertResult> {
    return Swal.fire({
      title: options.title,
      text: options.text,
      icon: options.icon || 'question',
      showCancelButton: options.showCancelButton !== undefined ? options.showCancelButton : true,
      confirmButtonText: options.confirmButtonText || 'Aceptar',
      cancelButtonText: options.cancelButtonText || 'Cancelar',
      reverseButtons: options.reverseButtons !== undefined ? options.reverseButtons : true,
      confirmButtonColor: this.defaultConfirmColor,
      cancelButtonColor: this.defaultCancelColor,
    });
  }

  /**
   * Permite usar configuraciones totalmente personalizadas para casos especiales.
   */
  custom(options: any): Promise<SweetAlertResult> {
    return Swal.fire({
      confirmButtonColor: this.defaultConfirmColor,
      cancelButtonColor: this.defaultCancelColor,
      ...options,
    });
  }
}
