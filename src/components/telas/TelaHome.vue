<template>
    <Menu />
    <div class="jumbotron">
      <h1 class="display-4">Bem-vindo ao Sistema <span style="color: #edea00">Mercado</span><span style="color: #0d6efd">Fipp</span>!</h1>
      <p class="lead">Compre e anuncie com super facilidade em nossa comunidade.</p>
      <hr class="my-4">
      <h5 class="p-2">Oque você quer fazer USUARIO ?</h5>
      <div class="d-flex justify-content-center gap-3 mt-3">
        <router-link class="btn btn-primary btn-lg mx-2" to="/comprar">Comprar</router-link>
        <router-link class="btn btn-primary btn-lg mx-2" to="/anunciarProduto">Anunciar</router-link>
      </div>
      <img class="mt-3" src="../../assets/MercadoFippLogo.png" alt="LogoMercadoFipp" height="300rem">
    </div>
</template>

<script>
import Menu from "@/components/layouts/Menu.vue";
export default {
  name: "TelaHome",
  components: { Menu },
};
</script>

<style scoped>
.jumbotron {
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
}
</style>
