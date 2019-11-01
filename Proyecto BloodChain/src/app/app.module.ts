import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule
} from '@angular/material';
import { VistaPrincipalComponent } from './vista-principal/vista-principal.component';
import { RecoDonantesComponent } from './reco-donantes/reco-donantes.component';
import { RecoUnidadComponent } from './reco-unidad/reco-unidad.component';
import { GraficasComponent } from './graficas/graficas.component';
import { RegistroLugaresComponent } from './registro-lugares/registro-lugares.component';

@NgModule({
  declarations: [
    AppComponent,
    VistaPrincipalComponent,
    RecoDonantesComponent,
    RecoUnidadComponent,
    GraficasComponent,
    RegistroLugaresComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
