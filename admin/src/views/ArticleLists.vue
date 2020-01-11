<template>
	<div class="list_container">
		<el-container>
			<el-header>
				<span>文章列表</span>
			</el-header>
			<el-main>
				<el-table v-loading="tableLoading" :data="tableData">
					<el-table-column label="序号">
						<template slot-scope="scope">
							<p v-text="scope.$index+1"></p>
						</template>
					</el-table-column>
					<el-table-column prop="title" label="标题">
					</el-table-column>
					<el-table-column  label="创建时间">
						<template slot-scope="scope">
							<p v-text="dateFormat(scope.row.createdAt)"></p>
						</template>
					</el-table-column>
					<el-table-column  label="修改时间">
						<template slot-scope="scope">
							<p v-text="dateFormat(scope.row.updatedAt)"></p>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
							<el-button size="mini" type="primary" @click="handleEditor(scope.row)">编辑</el-button>
						</template>
					</el-table-column>
				</el-table>
				<div class="footer">
					<el-pagination
					  background
					  layout="prev, pager, next"
					  :total="total"
					  :page-size="page.pageSize"
					  :current-page.sync ="page.pageNumber"
					  @current-change="pageChange"
					  >
					</el-pagination>
				</div>
			</el-main>
		</el-container>
	</div>
</template>
<script>
	import {articles,deleteArticle} from '@/api/ariticle'
	export default {
		data() {
			return {
				tableData: [],
				reqObj:{
					pageSize:1,
					pageNumber:10
				},
				tableLoading:false,
				page:{
					pageSize:10,
					pageNumber:1
				},
				total:0
			}
		},
		methods: {
			async handleDelete(index, row) {
				try{
					await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					})
					 await deleteArticle(row._id)
					this.$message.success('删除成功')
					this.getAriticleList()
					this.page.pageNumber=1
				}catch(err){
					console.log('--取消了')
				}
			},
			handleEditor(row) {
				this.$router.push({
					name:'detail',
					params:{
						id:row._id
					}
				})
			},
		    dateFormat(date) {
			    if(!date) return ''
			    if(typeof date==='string'){
			        date = new Date(date)
			    }
			    let year = date.getFullYear().toString()
			    let month = (date.getMonth() + 1).toString()
			    let day = date.getDate().toString()
			    let hours = date.getHours().toString()
			    let minutes = date.getMinutes().toString()
			    let seconds = date.getSeconds().toString() 
			    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds} `
			},
			async getAriticleList(){
				try{
					this.tableLoading=true
					let  res = await articles(this.page)
					this.tableData=res.data
					this.total = res.total
				}catch(err){
					this.tableData = []
					this.$message.error(err)
				}finally{
					this.tableLoading=false
				}
			},
			pageChange(currentPage){
				this.getAriticleList()
			}
		},
		created(){
			this.getAriticleList()
		}
	}
</script>

<style lang="less">
	.list_container {
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

		.el-table {
			th {
				text-align: center;
			}

			td {
				text-align: center;
			}
		}
		.footer{
			padding-top: 30px;
			display: flex;
			justify-content: center;
		}
	}
</style>
