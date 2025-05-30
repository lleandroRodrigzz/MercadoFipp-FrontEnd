<template>
  <Menu />
  <div class="container mt-4">
    <h2 class="mb-4 text-start" style="color: black">Produtos disponíveis</h2>

    <!-- Filtro -->
    <form class="row mb-4" @submit.prevent="filtrar">
      <div class="col-md-4 mb-2">
        <input v-model="termoBusca" type="text" class="form-control" placeholder="O que procura?" />
      </div>
      <div class="col-md-3 mb-2">
        <select v-model="categoriaSelecionada" class="form-select">
          <option value="">Todas as categorias</option>
          <option v-for="cat in categorias" :key="cat.id" :value="cat.nome">
            {{ cat.nome }}
          </option>
        </select>
      </div>
      <div class="col-md-3 mb-2">
        <select v-model="ordemPreco" class="form-select">
          <option value="">Ordenar por preço</option>
          <option value="asc">Menor preço</option>
          <option value="desc">Maior preço</option>
        </select>
      </div>
      <div class="col-md-2 mb-2">
        <button class="btn btn-primary w-100" type="submit">Filtrar</button>
      </div>
    </form>

    <!-- Lista de Produtos -->
    <div class="row">
      <div class="col-md-4 col-sm-6 mb-4" v-for="anuncio in anunciosFiltrados" :key="anuncio.id">
        <div class="card h-100 shadow-sm">
          <img
              :src="anuncio.fotos.length > 0
              ? 'http://localhost:8080/uploads/' + anuncio.fotos[0].file
              : 'https://via.placeholder.com/200x150?text=Sem+Imagem'"
              class="card-img-top p-3"
              alt="Imagem do produto"
          >
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ anuncio.titulo }}</h5>
            <p class="card-text text-muted">{{ anuncio.descricao }}</p>
            <strong class="mt-auto text-success">R$ {{ anuncio.preco.toFixed(2) }}</strong>
            <router-link class="btn btn-outline-primary mt-3" :to="`/produto/${anuncio.id}`">Visitar Anúncio</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Menu from '@/components/layouts/Menu.vue';

export default {
  name: "HomeProdutos",
  components: { Menu },
  data() {
    return {
      anuncios: [],
      categorias: [],
      termoBusca: '',
      categoriaSelecionada: '',
      ordemPreco: ''
    };
  },
  computed: {
    anunciosFiltrados() {
      let lista = [...this.anuncios];

      //  Filtro por texto
      if (this.termoBusca.trim() !== '') {
        const termo = this.termoBusca.toLowerCase();
        lista = lista.filter(a =>
            a.titulo.toLowerCase().includes(termo) ||
            a.descricao.toLowerCase().includes(termo)
        );
      }

      // Filtro por categoria
      if (this.categoriaSelecionada !== '') {
        lista = lista.filter(a => a.categoria?.nome === this.categoriaSelecionada);
      }

      // Ordenação por preço
      if (this.ordemPreco === 'asc') {
        lista.sort((a, b) => a.preco - b.preco);
      } else if (this.ordemPreco === 'desc') {
        lista.sort((a, b) => b.preco - a.preco);
      }

      return lista;
    }
  },
  mounted() {
    axios.get("http://localhost:8080/apis/anuncio")
        .then((res) => {
          this.anuncios = res.data;
        })
        .catch((err) => {
          alert("Erro ao carregar anúncios: " + err);
        });

    axios.get("http://localhost:8080/apis/categoria")
        .then((res) => {
          this.categorias = res.data;
        })
        .catch((err) => {
          alert("Erro ao carregar categorias: " + err);
        });
  },
  methods: {
    filtrar() {
      // apenas impede recarregamento, o filtro acontece automaticamente via computed
    }
  }
};
</script>

<style scoped>
.card-img-top {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: center;
}
</style>
