<template>
	<div class="aricle_details_container">
		<div class="aricle_details_box">
			<div class="title">
				<span v-text="aritcleMsg.title"></span>
			</div>
			<div class="aritcle_info">
				<span style="margin-right: 10px;color: #78a5f1;">sdy2018</span>
				<span v-text="'发布于:'+dateFormat(aritcleMsg.createdAt)"></span>
			</div>
			<div class="aritcle_content" v-html="aritcleMsg.content">
			</div>
		</div>
		<Loading :value="loading"></Loading>
	</div>
</template>

<script>
import Loading from '@/components/Loading'
	import {
		article
	} from '@/api/article'
	export default {
		components:{
			Loading
		},
		data() {
			return {
				aritcleMsg: {
					title: ''
				},
				loading:false
			}
		},
		methods: {
			async getAriticleDetail(id) {
				try{
					this.loading=true
					let res = await article({
						id
					})
					this.aritcleMsg = res.data[0]
				}catch(err){
					
				}finally{
					this.loading=false
				}
			},
			dateFormat(date) {
				if (!date) return ''
				if (typeof date === 'string') {
					date = new Date(date)
				}
				let year = date.getFullYear().toString()
				let month = (date.getMonth() + 1).toString()
				let day = date.getDate().toString()
				let hours = date.getHours().toString()
				let minutes = date.getMinutes().toString()
				let seconds = date.getSeconds().toString()
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} `
			}
		},
		created() {
			this.getAriticleDetail(this.$route.params.id)
		}
	}
</script>

<style lang="scss" scoped>
	
	@media screen and (max-width: 500px) {
		.aricle_details_container {
			padding: 20px 20px 0px 20px !important;

			.aricle_details_box {
				.title {
					font-size: 2.8vh !important;
				}

				.aritcle_info {
					margin-top: 8px;
					justify-content: space-between;
					padding-bottom: 10px;

					span {
						margin-right: 20px !important;
						font-size: 30px !important;
					}
				}

				.aritcle_content {
					border-radius: 10px;
				}

				.aritcle_content /deep/ {
					font-size: 30px;
				}
			}
		}
	}

	@media screen and (min-width:500px) and (max-width: 900px) {
		.aricle_details_container {
			.aritcle_content {
				font-size: 12px;
			}
		}
	}

	@media screen and (min-width:900px) and (max-width: 1300px) {
		.aricle_details_container {
			.aritcle_content {
				font-size: 10px;
			}
		}
	}

	@media screen and (min-width:1300px)  {
		.aricle_details_container {
			.aritcle_content {
				font-size: 8px;
			}
		}
	}

	.aricle_details_container {
		width: 100%;
		min-height: 100%;
		padding: 20px 20% 0px 20%;
		box-sizing: border-box;

		img {
			width: 40px;
			height: 40px;
		}

		.aricle_details_box {
			width: 100%;
			height: 100%;

			.title {
				font-size: 3.5vh;
				color: #333;
				text-align: center;
			}

			.aritcle_info {
				box-sizing: border-box;
				display: flex;
				justify-content: flex-end;
				line-height: 20px;
				align-items: center;
				font-size: 2vh;
			}

			.aritcle_content {
				box-sizing: border-box;
				word-wrap: break-word;
				word-break: break-all;
				margin: 0px;
				padding: 0px;
				border-radius: 5px;
				padding: 0 0 0  10px;
			}

			.aritcle_content /deep/ img {
				max-width: 400px;
				text-align: center;
			}
		}
	}
</style>
