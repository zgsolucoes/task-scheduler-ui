import { Injectable } from '@angular/core';
import { Evento, Execucao, StatusEvento } from '../models/execucao.model';
import { ExecutavelService } from './executavel.service';
import { Executavel } from '../models/executavel.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExecucaoService {
    private execucoes: Execucao[] = [];
    listaExecucoesSubject = new Subject<Execucao[]>();

    constructor(private executavelService: ExecutavelService) {
        const executavel = this.executavelService.getExecutavelPorId(1);
        const executavel2 = this.executavelService.getExecutavelPorId(2);

        const execucao = new Execucao(1, executavel);

        const eventos = [
            new Evento('Buscando credenciais necessárias', StatusEvento.Sucesso),
            new Evento('Geração do relatório concluída com sucesso', StatusEvento.Sucesso),
        ];
        execucao.adicionarEventos(eventos);
        execucao.concluir();

        const execucao2 = new Execucao(2, executavel2);
        const eventosExecucao2 = [
            new Evento('Buscando credenciais necessárias', StatusEvento.Sucesso),
            new Evento('Credenciais inválidas', StatusEvento.Advertencia),
            new Evento('Não foi possível atualizar os dados do BI', StatusEvento.Erro),
        ];
        execucao2.adicionarEventos(eventosExecucao2);
        execucao2.concluirComErro();

        this.execucoes.push(
            execucao,
            execucao2
        );
    }

    getExecucaoPorId(id: number): Execucao {
        const execucao = this.execucoes.find(
            (execucaoAtual: Execucao) => {
                return execucaoAtual.id === id;
            }
        );

        return execucao;
    }

    getExecucoes(): Execucao[] {
        return this.execucoes.slice();
    }

    criarNovaExecucao(executavel: Executavel): void {
        const execucao = new Execucao(this.getRandomId(), executavel);
        this.adicionarExecucao(execucao);
    }

    adicionarExecucao(execucao: Execucao): void {
        this.execucoes.push(execucao);
        this.dispararEventoAtualizacaoListaExecucoes();
    }

    atualizarExecucao(execucaoAtualizada: Execucao): void {
        const posicaoNaLista = this.execucoes.map((execucao: Execucao) => {
            return execucao.id;
        }).indexOf(execucaoAtualizada.id);
        this.execucoes[posicaoNaLista] = execucaoAtualizada;
        this.dispararEventoAtualizacaoListaExecucoes();
    }

    pararExecucao(execucao: Execucao): void {
        const evento = new Evento('Pedido de interrupção disparado pelo usuário', StatusEvento.Erro);
        execucao.adicionarEvento(evento);
        execucao.concluirComErro();
        this.atualizarExecucao(execucao);
    }

    reexecutarExecucao(execucao: Execucao): void {
        const novaExecucao = execucao.clone();
        this.adicionarExecucao(novaExecucao);
    }

    getRandomId(): number {
        return Math.floor(Math.random() * 100);
    }

    dispararEventoAtualizacaoListaExecucoes(): void {
        this.listaExecucoesSubject.next(this.execucoes.slice());
    }
}
