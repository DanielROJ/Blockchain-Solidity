import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {APP_BASE_HREF} from '@angular/common';
import { OverlayModule } from "@angular/cdk/overlay";
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatToolbarModule,
  MatSnackBarModule
} from '@angular/material';
import { RealizarEncuestaComponent } from './realizar-encuesta/realizar-encuesta.component';
import { RegistroEntitiesComponent } from './registro-entities/registro-entities.component';

const appRoute : Routes = [
  {path:'funEncuestador', component:RealizarEncuestaComponent},
  {path:'', component:RegistroEntitiesComponent}
];



@NgModule({
  declarations: [
    AppComponent,
    RealizarEncuestaComponent,
    RegistroEntitiesComponent
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
    MatSnackBarModule,
    RouterModule.forRoot(appRoute),
    OverlayModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: ''}],
  bootstrap: [AppComponent]
})
export class AppModule { }
