<template>
  <div class="about">
	  <div class="aboout_box">
		  <img class="avatar" width="200px"  src="../../../public/avatar.png" alt="">
		  <div class="info">
			  <div style="margin-bottom: 20px;">性别:男</div>
			  <div style="margin-bottom: 20px;min-width: 140px;">兴趣爱好:广泛</div>
		  </div>
	  </div>
  </div>
</template>

<style scoped lang="scss">
	@media screen and (max-width: 500px){
		.about{
			.aboout_box{
				box-shadow: none !important;
				.info{
					font-size: 28px !important;
				}
			}
		}
	}
	@media screen and (min-width:500px) and (max-width: 1000px){
		.about{
			.aboout_box{
				box-shadow: none !important;
				.info{
					font-size: 13px !important;
				}
			}
		}
	}
	.about{
		padding: 2vh 20vw;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction:column;
		color:#333;
		.aboout_box{
			display: flex;
			justify-content: space-between;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			border-radius: 10px;
			padding: 20px;
			.avatar{
				border-radius: 5px;
			}
			.info{
				margin-left: 20px;
				font-size: 8px;
			}
		}
	}
</style>
