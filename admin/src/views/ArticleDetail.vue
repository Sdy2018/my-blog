<template>
	<div class="new_container">
		<el-container v-loading="containerLoading">
			<el-header>
				<span v-text="$route.params.id?'更新文章':'添加文章'"></span>
			</el-header>
			<el-main>
				<div>
					<span class="row">标题</span>
					<el-input v-model="requestObj.title" placeholder="标题" style="width:600px;margin-right:40px;"></el-input>
				</div>
				<div>
					<span class="row">摘要</span>
					<textarea v-model="requestObj.digest" style="resize:none" id="" cols="100" rows="6"></textarea>
				</div>
				<div style="display:flex;justify-content: space-between;">
					<div style="display:flex">
						<span class="row">标签</span>
						<el-button @click="open" style="margin-right:20px;">添加标签</el-button>
						<div v-for="(value,i)  in requestObj.tags" :key="value">
							<div class="tag">
								<span v-text="value"></span>
								<i @click="deleteTag(i)" class="el-message-box__close el-icon-close"></i>
							</div>
						</div>
					</div>
					<div>
						<el-button @click="handleSubmitClick" v-loading="subLoading" v-text="$route.params.id?'更新':'发布'"></el-button>
					</div>
				</div>
				<mavon-editor v-model="requestObj.text" ref=md @imgAdd="imgAdd"  @change="mdChange" style="height: 800px;" :subfield="true"
				 class="editor" />
			</el-main>
		</el-container>
	</div>
</template>
<script>
	import {
		article,
		uploadImg,
		updateArticle,
		articles
	} from '@/api/ariticle'
	export default {
		data: function() {
			return {
				top: true,
				requestObj: {
					text:'',
					content: '',
					title: '',
					digest: '',
					_id: null,
					tags: [],
				},
				subLoading: false,
				containerLoading:false
			};
		},
		methods: {
			open() {
				const reqObj = this.requestObj
				if (reqObj.tags.length === 3) {
					this.$message.error('最多只能三个标签')
					return
				}
				this.$prompt(' ', '添加标签', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({
					value
				}) => {
					if (!reqObj.tags.includes(value)) {
						if (Object.keys(reqObj.tags).length < 3) {
							reqObj.tags.push(value)
						}
					}
				}).catch(() => {});
			},
			deleteTag(index) {
				this.requestObj.tags.splice(index, 1)
			},
			async handleSubmitClick() {
				try {
					const reqObj = this.requestObj
					let msg = ''
					if (!reqObj.content) {
						msg += '内容不能为空 '
					}
					if (!reqObj.title) {
						msg += '标题不能为空 '
					}
					if (!reqObj.digest) {
						msg += '摘要不能为空 '
					}
					if (reqObj.tags.length===0) {
						msg += '标签不能为空 '
					}
					if (msg) {
						throw (msg)
					}
					this.subLoading = true
					console.log(reqObj["_id"])
					if(reqObj["_id"]){
						await updateArticle(reqObj["_id"],reqObj)
					}else{
						reqObj["_id"]= (new Date()).getTime()
						await article(reqObj)
					}
					this.$message.success(reqObj["_id"] ? '更新成功' : '发布成功')
					this.$router.push({
						name:'lists'
					})
				} catch (err) {
					this.$message.error(err)
				} finally {
					this.subLoading = false
				}
			},
			mdChange(value, html) {
				this.requestObj.content = html
				this.requestObj.text=value
			},
			// 绑定@imgAdd event
			async imgAdd(pos, file) {
				try{
					let {url}=await uploadImg(file)
					//用url替代图片
					this.$refs.md.$img2Url(pos, url)
				}catch(err){
					this.$message.error(err)
				}
			},
			async getArticle(id){
				try{
					this.containerLoading=true
					let res = await articles({id})
					this.requestObj={...res.data[0]}
					console.log(this.requestObj)
				}catch(err){
					this.$message.error(err)
				}finally{
					this.containerLoading=false
				}
			}
		},
		created(){
			if( this.$route.params.id){
				this.getArticle(this.$route.params.id)
			}
		}
	}
</script>

<style lang="less">
	.new_container {
		width: 100%;
		height: 100%;

		.el-container {
			height: 100%;
		}

		.el-header {
			background-color: #eee;
			height: 100px !important;

			span {
				line-height: 100px;
				font-size: 25px;
			}
		}

		.el-main {
			display: flex;
			flex-direction: column;

			.markdown-body {
				flex: 1;
				margin: 0px;
				padding: 0px;
				height: 100%;
				width: 100%;
			}

			.editor {
				height: 700px;
			}
		}

		.el-main>div {
			display: flex;
			align-items: center;
			margin-bottom: 20px;

			.row {
				margin-right: 20px;
			}

			.tag {
				border: 1px solid #f40;
				padding: 5px 20px;
				border-radius: 5px;
				margin-right: 20px;

				i {
					color: #fff;
					position: absolute;
					margin-top: -5px;
					margin-left: 5px;
					cursor: pointer;
				}
			}

			.tag:hover {
				background-color: #918;
				color: #fff;
			}
		}
	}
</style>
