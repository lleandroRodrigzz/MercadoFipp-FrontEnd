<template>
  <Menu />
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <form @submit.prevent="cadastrarAnuncio">
          <h2 class="text-center mb-4">Anunciar Produto</h2>

          <div class="row">
            <div class="col-12 col-md-6 mb-3">
              <label>ID do Usuário</label>
              <input type="number" class="form-control" v-model="anuncio.usuario.id" required :readonly="true" />
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label>Categoria</label>
              <select class="form-control" v-model="anuncio.categoria.id" required>
                <option disabled value="">Selecione a categoria</option>
                <option v-for="cat in categorias" :key="cat.id" :value="cat.id">{{ cat.nome }}</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-12 mb-3">
              <label>Nome do Produto</label>
              <input type="text" class="form-control" placeholder="Que produto que você vai vender ?" v-model="anuncio.titulo" required />
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-6 mb-3">
              <label>Data de Criação</label>
              <input type="date" class="form-control" v-model="anuncio.data" value="" :readonly="true" required />
            </div>
            <div class="col-12 col-md-6 mb-3">
              <label>Preço</label>
              <input type="number" step="0.01" placeholder="123,45" class="form-control" v-model="anuncio.preco" required />
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-12 mb-3">
              <label>Descrição do Produto</label>
              <input type="text" placeholder="Breve decrição do seu produto..." class="form-control" v-model="anuncio.descricao" required />
            </div>
          </div>

          <div class="row">
            <div class="col-12 col-md-12 mb-3">
              <label>Fotos do Produto</label>
              <input type="file" class="form-control" multiple @change="handleFotos" accept="image/*" />
              <ul v-if="fotos.length" class="mt-2">
                <li v-for="(f, i) in fotos" :key="i">{{ f.name }}</li>
              </ul>
            </div>
          </div>

          <div class="text-center mt-4">
            <button class="btn btn-primary" type="submit">Anunciar Produto</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
import Menu from "@/components/layouts/Menu.vue";
import axios from "axios";

export default{
  name: "HomeAnunciar",
  components: {Menu},
  data(){
    return{
      anuncio: {
        titulo: "",
        data: new Date().toISOString().split("T")[0],
        descricao: "",
        preco: "",
        categoria: {
          id: ""
        },
        usuario: {
          id: Number(localStorage.getItem("usuario"))
        }
      },
      categorias:[],
      fotos:[]
    }
  },
  mounted(){
    axios.get("http://localhost:8080/apis/categoria")
    .then((response) => {
      this.categorias = response.data;
    })
    .catch((error) => {
      alert("Erro ao tentar carregar categorias");
    });
  },
  methods:{
    handleFotos(event) {
      this.fotos = Array.from(event.target.files);
    },
    async cadastrarAnuncio() {
      try {
        const res = await axios.post("http://localhost:8080/apis/anuncio", this.anuncio);
        console.log("Resposta do backend:", res.data); //d
        const novoAnuncio = res.data;
        console.log("ID recebido:", novoAnuncio.id); //d
        console.log("Quantidade de fotos:", this.fotos.length); //d
        if (this.fotos.length && novoAnuncio.id) {
          for (const foto of this.fotos) {
            console.log("Fotos selecionadas:", this.fotos); //d
            const formData = new FormData();
            formData.append("file", foto);
            await axios.post(`http://localhost:8080/apis/anuncio/upload/${novoAnuncio.id}`, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
          }
          alert("Anúncio e fotos enviados com sucesso!");
        }
        else
          alert("Anúncio cadastrado (sem fotos).");

        this.resetForm();
      }
      catch (error) {
        console.error(error);
        alert("Erro ao cadastrar anúncio.");
      }
    },
    resetForm() {
      this.anuncio = {
        titulo: "",
        data: "",
        descricao: "",
        preco: "",
        categoria: { id: "" },
        usuario: { id: "" },
      };
      this.fotos = [];
    },
  },
}
</script>

<style>

</style>