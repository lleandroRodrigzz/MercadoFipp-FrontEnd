<template>
  <Menu/>
  <FormCategoria msg="Cadastro de Categoria"/>
  <FormUsuario msg="Cadastro de Usuario"/>
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
#app {
  font-family: 'JetBrains Mono', monospace, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
