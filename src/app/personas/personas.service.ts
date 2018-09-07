import { Injectable } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { LoggerService } from '../../my-core';
import { BaseDAOService } from '../base-class/base-dao.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PersonasDAOService extends BaseDAOService {
  constructor(http: HttpClient) {
    super(http, 'personas', {});
  }
}

@Injectable()
export class PersonasDAOViewModelService {
  protected modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  protected listado: Array<any>;
  protected elemento: any;
  protected idOriginal: any;
  protected pk = 'id';
  protected urlList = '/personas';

  constructor(private notify: NotifyService,
    private out: LoggerService, protected dao: PersonasDAOService,
      protected router: Router) {

    }

  public get Listado() { return this.listado; }
  public get Elemento() { return this.elemento; }
  public get Modo() { return this.modo; }

  public list() {
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
      },
      err => this.notify.add(err.message)
    );
  }

  public add() {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.idOriginal = key;
        this.modo = 'edit';
      },
      err => this.notify.add(err.message)
    );
  }
  public view(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.elemento = data;
        this.modo = 'view';
      },
      err => this.notify.add(err.message)
    );
  }
  public delete(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }

    this.dao.remove(key).subscribe(
      data => {
        this.list();
      },
      err => this.notify.add(err.message)
    );
  }

  public cancel() {
    this.elemento = null;
    this.idOriginal = null;
    // this.list();
    this.router.navigateByUrl(this.urlList);
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'edit':
        this.dao.change(this.elemento).subscribe(
          data => this.cancel(),
          err => this.notify.add(err.message)
        );
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
}

@Injectable()
export class PersonasViewModelService {
  protected modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  protected listado: Array<any>;
  protected elemento: any;
  protected idOriginal: any;
  protected pk = 'id';

  constructor(private notify: NotifyService,
    private out: LoggerService) { }

  public get Listado() { return this.listado; }
  public get Elemento() { return this.elemento; }
  public get Modo() { return this.modo; }

  public list() {
    if (!this.listado) {
      this.listado = [
        {id: 1, nombre: 'Carmelo', apellidos: 'Coton', edad: 35},
        {id: 2, nombre: 'Pepito', apellidos: 'Grillo', edad: 155},
        {id: 3, nombre: 'Pedro', apellidos: 'Pica Piedra', edad: 51},
        {id: 4, nombre: 'Pablo', apellidos: 'Marmol', edad: 18},
      ];
    }
    this.modo = 'list';
  }

  public add() {
    this.elemento = {};
    this.modo = 'add';
  }
  public edit(key: any) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.elemento = Object.assign({}, rslt);
      this.idOriginal = key;
      this.modo = 'edit';
    } else {
      this.notify.add('Elemento no esncontrado.');
    }
  }
  public view(key: any) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.elemento = Object.assign({}, rslt);
      this.modo = 'view';
    } else {
      this.notify.add('Elemento no esncontrado.');
    }
  }
  public delete(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }

    // tslint:disable-next-line:triple-equals
    const index = this.listado.findIndex(item => item[this.pk] == key);
    if (index >= 0) {
      this.listado.splice(index, 1);
      this.list();
    } else {
      this.notify.add('Elemento no esncontrado.');
    }
  }

  public cancel() {
    this.elemento = null;
    this.idOriginal = null;
    this.list();
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.listado.push(this.elemento);
        this.cancel();
        break;
      case 'edit':
        // tslint:disable-next-line:triple-equals
        const index = this.listado.findIndex(item => item[this.pk] == this.idOriginal);
        if (index >= 0) {
          this.listado[index] = this.elemento;
          this.cancel();
        } else {
          this.notify.add('Elemento no esncontrado.');
        }
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
}
