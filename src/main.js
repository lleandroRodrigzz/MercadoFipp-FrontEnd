import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import FormCategoria from './components/formularios/FormCategoria.vue'
import FormUsuario from './components/formularios/FormUsuario.vue'
import Login from './components/layouts/Login.vue'
import Tela404 from './components/telas/Tela404.vue'
import HomeProdutos from "@/components/telas/HomeProdutos.vue"
import TelaProduto from "@/components/telas/TelaProduto.vue"
import TelaHome from "@/components/telas/TelaHome.vue"
import HomeAnunciar from "@/components/telas/HomeAnunciar.vue"

const routes = [
    { path: '/login', component: Login },
    { path: '/home', component: TelaHome },
    { path: '/comprar', component: HomeProdutos },
    { path: '/produto/:id', component: TelaProduto },
    { path: '/form-categoria', component: FormCategoria },
    { path: '/form-usuario', component: FormUsuario },
    { path: '/anunciarProduto', component: HomeAnunciar },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: Tela404 }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    const exp = localStorage.getItem('exp');
    const nivel = localStorage.getItem('nivel');
    const agora = Date.now();

    if (to.path !== '/login') {
        // Verifica validade do token
        if (!token || !exp || agora > parseInt(exp)) {
            localStorage.clear();
            return next('/login');
        }

        // Bloqueia rotas administrativas se não for nível 1
        if (to.path.startsWith('/form') && nivel !== '1') {
            return next('/*'); // Erro404
        }
    }
    next();
});


const app = createApp(App);
app.use(router);
app.mount('#app');
