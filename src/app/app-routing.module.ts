import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './components/usuarios/cadastro-usuario/cadastro-usuario.component';
import { LoginComponent } from './components/login/login/login.component';
import { ExecutavelComponent } from './componentes/executavel/executavel.component';
import { ExecutavelInicioComponent } from './componentes/executavel/executavel-inicio/executavel-inicio.component';
import { ExecutavelEdicaoComponent } from './componentes/executavel/executavel-edicao/executavel-edicao.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
