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
import { LoginComponent } from './components/login/login/login.component';
import { ExecutavelListaComponent } from './components/executavel/executavel-lista/executavel-lista.component';
import { ExecutavelEdicaoComponent } from './components/executavel/executavel-edicao/executavel-edicao.component';
import { ExecutavelComponent } from './components/executavel/executavel.component';
import { ExecutavelInicioComponent } from './components/executavel/executavel-inicio/executavel-inicio.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';
import { ExecucaoListaComponent } from './components/execucao/execucao-lista/execucao-lista.component';
import { ExecucaoDetalhesComponent } from './components/execucao/execucao-detalhes/execucao-detalhes.component';
import { ExecucaoInicioComponent } from './components/execucao/execucao-inicio/execucao-inicio.component';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { AgendamentoNovoDialogComponent } from './components/agendamentos/agendamento-novo-dialog/agendamento-novo-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        CadastroUsuarioComponent,
        LoginComponent,
        ExecutavelListaComponent,
        ExecutavelEdicaoComponent,
        ExecutavelComponent,
        ExecutavelInicioComponent,
        ExecucaoComponent,
        ExecucaoListaComponent,
        ExecucaoDetalhesComponent,
        ExecucaoInicioComponent,
        AgendamentosComponent,
        AgendamentoNovoDialogComponent
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
