<template>
  <div v-if="formOn == true" class="container border border-dark rounded p-4 mt-4 bg-dark">
    <form @submit.prevent="this.gravar()">
      <div class="mb-3">
        <label for="idcat" class="form-label" style="color: white;">Id</label>
        <input type="text" id="id" name="id" v-model="id" class="form-control" placeholder="Id da Categoria..."
          disabled>
      </div>
      <div class="mb-3">
        <label for="name" class="form-label" style="color: white;">Nome</label>
        <input type="text" id="name" name="name" v-model="nome" class="form-control" placeholder="Nome da Categoria..."
          required>
      </div>
      <button type="submit" class="btn btn-success">Cadastrar</button>
    </form>
  </div>
  <div class="container p-4">
    <button class="btn btn-primary" v-if="formOn == false" style="display: flex; justify-content: flex-end"
      @click="mostrarForm(true), this.id = 0">
      Nova Categoria
    </button>

    <button class="btn btn-danger" v-else style="display: flex; justify-content: flex-end" @click="mostrarForm(false)">
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
          <th colspan="2">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cat in categorias" :key="cat.id">
          <td>{{ cat.id }}</td>
          <td>{{ cat.nome }}</td>
          <td>
            <button class="btn btn-warning btn-sm" @click="alterar(cat.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill"
                viewBox="0 0 16 16">
                <path
                  d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001" />
              </svg>
            </button>
          </td>
          <td>
            <button class="btn btn-danger btn-sm" @click="apagar(cat.id)">
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
  name: "FormCategoria",
  props: {
    msg: String,
  },
  data() {
    return { id: 0, nome: "", formOn: false, categorias: [] };
  },
  methods: {
    mostrarForm(flag) {
      this.formOn = flag;
    },
    gravar() {
      const url = "http://localhost:8080/apis/categoria";
      const data = { id: this.id, nome: this.nome };
      axios
        .post(url, data)
        .then((response) => {
          this.carregarDados();
          console.log("Sucesso:", response.data);
          this.mostrarForm(false);
          this.nome = "";
        })
        .catch((error) => {
          alert("Erro: " + error);
        });
    },
    apagar(id) {
      axios
        .delete("http://localhost:8080/apis/categoria/" + id)
        .then((result) => {
          this.carregarDados();
        })
        .catch((error) => {
          alert(error);
        });
    },
    alterar(id) {
      this.formOn = true;
      axios
        .get("http://localhost:8080/apis/categoria/" + id)
        .then((result) => {
          let categoria = result.data;
          this.id = categoria.id;
          this.nome = categoria.nome;
        })
        .catch((error) => {
          alert(error);
        });
    },
    carregarDados() {
      axios
        .get("http://localhost:8080/apis/categoria")
        .then((result) => {
          this.categorias = result.data;
        })
        .catch((error) => {
          alert(error);
        });
    },
    ordenaNome() {
      this.categorias.sort((a, b) => a.nome.localeCompare(b.nome))
    }
  },
  mounted() {
    this.carregarDados();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
