import { createRouter, createWebHistory } from 'vue-router'
// Layouts
import Authentication from '@/layouts/Authentication.vue'
import Locked from '@/layouts/Locked.vue'
// Views
import Home from '@/views/Home.vue'
import Register from "@/views/auth/Register.vue";
import Login from "@/views/auth/Login.vue";
import Quiz from "@/views/minigames/Quiz.vue";
import Game from "@/layouts/Game.vue";
import Info from "@/views/minigames/Info.vue";
import RightPrice from "@/views/minigames/RightPrice.vue";
import Credits from "@/views/Credits.vue";
import Recap from "@/views/Recap.vue";

const routes = [
    {
        path: '/',
        component: Locked,
        children: [
            {
                path: '',
                name: 'home',
                component: Home
            },
            {
                path: 'credits',
                name: 'credits',
                component: Credits
            },
            {
                path: 'recap',
                name: 'recap',
                component: Recap
            },
            {
                path: 'game/',
                component: Game,
                children: [
                    {
                        path: 'quiz',
                        name: 'quiz',
                        component: Quiz
                    },
                    {
                        path: 'info',
                        name: 'info',
                        component: Info
                    },
                    {
                        path: 'right-price',
                        name: 'right price',
                        component: RightPrice
                    }
                ]
            }
        ]
    },
    {
        path: '/auth/',
        component: Authentication,
        redirect: '/auth/login',
        children: [
            {
                path: 'login',
                name: 'login',
                component: Login
            },
            {
                path: 'register',
                name: 'register',
                component: Register
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    next()
})

export default router
