import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
    selector   : 'app-cadastro-usuario',
    templateUrl: './cadastro-usuario.component.html',
    styleUrls  : ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {
    esconderSenha = true;
    esconderConfirmarSenha = true;
    formularioCadastro: FormGroup;

    nomeFormControl = new FormControl('', [
        Validators.required,
    ]);

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    senhaFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
    ]);

    confirmeFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
    ]);

    dataNascimentoFormControl = new FormControl('', [
        Validators.required,
        Validators.minLength(8),
    ]);
    dataInicio = new Date(1992, 0, 1);
    dataMinima = new Date(1940, 0, 1);
    dataMaxima = new Date();


    constructor(private usuarioService: UsuarioService) {
    }

    ngOnInit(): void {
        this.formularioCadastro = new FormGroup({
                nome          : this.nomeFormControl,
                email         : this.emailFormControl,
                dataNascimento: this.dataNascimentoFormControl,
                senha         : this.senhaFormControl,
                confirmeSenha : this.confirmeFormControl,
            }, { validators: passwordMatchValidator }
        );
    }

    onDigitarSenha(): void {
        if (this.formularioCadastro.hasError('senhasNaoConferem')) {
            this.confirmeFormControl.setErrors([{ senhasNaoConferem: true }]);
        } else {
            this.confirmeFormControl.setErrors(null);
        }
    }

    onSubmit(): void {
        const nome = this.formularioCadastro.value.nome;
        const email = this.formularioCadastro.value.email;
        const dataNascimento = this.formularioCadastro.value.dataNascimento;
        const senha = this.formularioCadastro.value.senha;

        const usuario = new Usuario(nome, email, dataNascimento, senha);
        this.usuarioService.adicionarUsuario(usuario);
        this.formularioCadastro.reset();
        console.log(this.usuarioService.usuarios.length);
        console.log(usuario);
    }

}

export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('senha').value === formGroup.get('confirmeSenha').value) {
        return null;
    } else {
        return { senhasNaoConferem: true };
    }
};
