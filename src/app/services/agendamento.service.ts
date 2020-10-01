import { Injectable } from '@angular/core';
import { Agendamento } from '../models/agendamento.model';
import { ExecutavelService } from './executavel.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AgendamentoService {
    private agendamentos: Agendamento[] = [];
    listaAgendamentosSubject = new Subject<Agendamento[]>();

    constructor(private executavelService: ExecutavelService) {
        const executavel = executavelService.getExecutavelPorId(1);
        const executavel2 = executavelService.getExecutavelPorId(2);

        const agendamento = new Agendamento(1, executavel, new Date(), '18:30');
        const agendamento2 = new Agendamento(2, executavel2, new Date(), '22:00');

        this.agendamentos.push(...[agendamento, agendamento2]);
    }

    getAgendamentos(): Agendamento[] {
        return this.agendamentos.slice();
    }

    adicionarAgendamento(agendamento: Agendamento): void {
        this.agendamentos.push(agendamento);
        this.dispararEventoAtualizacaoListaAgendamentos();
    }

    removerAgendamento(id: number): void {
        const posicaoNaLista = this.agendamentos.map((agendamento: Agendamento) => {
            return agendamento.id;
        }).indexOf(id);

        this.agendamentos.splice(posicaoNaLista, 1);
        this.dispararEventoAtualizacaoListaAgendamentos();
    }

    private dispararEventoAtualizacaoListaAgendamentos(): void {
        this.listaAgendamentosSubject.next(this.agendamentos.slice());
    }
}
