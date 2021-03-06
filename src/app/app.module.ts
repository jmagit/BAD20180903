import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
registerLocaleData(localeEs, 'es', localeEsExtra);

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyCoreModule, LoggerService, ERROR_LEVEL } from '../my-core';
import { ClientesModule } from './clientes/clientes.module';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { DemosComponent } from './demos/demos.component';
import { NotificationComponent } from './notification/notification.component';
import { CalculadoraComponent } from './calculadora/calculadora.component';
import { DinamicoComponent } from './dinamico/dinamico.component';
import { PERSONAS_COMPONETS } from './personas/personas.component';
import { PersonasViewModelService, PersonasDAOViewModelService, PersonasDAOService } from './personas/personas.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DemosComponent,
    NotificationComponent,
    CalculadoraComponent,
    DinamicoComponent,
    PERSONAS_COMPONETS,
    MenuComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(routes),
    MyCoreModule, ClientesModule
  ],
  providers: [
    LoggerService, PersonasDAOService,
    {provide: ERROR_LEVEL, useValue: environment.ERROR_LEVEL },
    {provide: PersonasViewModelService,
      useClass: PersonasDAOViewModelService},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
