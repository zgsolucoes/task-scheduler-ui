import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    usuarios: Usuario[] = [
        new Usuario('Luiz Henrique', 'luizhenrique@zgsolucoes.com.br', new Date(), '12345678')
    ];
    private usuarioLogado: Usuario;

    constructor() {
    }

    adicionarUsuario(usuario: Usuario): void {
        this.usuarios.push(usuario);
    }

    realizarLogin(email: string, senha: string): boolean {
        const usuarioValido = this.usuarios.find(usuario =>
            usuario.email === email && usuario.senha === senha
        );

        if (usuarioValido) {
            this.usuarioLogado = usuarioValido;
        }

        return usuarioValido !== undefined;
    }

    existeUsuarioAutenticado(): boolean {
        return this.usuarioLogado !== undefined;
    }

    getNomeUsuarioLogado(): string {
        return this.usuarioLogado.nome;
    }

    realizarLogout(): void {
        this.usuarioLogado = undefined;
    }
}
