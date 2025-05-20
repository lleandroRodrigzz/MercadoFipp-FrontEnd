<template>
  <Menu />
  <RouterView />
</template>

<script>
import FormCategoria from './components/FormCategoria.vue'
import FormUsuario from './components/FormUsuario.vue';
import Menu from './components/layouts/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
    FormCategoria,
    FormUsuario
  }
}
</script>

<style>
  html, body, #app {
    height: 100%;
    margin: 0;
    font-family: 'JetBrains Mono', monospace, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    background-color: #ededed;
    color: white; /* opcional: deixa texto branco por padrão */
  }
</style>
