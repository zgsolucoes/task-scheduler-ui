import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { AngularMaterialModule } from './angular-material.module';
import { CadastroUsuarioComponent } from './components/usuarios/cadastro-usuario/cadastro-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
    declarations: [
        AppComponent,
        CadastroUsuarioComponent
    ],
    imports     : [
        CommonModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        AngularMaterialModule,
        NgxMaskModule.forRoot()
    ],
    providers   : [
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
    ],
    bootstrap   : [AppComponent]
})
export class AppModule {}
