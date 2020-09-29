import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExecutavelService } from '../../../services/executavel.service';
import { Executavel } from '../../../models/executavel.model';

@Component({
    selector   : 'app-executavel-edicao',
    templateUrl: './executavel-edicao.component.html',
    styleUrls  : ['./executavel-edicao.component.css']
})
export class ExecutavelEdicaoComponent implements OnInit {
    modoEdicao = false;
    idExecutavelAtual: number;
    formularioExecutavel: FormGroup;
    tituloFormControl: FormControl;
    descricaoFormControl: FormControl;
    classeExecutavelFormControl: FormControl;
    parametrosFormArray: FormArray;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private executavelService: ExecutavelService) {
    }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(
            (params: Params) => {
                this.idExecutavelAtual = +params.id;
                this.modoEdicao = params.id != null;
                this.iniciarFormulario();
            });
    }

    private iniciarFormulario(): void {
        let tituloExecutavel = '';
        let descricaoExecutavel = '';
        let classeExecutavel = '';

        this.parametrosFormArray = new FormArray([]);

        if (this.modoEdicao) {
            const executavel = this.executavelService.getExecutavelPorId(this.idExecutavelAtual);
            tituloExecutavel = executavel.titulo;
            classeExecutavel = executavel.classeExecutavel;
            descricaoExecutavel = executavel.descricao;

            if (executavel.parametros) {
                for (const parametro of executavel.parametros) {
                    this.parametrosFormArray.push(
                        new FormGroup({
                            nome : new FormControl(parametro.nome, [Validators.required]),
                            valor: new FormControl(parametro.valor, [Validators.required]),
                        })
                    );
                }
            }
        }

        this.tituloFormControl = new FormControl(tituloExecutavel, [Validators.required]);
        this.classeExecutavelFormControl = new FormControl(classeExecutavel, [Validators.required]);
        this.descricaoFormControl = new FormControl(descricaoExecutavel, []);

        this.formularioExecutavel = new FormGroup({
            titulo          : this.tituloFormControl,
            classeExecutavel: this.classeExecutavelFormControl,
            descricao       : this.descricaoFormControl,
            parametros      : this.parametrosFormArray
        });

    }

    onSubmit(): void {
        const titulo = this.formularioExecutavel.value.titulo;
        const classeExecutavel = this.formularioExecutavel.value.classeExecutavel;
        const descricao = this.formularioExecutavel.value.descricao;
        const parametros = this.formularioExecutavel.value.parametros;

        const executavel = new Executavel(this.getRandomId(), titulo, descricao, classeExecutavel, parametros);

        if (this.modoEdicao) {
            this.executavelService.atualizarExecutavel(this.idExecutavelAtual, executavel);
        } else {
            this.executavelService.adicionarExecutavel(executavel);
        }

        this.formularioExecutavel.reset();
        this.onCancelar();
    }

    getRandomId(): number {
        return Math.floor(Math.random() * 100);
    }

    onNovoParametro(): void {
        this.parametrosFormArray.push(
            new FormGroup({
                nome : new FormControl('', [Validators.required]),
                valor: new FormControl('', [Validators.required]),
            })
        );
    }

    onExcluirParametro(indice: number): void {
        this.parametrosFormArray.removeAt(indice);
    }

    get parametrosControl(): AbstractControl[] {
        return this.parametrosFormArray.controls;
    }

    onCancelar(): void {
        if (this.modoEdicao) {
            this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        } else {
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }
    }
}
