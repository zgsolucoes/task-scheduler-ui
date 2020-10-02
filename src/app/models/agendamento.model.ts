import { Executavel } from './executavel.model';

export class Agendamento {
    id: number;
    executavel: Executavel;
    dataExecucao: Date;
    horaExecucao: string;

    constructor(id: number, executavel: Executavel, dataExecucao: Date, horaExecucao: string) {
        this.id = id;
        this.executavel = executavel;
        this.dataExecucao = dataExecucao;
        this.horaExecucao = horaExecucao;
    }
}
