import { Component, OnDestroy, OnInit } from '@angular/core';
import { Executavel } from '../../../models/executavel.model';
import { ExecutavelService } from '../../../services/executavel.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector   : 'app-executavel-lista',
    templateUrl: './executavel-lista.component.html',
    styleUrls  : ['./executavel-lista.component.css']
})
export class ExecutavelListaComponent implements OnInit, OnDestroy {
    executaveis: Executavel[];
    subscricao: Subscription;

    constructor(private executavelService: ExecutavelService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
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
        if (confirm('Deseja realmente iniciar a execução: ' + executavel.titulo + '?')) {
            this.executavelService.removerExecutavel(executavel.id);
            this.router.navigate(['executaveis']);
            console.log('removeu executavel');
        }
    }

    onSelecionarExecutavel(execucatavel: Executavel): void {
        this.router.navigate([execucatavel.id, 'edicao'], { relativeTo: this.activatedRoute });
    }
}
