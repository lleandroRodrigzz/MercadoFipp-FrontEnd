<template>
    <div v-if="formOn == true" class="container border border-dark rounded p-4 mt-4 bg-dark">
        <form @submit.prevent="this.gravar()">
            <div class="mb-3">
                <label for="id" class="form-label" style="color: white;">Id</label>
                <input type="text" id="id" name="id" v-model="id" class="form-control" placeholder="Id do Usuario..."
                    disabled>
            </div>
            <div class="mb-3">
                <label for="nome" class="form-label" style="color: white;">Nome de Usuario</label>
                <input type="text" maxlength="20" id="nome" name="nome" v-model="nome" class="form-control"
                    placeholder="Nome do Usuario..." required>
            </div>
            <div class="mb-3">
                <label for="senha" class="form-label" style="color: white;">Senha</label>
                <input type="text" maxlength="10" id="senha" name="senha" v-model="senha" class="form-control"
                    placeholder="Senha do Usuario..." required>
            </div>
            <div class="mb-3">
                <label for="nivel" class="form-label" style="color: white;">Nivel</label>
                <input type="text" maxlength="1" id="nivel" name="nivel" v-model="nivel" class="form-control"
                    placeholder="Nivel do Usuario..." required>
            </div>
            <button v-if="modoEdicao == false" type="submit" class="btn btn-success">Cadastrar</button>
            <button v-else type="submit" class="btn btn-warning">Editar</button>
        </form>
    </div>
    <div class="container p-4">
        <button class="btn btn-primary" v-if="formOn == false" style="display: flex; justify-content: flex-end"
            @click="mostrarForm(true)">
            Novo Usuario
        </button>

        <button class="btn btn-danger" v-else style="display: flex; justify-content: flex-end"
            @click="mostrarForm(false)">
            Fechar Formulario
        </button>
    </div>
    <div class="container">
        <h1 class="alert alert-secondary">{{ msg }}</h1>
        <table class="table table-secondary table-bordered table-striped table-hover align-middle text-center ">
            <thead class="table-dark">
                <tr>
                    <th>Id</th>
                    <th @click="ordenaNome()">Nome</th>
                    <th>Senha</th>
                    <th>Nivel</th>
                    <th colspan="2">Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="usr in usuarios" :key="usr.id">
                    <td>{{ usr.id }}</td>
                    <td>{{ usr.nome }}</td>
                    <td>{{ usr.senha }}</td>
                    <td>{{ usr.nivel }}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" @click="alterar(usr.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pen-fill" viewBox="0 0 16 16">
                                <path
                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-danger btn-sm" @click="apagar(usr.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path
                                    d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "FormUsuario",
    props: {
        msg: String,
    },
    data() {
        return {
            id: 0,
            nome: "",
            senha: "",
            nivel: 0,
            formOn: false,
            modoEdicao: false,
            usuarios: []
        };
    },
    methods: {
        mostrarForm(flag) {
            if (flag == false) {
                this.id = 0;
                this.nome = "";
                this.senha = "";
                this.nivel = 0;
                this.modoEdicao = false;
            }
            this.formOn = flag;
        },
        gravar() {
            const url = "http://localhost:8080/apis/usuario";
            if (this.modoEdicao) {
                // EDITAR
                const data = {
                    id: this.id,
                    nome: this.nome,
                    senha: this.senha,
                    nivel: this.nivel,
                };
                axios.put(url, data)
                .then((response) => {
                    this.carregarDados();
                    this.mostrarForm(false);
                })
                .catch((error) => {
                    alert("Erro ao editar: " + error);
                });
            }
            else {
                // CADASTRAR
                const data = {
                    nome: this.nome,
                    senha: this.senha,
                    nivel: this.nivel,
                };
                axios.post(url, data)
                .then((response) => {
                    this.carregarDados();
                    this.mostrarForm(false);
                })
                .catch((error) => {
                    alert("Erro ao cadastrar: " + error);
                });
            }

            this.id = 0;
            this.nome = "";
            this.senha = "";
            this.nivel = 0;
            this.modoEdicao = false;
        },
        apagar(id) {
            axios
                .delete("http://localhost:8080/apis/usuario/" + id)
                .then((result) => {
                    this.carregarDados();
                })
                .catch((error) => {
                    alert(error);
                });
        },
        alterar(id) {
            this.modoEdicao = true;
            this.formOn = true;
            axios
                .get("http://localhost:8080/apis/usuario/" + id)
                .then((result) => {
                    let usuario = result.data;
                    this.id = usuario.id;
                    this.nome = usuario.nome;
                    this.senha = usuario.senha;
                    this.nivel = usuario.nivel;
                })
                .catch((error) => {
                    alert(error);
                });
        },
        carregarDados() {
            axios
                .get("http://localhost:8080/apis/usuario")
                .then((result) => {
                    this.usuarios = result.data;
                })
                .catch((error) => {
                    alert(error);
                });
        },
        ordenaNome() {
            this.usuarios.sort((a, b) => a.nome.localeCompare(b.nome))
        }
    },
    mounted() {
        this.carregarDados();
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
