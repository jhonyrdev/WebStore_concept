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
  async confirm(
    titleOrOptions: string | any,
    text: string = '',
    confirmButtonText: string = 'Aceptar',
    options: any = {},
  ): Promise<SweetAlertResult> {
    // Si el primer argumento es un objeto, lo usamos directamente como configuración de Swal
    if (typeof titleOrOptions === 'object' && titleOrOptions !== null) {
      return Swal.fire({
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
        confirmButtonColor: this.defaultConfirmColor,
        cancelButtonColor: this.defaultCancelColor,
        ...titleOrOptions,
      });
    }

    // Si son argumentos individuales
    return Swal.fire({
      title: titleOrOptions,
      text: text,
      icon: options.icon || 'question',
      showCancelButton: options.showCancelButton !== undefined ? options.showCancelButton : true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: options.cancelButtonText || 'Cancelar',
      reverseButtons: options.reverseButtons !== undefined ? options.reverseButtons : true,
      confirmButtonColor: this.defaultConfirmColor,
      cancelButtonColor: this.defaultCancelColor,
      ...options,
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
