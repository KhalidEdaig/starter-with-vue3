import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
        //component: DefaultLayout,
        meta: { requiresAuth: true },
        children: [
            //{ path: '/dashboard', name: 'Dashboard', component: Dashboard },
        ],
    },
    // {
    //   path: "/",
    //   name: 'Home',
    //   component: Home
    // },
    {
        path: '/auth',
        redirect: '/login',
        name: 'Auth',
        //component: AuthLayout,
        meta: { isGuest: true },
        children: [
            // {
            //     path: '/login',
            //     name: 'Login',
            //     component: Login,
            // },
            // {
            //     path: '/register',
            //     name: 'Register',
            //     component: Register,
            // },
        ],
    },
    {
        path: '/404',
        name: 'NotFound',
        // component: NotFound,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    let user = JSON.parse(localStorage.getItem('user'))

    if (to.meta.requiresAuth && !user) {
        next({ name: 'Login' })
    } else if (user && to.meta.isGuest) {
        next({ name: 'Dashboard' })
    } else {
        next()
    }
})
export default router
