import { Component, OnDestroy, OnInit } from '@angular/core';
import { Executavel } from '../../../models/executavel.model';
import { ExecutavelService } from '../../../services/executavel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExecucaoService } from '../../../services/execucao.service';

@Component({
    selector   : 'app-executavel-lista',
    templateUrl: './executavel-lista.component.html',
    styleUrls  : ['./executavel-lista.component.css']
})
export class ExecutavelListaComponent implements OnInit, OnDestroy {
    executaveis: Executavel[];
    subscricao: Subscription;

    constructor(private executavelService: ExecutavelService,
                private execucaoService: ExecucaoService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
        this.subscricao = this.executavelService.listaExecutaveisSubject.subscribe(
            (executaveis: Executavel[]) => {
                this.executaveis = executaveis;
            }
        );
        this.executaveis = this.executavelService.getExecutaveis();
    }

    ngOnDestroy(): void {
        this.subscricao.unsubscribe();
    }

    onNovoExecutavel(): void {
        this.router.navigate(['nova'], { relativeTo: this.activatedRoute });
    }

    onRemoverExecutavel(executavel: Executavel): void {
        if (confirm('Deseja realmente remover o executável: ' + executavel.titulo + '?')) {
            this.executavelService.removerExecutavel(executavel.id);
            this.router.navigate(['executaveis']);
        }
    }

    onSelecionarExecutavel(execucatavel: Executavel): void {
        this.router.navigate([execucatavel.id, 'edicao'], { relativeTo: this.activatedRoute });
    }

    onDispararExecucao(executavel: Executavel): void {
        if (confirm('Deseja realmente iniciar a execução: ' + executavel.titulo + '?')) {
            this.execucaoService.criarNovaExecucao(executavel);
            this.router.navigate(['execucoes']);
        }
    }
}
