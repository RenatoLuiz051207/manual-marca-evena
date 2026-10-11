import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ClipboardService {
  private readonly doc = inject(DOCUMENT);
  readonly message = signal('');
  readonly copied = signal('');
  private timer?: ReturnType<typeof setTimeout>;
  async copy(value: string, label = 'Conteúdo'): Promise<void> {
    try {
      const clipboard = this.doc.defaultView?.navigator.clipboard;
      if (!clipboard) throw new Error('Clipboard unavailable');
      await clipboard.writeText(value);
      this.copied.set(value);
      this.message.set(label + ' copiado!');
    } catch {
      this.message.set(
        'Selecione o conteúdo e copie manualmente. A cópia automática não está disponível neste navegador.',
      );
    }
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.message.set('');
      this.copied.set('');
    }, 3200);
  }
  download(content: string, filename: string, type = 'text/plain;charset=utf-8'): void {
    const url = URL.createObjectURL(new Blob([content], { type }));
    const a = this.doc.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}
