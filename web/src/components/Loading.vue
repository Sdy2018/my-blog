<template>
	  <div v-show="this.show" class="loading_container">
	    <div class="sk-fold">
	      <div class="sk-fold-cube"></div>
	      <div class="sk-fold-cube"></div>
	      <div class="sk-fold-cube"></div>
	      <div class="sk-fold-cube"></div>
	    </div>
	  </div>
</template>

<script>
	export default{
		props:{
			value:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			show(){
				return this.value
			}
		}
	}
</script>

<style lang="scss" scoped >
$size:15px;
$color:#333;
@media screen and (max-width: 500px){
	.loading_container{
		.sk-fold{
			width:40px !important;
			height: 40px !important;
		}
	}
}
.loading_container{
	background-color: rgba(#f5f5f5, 0.8);
	top: 0px;
	left: 0px;
	width: 100%;
	height: 100%;
	position: fixed;
	display: flex;
	z-index: 999;
	justify-content: center;
	.sk-fold {
	  margin-top: 30vh;
	  width: $size;
	  height: $size;
	  position: relative;
	  transform: rotateZ(45deg); 
	}
	.sk-fold-cube {
	  float: left;
	  width: 50%;
	  height: 50%;
	  position: relative;
	  transform: scale(1.1); 
	}
	
	.sk-fold-cube:before {
	  content: '';
	  position: absolute;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background-color: $color;
	  animation: sk-fold 2.4s infinite linear both;
	  transform-origin: 100% 100%; 
	}
	.sk-fold-cube:nth-child(2) { transform: scale(1.1) rotateZ(90deg); }
	.sk-fold-cube:nth-child(4) { transform: scale(1.1) rotateZ(180deg); }
	.sk-fold-cube:nth-child(3) { transform: scale(1.1) rotateZ(270deg); }
	.sk-fold-cube:nth-child(2):before { animation-delay: 0.3s; }
	.sk-fold-cube:nth-child(4):before { animation-delay: 0.6s; }
	.sk-fold-cube:nth-child(3):before { animation-delay: 0.9s; }
	
	@keyframes sk-fold {
	  0%, 10% {
	    transform: perspective(140px) rotateX(-180deg);
	    opacity: 0; 
	  } 25%, 75% {
	    transform: perspective(140px) rotateX(0deg);
	    opacity: 1; 
	  } 90%, 100% {
	    transform: perspective(140px) rotateY(180deg);
	    opacity: 0;
	  } 
	}
}
</style>
