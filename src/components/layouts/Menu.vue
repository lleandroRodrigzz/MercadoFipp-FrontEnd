<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #ffe600;">
    <div class="container-fluid">
      <router-link class="nav-link" to="/home">
        <img src="../../assets/MercadoFippLogo.png" alt="LogoMercadoFipp" height="80rem">
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" to="/home">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/comprar">Comprar</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/anunciarProduto">Anunciar</router-link>
          </li>
          <li class="nav-item dropdown" v-if="nivel === '1'">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Admin
            </a>
            <ul class="dropdown-menu">
              <li><router-link class="dropdown-item" to="/form-usuario">Usuários</router-link></li>
              <li><router-link class="dropdown-item" to="/form-categoria">Categorias</router-link></li>
            </ul>
          </li>
        </ul>

        <div class="d-flex align-items-center me-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
               class="bi bi-person-circle me-1" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
            <path fill-rule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37
               C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
          </svg>
          <span style="font-weight: bold;">{{ usuarioNome }}</span>
        </div>

        <button class="btn btn-danger m-2" @click="sair">Sair</button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Menu",
  data(){
    return {
      nivel: null,
      usuarioNome: ""
    }
  },
  mounted() {
    this.nivel = localStorage.getItem("nivel");
    this.usuarioNome = localStorage.getItem("usuarioNome");
  },
  methods: {
    sair() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>