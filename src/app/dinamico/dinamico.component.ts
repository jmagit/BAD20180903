import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { DemosComponent } from '../demos/demos.component';
import { CalculadoraComponent } from '../calculadora/calculadora.component';
import { PersonasComponent } from '../personas/personas.component';

@Component({
  selector: 'app-dinamico',
  templateUrl: './dinamico.component.html',
  styleUrls: ['./dinamico.component.css'],
  entryComponents: [HomeComponent, DemosComponent,
    CalculadoraComponent, PersonasComponent, ],
})
export class DinamicoComponent implements OnInit {
  public Menu = [
    { texto: 'Personas', componete: PersonasComponent },
    { texto: 'Inicio', componete: HomeComponent },
    { texto: 'Demo', componete: DemosComponent },
    { texto: 'Calculadora', componete: CalculadoraComponent },
  ];
  public Seleccionado = this.Menu[0].componete;

  constructor() { }

  ngOnInit() {
  }

  public cambia(indice: number) {
    if (0 <= indice && indice < this.Menu.length) {
      this.Seleccionado = this.Menu[indice].componete;
    }
  }
}
