import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/usuarios/cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './components/login/login/login.component';
import { ExecutavelComponent } from './components/executavel/executavel.component';
import { ExecutavelInicioComponent } from './components/executavel/executavel-inicio/executavel-inicio.component';
import { ExecutavelEdicaoComponent } from './components/executavel/executavel-edicao/executavel-edicao.component';
import { ExecucaoComponent } from './components/execucao/execucao.component';
import { ExecucaoInicioComponent } from './components/execucao/execucao-inicio/execucao-inicio.component';
import { ExecucaoDetalhesComponent } from './components/execucao/execucao-detalhes/execucao-detalhes.component';
import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'cadastro', component: CadastroUsuarioComponent },
    { path: 'login', component: LoginComponent },
    {
        path     : 'executaveis',
        component: ExecutavelComponent,
        children : [
            { path: '', component: ExecutavelInicioComponent, pathMatch: 'full' },
            { path: 'nova', component: ExecutavelEdicaoComponent },
            { path: ':id/edicao', component: ExecutavelEdicaoComponent },
        ],
    },
    {
        path     : 'execucoes',
        component: ExecucaoComponent,
        children : [
            { path: '', component: ExecucaoInicioComponent, pathMatch: 'full' },
            { path: ':id/detalhe', component: ExecucaoDetalhesComponent },
        ]
    },
    {
        path     : 'agendamentos',
        component: AgendamentosComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
