import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraficoComponent } from './grafico/grafico.component';
import { ToastComponent } from './toast/toast.component';

@NgModule({
  declarations: [AppComponent, ToastComponent, GraficoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    MatIconModule,
    AngularSvgIconModule,
    HttpClientModule,
    MatCardModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatProgressBarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    CommonModule,
    MatProgressSpinnerModule,
    NgxFileDropModule,
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
