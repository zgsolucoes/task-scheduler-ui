export class Usuario {
    nome: string;
    email: string;
    dataNascimento: Date;
    senha: string;

    constructor(nome: string, email: string, dataNascimento: Date, senha: string) {
        this.nome = nome;
        this.email = email;
        this.dataNascimento = dataNascimento;
        this.senha = senha;
    }
}
