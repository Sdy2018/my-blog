import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import guard from '@/router/guard.js'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    children: [{
        path: '/articles/lists',
        component: () => import('../views/ArticleLists.vue'),
        name: 'lists'
    }, {
        path: '/articles/detail',
        component: () => import('../views/ArticleDetail.vue'),
        name: 'detail'
    },]
},{
	path: '/login',
	name: 'login',
	component: ()=>import('@/views/login'),
}
]

const router = new VueRouter({
	mode:'history',
	base:'/admin/',
    routes
})
guard(router)

export default router