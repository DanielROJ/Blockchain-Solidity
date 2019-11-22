import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';
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
import { RecoEmpleadosComponent } from './reco-empleados/reco-empleados.component';
import { RecoTrazoComponent } from './reco-trazo/reco-trazo.component';

const appRoute : Routes = [
{path:'funDonante', component:RecoDonantesComponent},
{path:'funDonacion', component: RecoUnidadComponent},
{path:'funTrazo', component:RecoTrazoComponent},
{path:'funEmpleado', component: RecoEmpleadosComponent},
{path:'', component:VistaPrincipalComponent}
//{path:'', component:}
];




@NgModule({
  declarations: [
    AppComponent,
    VistaPrincipalComponent,
    RecoDonantesComponent,
    RecoUnidadComponent,
    GraficasComponent,
    RecoEmpleadosComponent,
    RecoTrazoComponent
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
    RouterModule.forRoot(appRoute)
  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
