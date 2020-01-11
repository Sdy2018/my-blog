<template>
	<div class="article_list">
		<div class="article_item" v-for="(item,index) in articleList" :key="item._id">
			<div class="title">
				<span @click="getArticleDetails(item)" v-text="item.title"></span>
			</div>
			<div class="abstract">
				<span v-text="item.digest"></span>
			</div>
			<div class="info">
				<div class="tag_list">
					<div class="tag" @click="$router.push({name:'tag',params:{tag:item}})" v-for="(item,index) in item.tags" v-text="item" :key="index"></div>
				</div>
			</div>
		</div>
		<Pagination :currentPage='params.pageNumber' :pageSize='params.pageSize'  :totalCount="total" @pageChange="pageChange"></Pagination>
		<Loading  :value="Loading"></Loading>
	</div>
</template>

<script>
import {article} from '@/api/article'
import Loading from '@/components/Loading'
import Pagination from '@/components/Pagination'
	export default{
		components:{
			Loading,
			Pagination
		},
		data(){
			return {
				params:{
					pageSize:10,
					pageNumber:1
				},
				articleList:[],
				Loading:false,
				total:0,
			}
		},
		methods:{
			getArticleDetails(item){
				let id = this.params.tag?item.articleId:item['_id']
				this.$router.push({ name: 'details', params: { id }})
			},
			async getArticleList(){
				try{
					this.Loading=true
					this.params.tag=this.$route.params.tag||null
					let res= await article(this.params)
					this.articleList=res.data
					this.total=res.total
				}catch(err){
					
				}finally{
					this.Loading=false
				}
			},
			pageChange(page){
				this.params.pageNumber=page
				this.getArticleList()
			}
		},
		created(){
			this.getArticleList()
		},
		watch:{
			 '$route.params.tag'(newVal,oldVal){
				 this.getArticleList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 500px){
		.article_list{
			padding: 10px !important;
			.article_item {
				padding: 20px !important;
				border-radius: 10px !important;
				transform: scale(1) !important;
				font-size: 1.8vh !important;
				.info{
					display: none !important;
				}
			}
		}
	}
	@media screen and (max-width: 900px) and (min-width:500px){
		.article_list {
			padding: 2vh 10% !important;
		}
	}
	.article_list {
		width: 100%;
		padding: 2vh 20vw;
		box-sizing: border-box;
		position: relative;
		.article_item {
			border-radius: 3px;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			transition: all 0.5s ease;
			padding: 10px;
			color: #333;
			.title{
				font-size: 2.5vh;
				margin-bottom: 3px;
				cursor: pointer;
				span: {
					transition: .5s ease;
					cursor: pointer;
					display: inline-block;
				};
				span:hover{
					color: #51aded;
				};
			}
			.abstract{
				font-size: 1.8vh;
				color: #444;
				margin-bottom: 3px;
			}
			.info{
				display: flex;
				justify-content: space-between;
				font-size: 1.8vh;
				.tag_list{
					display: flex;
					align-items: center;
					.tag{
						padding: 0.5vh 1.5vh;
						border: 0.5px solid #333;
						border-radius: 2px;
						margin-right: 5px;
						cursor: pointer;
						transition: .5s ease;
						&:hover{
							border: 0.5px solid #666;
							color: #666;
						}
					}
				}
			}
		}
		.article_item:nth-of-type(n+2) {
			margin-top: 10px;
		}
		.article_item:hover{
			transform: scale(1.1);
		}
	}
</style>
