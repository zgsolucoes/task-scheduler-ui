import { Executavel } from './executavel.model';

export enum StatusExecucao {
    Concluido  = 'Concluído',
    EmExecucao = 'Em Execução',
    Erro       = 'Erro',
}

export enum StatusEvento {
    Sucesso     = 'Sucesso',
    Advertencia = 'Advertência',
    Erro        = 'Erro',
}

export class Evento {
    descricao: string;
    data: Date;
    status: StatusEvento;

    constructor(descricao: string, status: StatusEvento) {
        this.descricao = descricao;
        this.data = new Date();
        this.status = status;
    }

    comAdvertencia(): boolean {
        return this.status === StatusEvento.Advertencia;
    }

    comErro(): boolean {
        return this.status === StatusEvento.Erro;
    }

    comSucesso(): boolean {
        return this.status === StatusEvento.Sucesso;
    }

    definirAdvertencia(): void {
        this.status = StatusEvento.Advertencia;
    }

    definirErro(): void {
        this.status = StatusEvento.Erro;
    }

}

export class Execucao {
    id: number;
    data: Date;
    progresso: number;
    manual: boolean;
    executavel: Executavel;
    status: StatusExecucao;
    eventos: Evento[];


    constructor(id: number, executavel: Executavel) {
        this.id = id;
        this.executavel = executavel;
        this.data = new Date();
        this.progresso = 20;
        this.status = StatusExecucao.EmExecucao;
        this.eventos = [];
    }

    emExecucao(): boolean {
        return this.status === StatusExecucao.EmExecucao && (this.progresso > 0 && this.progresso < 100);
    }

    concluidaComSucesso(): boolean {
        return this.status === StatusExecucao.Concluido && (this.progresso === 100);
    }

    concluidaComErro(): boolean {
        return this.status === StatusExecucao.Erro && (this.progresso === 100);
    }

    concluir(): void {
        this.status = StatusExecucao.Concluido;
        this.progresso = 100;
    }

    concluirComErro(): void {
        this.status = StatusExecucao.Erro;
        this.progresso = 100;
    }

    adicionarEvento(evento: Evento): void {
        this.eventos.push(evento);
    }

    adicionarEventos(eventos: Evento[]): void {
        this.eventos.push(...eventos);
    }

    clone(): Execucao {
        return new Execucao(this.getRandomId(), this.executavel);
    }

    getRandomId(): number {
        return Math.floor(Math.random() * 100);
    }
}

