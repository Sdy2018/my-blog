import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
	redirect:'/home',
    component: ()=>import('@/views/Layout.vue'),
	children:[
		{
			path:'home',
			name:'home',
			component:()=>import('@/views/home/Home')
		},
		{
			path:'home/tag/:tag',
			name:'tag',
			component:()=>import('@/views/home/Home')
		},
		{
			path: 'about',
			name: 'about',
			component: () => import('@/views/about/About.vue')
		},
		{
			path: 'tags',
			name: 'tags',
			component: () => import('@/views/tags/tags.vue')
		},
		{
			path: 'arcticle/details/:id',
			name: 'details',
			component: () => import('@/views/articleDetails/ArticleDetails.vue')
		}
	]
  },{
	  path:'*',
	  name:'404page',
	  component:()=>import('@/views/error/404page.vue')
  }
]

const router = new VueRouter({
  mode:'history',
  base:'/web/',
  routes
})

export default router
