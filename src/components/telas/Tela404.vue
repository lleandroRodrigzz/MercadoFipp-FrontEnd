<template>
    <Menu />
    <img class="mt-3" style="width: 25rem;" src="../../assets/alert.png" alt="erro404">
    <h1 class="p-3" style="color: black;">OPS! NÃO ENCONTRAMOS ESSA PÁGINA</h1>
    <router-link to="/home" class="btn btn-primary rounded-5">Voltar ao Início</router-link>
</template>

<script>
import Menu from "@/components/layouts/Menu.vue";

export default {
    name: "Tela404",
  components: {Menu},
};
</script>