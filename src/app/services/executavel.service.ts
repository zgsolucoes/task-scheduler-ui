import { Injectable } from '@angular/core';
import { Executavel } from '../models/executavel.model';
import { Parametro } from '../models/parametro.model';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ExecutavelService {
    private executaveis: Executavel[] = [
        new Executavel(1, 'Gerar relatório de vendas da semana',
            'Gera relatório em formato XLSX de vendas da semana e salva na pasta \'Meus Documentos\'',
            'TaskGerarRelatorioSemanalVendas',
            [
                new Parametro('nomeRelatorio', 'Relatório Vendas Semanal'),
                new Parametro('dataInicio', '28/09/2020'),
            ]),
        new Executavel(2, 'Atualizar os dados do painel de BI',
            'Atualiza o painel de BI com os últimos dados produzidos pelo sistema',
            'TaskAtualizarDadosBI',
            [
                new Parametro('nomePainel', 'Painel Analítico de Gastos')
            ]),
        new Executavel(3, 'Enviar e-mail parabenizando os aniversariantes do mês',
            'Envia e-mail de felicitação aos aniversariantes do mês da sua equipe.',
            'TaskEnviarEmailAniversariantesMes',
            [
                new Parametro('mes', 'setembro')
            ])
    ];
    listaExecutaveisSubject = new Subject<Executavel[]>();

    getExecutaveis(): Executavel[] {
        return this.executaveis.slice();
    }

    adicionarExecutavel(executavel: Executavel): void {
        this.executaveis.push(executavel);
        this.disparaEventoAtualizacaoListaExecutaveis();
    }

    removerExecutavel(id: number): void {
        const posicaoNaLista = this.executaveis.map((executavel: Executavel) => {
            return executavel.id;
        }).indexOf(id);
        this.executaveis.splice(posicaoNaLista, 1);
        this.disparaEventoAtualizacaoListaExecutaveis();
    }

    atualizarExecutavel(id: number, executavelAtualizado: Executavel): void {
        const posicaoNaLista = this.executaveis.map((executavel: Executavel) => {
            return executavel.id;
        }).indexOf(id);
        this.executaveis[posicaoNaLista] = executavelAtualizado;
        this.disparaEventoAtualizacaoListaExecutaveis();
    }

    getExecutavelPorId(id: number): Executavel {
        const executavel = this.executaveis.find(
            (executavelAtual: Executavel) => {
                return executavelAtual.id === id;
            }
        );
        return executavel;
    }

    private disparaEventoAtualizacaoListaExecutaveis(): void {
        this.listaExecutaveisSubject.next(this.executaveis.slice());
    }
}
