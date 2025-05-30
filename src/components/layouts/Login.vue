<template>
  <div class="container p-4 border border-dark mt-5" style="max-width: 400px; border-radius: 30px;">
    <div>
      <img src="../../assets/MercadoFippLogo.png" alt="MercadoFippLogo" class="w-50" />
      <h2 class="mt-2" style="color: black;">Login</h2>
    </div>
    <div class="p-2">
      <h4 style="text-align: left; color: #525252;">Nome de usuário</h4>
      <input v-model="nome" type="text" class="form-control border border-dark" placeholder="Username" />
      <h4 class="mt-3" style="text-align: left; color: #525252;">Senha</h4>
      <input v-model="senha" type="password" class="form-control border border-dark" placeholder="Senha" />
    </div>
    <button type="button" class="btn btn-outline-primary mt-3" @click="fazerLogin">Entrar</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      nome: '',
      senha: ''
    };
  },
  methods: {
    async fazerLogin() {
      try {
        const resp = await fetch('http://localhost:8080/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome: this.nome, senha: this.senha })
        });

        if (!resp.ok) {
          alert("Credenciais inválidas");
          return;
        }

        const data = await resp.json();
        const token = data.token;

        // Decodifica o payload do token para capturar a data de expiração
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000; // converte pra milissegundos
        const nivel = payload.nivel;
        const usuarioId = payload.sub
        const usuarioNome = payload.nome;

        localStorage.setItem("token", token);
        localStorage.setItem("exp", exp);
        localStorage.setItem("nivel", nivel);
        localStorage.setItem("usuario", usuarioId);
        localStorage.setItem("usuarioNome", usuarioNome);

        this.$router.push("/home");
      } catch (e) {
        alert("Erro ao conectar com o servidor");
        console.error(e);
        localStorage.clear(); // limpa qualquer dado inválido
      }
    }
  }
};
</script>
