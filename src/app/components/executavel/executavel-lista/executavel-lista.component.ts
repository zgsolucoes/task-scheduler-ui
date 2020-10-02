import { Component, OnDestroy, OnInit } from '@angular/core';
import { Executavel } from '../../../models/executavel.model';
import { ExecutavelService } from '../../../services/executavel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExecucaoService } from '../../../services/execucao.service';
import { MatDialog } from '@angular/material/dialog';
import { AgendamentoNovoDialogComponent } from '../../agendamentos/agendamento-novo-dialog/agendamento-novo-dialog.component';
import { Agendamento } from '../../../models/agendamento.model';
import { AgendamentoService } from '../../../services/agendamento.service';

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
                private agendamentoService: AgendamentoService,
                private activatedRoute: ActivatedRoute,
                private router: Router,
                private dialog: MatDialog) {
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

    abrirDialogAgendamento(executavel: Executavel): void {
        const dialogRef = this.dialog.open(AgendamentoNovoDialogComponent, {
            width: '300px',
            data : {
                titulo      : executavel.titulo,
                dataMinima  : new Date(),
                dataMaxima  : new Date(2070, 0, 1),
                dataExecucao: new Date(),
            }
        });

        dialogRef.afterClosed().subscribe(resultado => {
            const agendamento = new Agendamento(123, executavel, resultado.dataExecucao, resultado.horaExecucao);
            this.agendamentoService.adicionarAgendamento(agendamento);
            this.router.navigate(['agendamentos']);
        });
    }
}
