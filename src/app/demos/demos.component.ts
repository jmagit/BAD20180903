import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-demos',
  templateUrl: './demos.component.html',
  styleUrls: ['./demos.component.css']
})
export class DemosComponent implements OnInit {
  // tslint:disable-next-line:no-inferrable-types
  private nombre: string = 'mundo';
  public get Nombre() { return this.nombre; }
  public set Nombre(valor: string) {
    if (this.nombre !== valor) {
      this.nombre = valor;
    }
  }
  listado = [
    {id: 1, nombre: 'Caceres'},
    {id: 2, nombre: 'BADAJOS'},
    {id: 3, nombre: 'madrid'},
    {id: 4, nombre: 'A coruña'},
  ];
  idProvincia = 2;

  resultado: any;
  visible = true;
  estetica = { importante: true, error: false, urgente: true };

  constructor(public notify: NotifyService) { }

  ngOnInit() {
  }

  public saluda() {
    this.resultado = `Hola ${this.nombre}`;
  }
  public despide() {
    this.resultado = `Adios ${this.nombre}`;
  }
  public di(algo: string) {
    this.resultado = `Dice ${algo}`;
  }

  public cambia() {
    this.visible = !this.visible;
    this.estetica.importante = !this.estetica.importante;
    this.estetica.error = !this.estetica.error;
  }

  public calcula(a: number, b: number): number {
    return a + b;
  }

  public add(provincia: string) {
    if (!provincia) {
      this.notify.add('Falta el nombre de la provincia.');
      return;
    }
    const newId = this.listado.length === 0 ? 1 :
      this.listado[this.listado.length - 1].id + 1;
    this.listado.push({id: newId, nombre: provincia});
    this.idProvincia = newId;
  }
}
