import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HistorialCasosComponent } from './components/historial-casos/historial-casos.component';

import { ClientesService } from '../app/services/clientes.service';
import { ListsService } from '../app/services/lists.service';

import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TipificacionComponent } from './components/tipificacion/tipificacion.component';
import { DatosComplementariosComponent } from './components/datos-complementarios/datos-complementarios.component';
import { HttpClientModule } from '@angular/common/http';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { LoadingComponent } from './components/loading/loading.component';


@NgModule({
  declarations: [
    AppComponent,
    ClienteComponent,
    HistorialCasosComponent,
    TipificacionComponent,
    DatosComplementariosComponent,
    JumbotronComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    ClientesService,
    ListsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
