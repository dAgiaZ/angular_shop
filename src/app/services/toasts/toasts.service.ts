import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
    // Hack when autohidden not working
    setTimeout(() => {
      if (this.toasts[this.toasts.length - 1]) {
        this.remove(this.toasts[this.toasts.length - 1]);
      }
    }, options.delay || 5000)
  }

  showSuccess(textOrTpl: string | TemplateRef<any>, options?: any) {
    options = {
      classname: 'bg-success text-light',
      ...options
    }
    this.show(textOrTpl, options);
  }

  showError(textOrTpl: string | TemplateRef<any>, options?: any) {
    options = {
      classname: 'bg-danger text-light',
      ...options
    }
    this.show(textOrTpl, options);
  }

  remove(toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}