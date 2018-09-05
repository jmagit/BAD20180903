import { Injectable } from '@angular/core';
import { LoggerService } from '../../my-core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private listado: Array<string> = [];

  constructor(private out: LoggerService) { }

  public get Listado() {
    return Object.assign({}, this.listado);
  }

  public add(msg: string): void {
    if (msg) {
      this.listado.push(msg);
      this.out.warn('NOTIFICATION: ' + msg);

    } else {
      this.out.error('Falta el mensaje.');
    }
  }
  public remove(index: number): void {
    if (0 <= index && index < this.listado.length) {
      this.listado.splice(index, 1);
    } else {
      this.out.error('Index out of range');
    }
  }
  public clear() {
    this.listado.splice(0);
  }
}
