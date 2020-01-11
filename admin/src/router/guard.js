import Vue from 'vue'
export default function (router) {
	router.beforeEach((to,from,next)=>{
		if(!sessionStorage.user&&to.name!=='login'){
			next({name:'login'})
		}else{
			next()
		}
	})
}
