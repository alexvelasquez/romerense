import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '@/views/Home.vue'),
        meta: {
            requiresAuth: true
        }
    },
    // ROUTES AUTHENTICATION
    {
        path: '/register',
        name: 'Register',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/auth/Register.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '@/views/auth/Login.vue'),
        meta: {
            requiresVisitor: true
        }
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () =>
            import ( /* webpackChunkName: "login" */ '@/views/auth/Logout.vue')
    },
    // ROUTES PLAYER
    {
        path: '/players',
        name: 'Players',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/players/List.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/players/new',
        name: 'NewPlayer',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/players/New.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/players/edit/:id',
        name: 'EditPlayer',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/players/New.vue'),
        meta: {
            requiresAuth: true
        }
    },
    //CUOTA
    {
        path: '/cuotas',
        name: 'Cuotas',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/cuota/Cuotas.vue'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/cuotas/detail/:id',
        name: 'CuotasDetail',
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/cuota/ListPlayers.vue'),
        meta: {
            requiresAuth: true
        }
    },

]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.getters.loggedIn) {
            next({
                name: 'Login'
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.requiresVisitor)) {
        if (store.getters.loggedIn) {
            next({
                name: 'Home'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})
export default router