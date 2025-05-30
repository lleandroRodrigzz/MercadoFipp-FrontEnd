<template>
  <Menu />
  <div class="container mt-4">
    <h2 class="mb-4 text-start" style="color: black;">Detalhes do Produto</h2>
    <div class="card">

      <!-- Se houver apenas uma imagem -->
      <img
          v-if="anuncio.fotos.length === 1"
          :src="'http://localhost:8080/uploads/' + anuncio.fotos[0].file"
          class="card-img-top"
          alt="Imagem do produto"
      />

      <!-- Se houver mais de uma imagem -->
      <div v-else-if="anuncio.fotos.length > 1" id="carouselFotos" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div
              class="carousel-item"
              v-for="(foto, index) in anuncio.fotos"
              :key="index"
              :class="{ active: index === 0 }"
          >
            <img
                :src="'http://localhost:8080/uploads/' + foto.file"
                class="d-block w-100 card-img-top"
                alt="Foto do produto"
            />
          </div>
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#carouselFotos" data-bs-slide="prev">
          <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselFotos" data-bs-slide="next">
          <span class="carousel-control-next-icon"></span>
        </button>
      </div>

      <div class="card-body">
        <h3 class="card-title">{{ anuncio.titulo }}</h3>
        <p class="card-text">{{ anuncio.descricao }}</p>
        <p class="card-text">
          <strong>Categoria:</strong> {{ anuncio.categoria.nome }}
        </p>
        <p v-if="anuncio.usuario" class="card-text">
          <strong>Anunciante: </strong> {{ anuncio.usuario.nome}}
        </p>
        <p v-if="anuncio.data" class="card-text">
          <strong>Data: </strong> {{ anuncio.data}}
        </p>
        <h2 v-if="anuncio.preco" class="card-text text-success">R$ {{ anuncio.preco.toFixed(2) }}</h2>
      </div>

      <div class="card-body">
        <!-- PERGUNTAS -->
        <div class="card mt-3">
          <div class="card-body">
            <h2 class="card-title">Perguntas</h2>

            <div v-if="perguntas.length === 0" class="text-muted">Nenhuma pergunta ainda.</div>
            <div v-for="pergunta in perguntas" :key="pergunta.id" class="mb-2 border rounded p-2">
              <div>
                <p class="d-flex justify-content-start"><strong>Pergunta: </strong> {{ pergunta.texto }}</p>
              </div>
              <div>
                <p v-if="pergunta.resposta" class="d-flex justify-content-start"><strong>Resposta: </strong> {{ pergunta.resposta }}</p>
                <p v-else class="d-flex justify-content-start"><strong>Resposta: </strong></p>
                <button v-if="!pergunta.resposta && anuncio.usuario.id == idUsuario"
                        class="d-flex justify-content-start btn btn-warning"
                        @click="abrirModalResposta(pergunta)">
                  Responder
                </button>
              </div>
            </div>
            <!-- Campo para nova pergunta -->
            <div class="input-group mt-3 border rounded">
              <input v-model="novaPergunta" type="text" class="form-control" placeholder="Faça uma pergunta..." />
              <button class="btn btn-primary" @click="enviarPergunta">Enviar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal de Resposta -->
  <div class="modal fade" id="modalResposta" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content bg-white text-dark">
        <div class="modal-header">
          <h5 class="modal-title">Responder Pergunta</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
        </div>
        <div class="modal-body">
          <p><strong>Pergunta: </strong> {{ perguntaSelecionada?.texto }}</p>
          <textarea v-model="respostaTexto" class="form-control" rows="3" placeholder="Digite sua resposta..."></textarea>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-success" @click="confirmarResposta">Responder</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Menu from "@/components/layouts/Menu.vue";
import axios from "axios";

export default{
  name: "TelaProduto",
  components:{
    Menu
  },
  data(){
    return{
      anuncio:{
        fotos: [],
        categoria: {},
        usuario: {}
      },
      perguntas: [],
      novaPergunta: "",
      perguntaSelecionada: "",
      respostaTexto: "",
      idUsuario: Number(localStorage.getItem("usuario"))
    };
  },
  mounted() {
    const id = this.$route.params.id;
    axios.get(`http://localhost:8080/apis/anuncio/${id}`).then((response) => {
      this.anuncio = response.data
    })

    axios.get(`http://localhost:8080/apis/anuncio/perguntas/${id}`)
    .then((response) => {
      this.perguntas = response.data;
    })
  },
  methods:{
    async enviarPergunta() {
      if (!this.novaPergunta.trim()) return;
      const id = this.$route.params.id;
      const texto = encodeURIComponent(this.novaPergunta);
      try {
        await axios.post(`http://localhost:8080/apis/anuncio/add-pergunta/${id}/${texto}`);
        this.novaPergunta = "";
        await this.carregarPerguntas();
      } catch (e) {
        alert("Erro ao enviar pergunta.");
      }
    },
    abrirModalResposta(pergunta) {
      this.perguntaSelecionada = pergunta;
      this.respostaTexto = "";
      const modal = new bootstrap.Modal(document.getElementById("modalResposta"));
      modal.show();
    },
    async confirmarResposta() {
      const texto = encodeURIComponent(this.respostaTexto);
      const id = this.perguntaSelecionada.id;
      try {
        await axios.post(`http://localhost:8080/apis/anuncio/add-resposta/${id}/${texto}`);
        await this.carregarPerguntas();
        bootstrap.Modal.getInstance(document.getElementById("modalResposta")).hide();
      } catch (e) {
        alert("Erro ao enviar resposta.");
      }
    },
    async carregarPerguntas() {
      const id = this.$route.params.id;
      const resp = await axios.get(`http://localhost:8080/apis/anuncio/perguntas/${id}`);
      this.perguntas = resp.data;
    }
  }
};
</script>

<style scoped>
  .card-img-top {
    max-height: 25rem;
    object-fit: contain;
    padding-top: 2rem;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    background-color: black !important;
    border-radius: 50% !important;
  }
</style>