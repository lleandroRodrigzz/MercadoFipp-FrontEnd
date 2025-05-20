import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import FormCategoria from './components/FormCategoria.vue'
import FormUsuario from './components/FormUsuario.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/form-categoria', component: FormCategoria },
        { path: '/form-usuario', component: FormUsuario },
    ]
});

const app = createApp(App)
app.use(router);
app.mount('#app')
