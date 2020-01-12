<template>
	<div  class="layout">
		<header>
			<div class="nav">
				<span @click="goHomePage">主页</span>
				<span @click="goTagPage">标签</span>
				<span @click="goAboutPage">关于</span>
			</div>
			<div @click="sileMenu=!sileMenu" class="hamburger_menu">
				<div class="hamburger_menu_item"></div>
			</div>
		</header>
		<div @click="sileMenu=false">
			<router-view ></router-view>
			<footer>
				<span>MyBlog ©2019 Created By sdy2018</span>
			</footer>
			<transition name = "fade">
				<div  v-if="sileMenu" class="slider_menu_container">
					<div @click="goHomePage">主页</div>
					<div @click="goTagPage">标签</div>
					<div @click="goAboutPage">关于</div>
				</div>
			</transition>
			<transition name = "show">
				<img v-show="goTopShow" @click="goTop" class="to_top" src="../../public/上.svg" alt="top">
			</transition>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'home',
		components: {},
		data(){
			return{
				sileMenu:false,
				goTopShow:false
			}
		},
	    mounted() {
		    window.addEventListener('scroll', this.scrollListen) // 监听滚动事件，然后用handleScroll这个方法进行相应的处理
	    },
		methods:{
			goHomePage(){
				if(this.$route.name!=="home"){
					this.$router.push({
						name:'home',
						params:{
							
						}
					})
				}
			},
			goAboutPage(){
				if(this.$route.name!=="about"){
					this.$router.push({
						name:'about'
					})
				}
			},
			goTagPage(){
				if(this.$route.name!=="tags"){
					this.$router.push({
						name:'tags'
					})
				}
			},
			goTop(){
				let moveTop = document.documentElement.scrollTop/20
				let lastTop 
				let timeLock = setInterval(()=>{
					if(lastTop<=document.documentElement.scrollTop){
						clearInterval(timeLock)
					}
					lastTop=document.documentElement.scrollTop
					document.documentElement.scrollTop=document.documentElement.scrollTop-moveTop
					if( document.documentElement.scrollTop===0){
						clearInterval(timeLock)
					}
				},10)
			},
			scrollListen(){
				let top=document.documentElement.scrollTop
				if(top>200&&!this.goTopShow){
					this.goTopShow=true
				}
				if(top<200&&this.goTopShow){
					this.goTopShow=false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 500px) {
		.layout {
			header {
				padding: 0px !important;
			}
			.nav{
				display: none !important;
			}
			.hamburger_menu{
				display: flex !important;
			}
			.content{
				padding: 20px !important;
			}
			.to_top{
				left: 85%!important;
				top: 85%!important;
			}
		}
	}
	@media screen and (min-width: 500px) {
		.layout {
			.slider_menu_container{
				display: none;
			}
		}
	}
	@keyframes identifier {
	 from {transform: translateY(-100%);}
	 to {transform: translateY(0%);}
	}
	@keyframes against {
	 from {transform: translateY(0%);}
	 to {transform: translateY(-100%);}
	}
	.fade-enter-active, .fade-leave-active {
	    animation: identifier 0.6s;
		transition: opacity .5s ease;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
	    animation: against 0.6s ;
		opacity: 0.8;
	}
	.show-enter-active, .show-leave-active {
		transition: opacity 1.5s ease;
	}
	.show-enter, .show-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
		opacity: 0;
	}
	.layout {
		padding-top: 5vh;
		box-sizing: border-box;
		position: relative;
		.slider_menu_container{
			top: 5vh;
			width: 100%;
			padding-top: 10px;
			position: fixed;
			z-index: 888;
			background-color: #fff;
			box-shadow: 0 1px 6px rgba(0,0,0,.2);
			div{
				margin-bottom: 20px;
				font-size: 2vh;
				text-align: center;
			}
		}
		.to_top{
			background-color: rgba(#fff, 0.8);
			font-size: 10px;
			position: fixed;
			top: 90%;
			height: 3vh;
			width: 3vh;
			border-radius: 50%;
			left: 90%;
			padding: 8px;
			 box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
		}
		header {
			top: 0px;
			z-index: 999;
			position: fixed;
			height: 5vh;
			width: 100%;
			background-color: #fff;
			border-bottom: 1px solid rgba(66,66,66,0.8);
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0px 20%;
			.nav {
				display: flex;
				justify-content: center;
				font-size: 2vh;
				span {
					margin-right: 20px;
					cursor: pointer;
				}
			}
			.hamburger_menu {
				height: 4.2vh;
				width:  3.8vh;
				margin-right: 20px;
				cursor: pointer;
				background-color: #e6e6e6;
				align-items: center;
				justify-content: center;
				display: none;
				border-radius: 4px;
				.hamburger_menu_item {
					width: 80%;
					height: 0.5vh;
					background-color: #050505;
					position: relative;
					&:before{
						@extend .hamburger_menu_item;
						width: 100%;
						content: "";
						display: block;
						position: absolute;
						top: -1vh;
					}
					&:after {
						@extend .hamburger_menu_item;
						width: 100%;
						content: "";
						display: block;
						position: absolute;
						top: 1vh;
					}
				}
			}
		}
		footer{
			box-sizing: border-box;
			padding: 10px;
			width: 100%;
			text-align: center;
			font-size: 1.8vh;
		}
	}
</style>
