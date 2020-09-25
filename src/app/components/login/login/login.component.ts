import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
    selector   : 'app-login',
    templateUrl: './login.component.html',
    styleUrls  : ['./login.component.css']
})
export class LoginComponent implements OnInit {
    esconderSenha = true;
    mensagemErro: string;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email
    ]);

    senhaFormControl = new FormControl('', [
        Validators.required
    ]);

    formularioLogin: FormGroup;

    constructor(private usuarioService: UsuarioService) {
    }

    ngOnInit(): void {
        this.formularioLogin = new FormGroup({
            email: this.emailFormControl,
            senha: this.senhaFormControl,
        });
    }

    onSubmit(): void {
        const emailInformado = this.formularioLogin.value.email;
        const senhaInformada = this.formularioLogin.value.senha;

        const logadoComSucesso = this.usuarioService.realizarLogin(emailInformado, senhaInformada);

        if (logadoComSucesso) {
            console.log('Login realizado com sucesso!');
        } else {
            console.log('Credenciais incorretas!');
            this.mensagemErro = 'Crendenciais incorretas!';
        }
    }

    onDigitarAlgo(): void {
        this.mensagemErro = '';
    }

}
