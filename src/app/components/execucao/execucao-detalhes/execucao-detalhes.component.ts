import { Component, OnInit } from '@angular/core';
import { Execucao } from '../../../models/execucao.model';
import { ExecucaoService } from '../../../services/execucao.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector   : 'app-execucao-detalhes',
    templateUrl: './execucao-detalhes.component.html',
    styleUrls  : ['./execucao-detalhes.component.css']
})
export class ExecucaoDetalhesComponent implements OnInit {
    execucao: Execucao;
    id: number;

    constructor(private execucaoService: ExecucaoService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.id = +params.id;
                this.execucao = this.execucaoService.getExecucaoPorId(this.id);
            });
    }

}
