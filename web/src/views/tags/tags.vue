<template>
	<div class="tag_cloud_container">
		<div class="tag_cloud_box" v-if="show">
			<span @click="goPage(item)" :style="'color:'+getColor(index)+';'+'font-size:'+getSize()+';'" class="tag" v-for="(item,index) in tags" :key="index" v-text="item['_id']+'['+item.number+']'" >
				
			</span>
		</div>
		<Loading :value="loading"></Loading>
	</div>
</template>

<script>
import {tags} from '@/api/article'
import Loading from '@/components/Loading'
	export default{
		components:{
			Loading
		},
		data(){
			return{
				tags:null,
				colors:[
					'#7fa71c',
					'#18bda0',
					'#918',
					'#180860',
					'#bc20aa',
					'#4d0499',
					'#b3626b',
					'#7c2ca6',
					'#21299c',
					'#8990c6',
					'#6443ad',
					'#942762',
					'#195d07',
					'#4ea70a',
					'#23854d',
					'#a38405',
					'#ac6755',
					'#b1a966',
					'#1b2932',
					'#45863f'
				],
				loading:false,
				show:false
			}
		},
		methods:{
			getColor(index){
				if(index<=this.colors.length)return  this.colors[index]
				return this.colors[parseInt(20*Math.random())]
			},
			getSize(){
				return (parseInt(12*Math.random())+15)+'px'
			},
			async getTagList(){
				try{
					this.loading=true
					let res= await tags()
					this.tags = res.data
				}catch(err){
					
				}finally{
					this.loading=false
					this.show=true
				}
			},
			goPage(item){
				this.$router.push({name:'tag',params:{tag:item['_id']}})
			}
		},
		created(){
			this.getTagList()
		}
	}
</script>

<style lang="scss" scoped>
	@media screen and (max-width: 500px){
		.tag_cloud_container {
			padding: 0 20px !important;
			.tag_cloud_box{
				padding: 40px !important;
				.tag{
					margin-right: 20px !important;
				}
			}
		}
	}
	@media screen and (max-width: 900px) and (min-width:500px){
		.tag_cloud_container {
			padding: 0 10% !important;
		}
	}
	.tag_cloud_container{
		padding: 0 20%;
		.tag_cloud_box{
			padding: 10px;
			width: 100%;
			margin-top: 20px;
			box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			box-sizing: border-box;
			.tag{
				line-height: 30px;
				box-sizing: border-box;
				display: inline-block;
				margin-right: 10px;
				cursor: pointer;
				transition: all 0.5s ease;
				text-align: center;
				height: 30px;
				&:hover {
					color: #1c88b7!important;
				}
			}
		}
	}
</style>
