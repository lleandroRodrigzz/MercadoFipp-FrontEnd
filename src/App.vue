<template>
  <Menu/>
  <form-categoria msg="Cadastro de Categoria"/>
</template>

<script>
import FormCategoria from './components/FormCategoria.vue'
import Menu from './components/layouts/Menu.vue';

export default {
  name: 'App',
  components: {
    Menu,
    FormCategoria
  }
}
</script>

<style>
#app {
  font-family: 'JetBrains Mono', monospace, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
