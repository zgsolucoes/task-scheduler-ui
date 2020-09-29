import { Component, OnDestroy, OnInit } from '@angular/core';
import { Execucao } from '../../../models/execucao.model';
import { ExecucaoService } from '../../../services/execucao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'app-execucao-lista',
    templateUrl: './execucao-lista.component.html',
    styleUrls  : ['./execucao-lista.component.css']
})
export class ExecucaoListaComponent implements OnInit, OnDestroy {
    execucoes: Execucao[];
    inscricao: Subscription;

    constructor(private execucaoService: ExecucaoService,
                private router: Router,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.inscricao = this.execucaoService.listaExecucoesSubject.subscribe(
            (execucoes: Execucao[]) => {
                this.execucoes = execucoes;
            }
        );
        this.execucoes = this.execucaoService.getExecucoes();
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

    onSelecionarExecucao(execucao: Execucao): void {
        this.router.navigate([execucao.id, 'detalhe'], { relativeTo: this.activatedRoute });
    }

    reexecutarExecucao(execucao: Execucao): void {
        if (confirm('Deseja reexecutar: ' + execucao.executavel.titulo + '?')) {
            this.execucaoService.reexecutarExecucao(execucao);
        }
    }

    pararExecucao(execucao: Execucao): void {
        if (confirm('Deseja realmente parar a execução: ' + execucao.executavel.titulo + '?')) {
            this.execucaoService.pararExecucao(execucao);
        }
    }

}
