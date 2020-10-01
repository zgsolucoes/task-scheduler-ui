import { Component, OnDestroy, OnInit } from '@angular/core';
import { Agendamento } from '../../models/agendamento.model';
import { AgendamentoService } from '../../services/agendamento.service';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'app-agendamentos',
    templateUrl: './agendamentos.component.html',
    styleUrls  : ['./agendamentos.component.css']
})
export class AgendamentosComponent implements OnInit, OnDestroy {
    agendamentos: Agendamento[];
    inscricao: Subscription;

    constructor(private agendamentoService: AgendamentoService) {
    }

    ngOnInit(): void {
        this.inscricao = this.agendamentoService.listaAgendamentosSubject.subscribe(
            (agendamentos: Agendamento[]) => {
                this.agendamentos = agendamentos;
            }
        );
        this.agendamentos = this.agendamentoService.getAgendamentos();
    }

    onRemoverAgendamento(agendamento: Agendamento): void {
        if (confirm('Deseja realmente remover o agendamento: ' + agendamento.executavel.titulo + '?')) {
            this.agendamentoService.removerAgendamento(agendamento.id);
        }
    }

    ngOnDestroy(): void {
        this.inscricao.unsubscribe();
    }

}
