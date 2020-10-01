import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DadosNovoAgendamento {
    titulo: string;
    horaExecucao: string;
    dataMinima: Date;
    dataMaxima: Date;
    dataExecucao: Date;
}

@Component({
    selector   : 'app-agendamento-novo-dialog',
    templateUrl: './agendamento-novo-dialog.component.html',
    styleUrls  : ['./agendamento-novo-dialog.component.css']
})
export class AgendamentoNovoDialogComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<AgendamentoNovoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public dados: DadosNovoAgendamento) {
    }

    ngOnInit(): void {
    }

    onCancelar(): void {
        this.dialogRef.close();
    }
}
