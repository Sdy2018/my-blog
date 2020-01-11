<template>
	<div class="login_container">
		<div class="login_box">
			<el-form :model="requstObj" :rules="rules" ref="ruleForm" label-width="100px" class="demo-dynamic">
			  <el-form-item label="用户名" prop="userName">
				<el-input v-model="requstObj.userName"></el-input>
			  </el-form-item>
			  <el-form-item label="密码" prop="password">
			  	<el-input type="password" v-model="requstObj.password"></el-input>
			  </el-form-item>
			    <el-form-item>
			      <el-button @click="resetForm('ruleForm')">重置</el-button>
				   <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
			    </el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import {login} from '@/api/ariticle.js'
	export default {
		data() {
			return {
				requstObj: {
					userName:'',
					password: ''
				},
				rules:{
				   userName: [
					   { required: true, message: '请输入用户名', trigger: 'blur' },
				   ],
				   password: [
					   { required: true, message: '请输入密码', trigger: 'blur' },
				   ]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate( async valid => {
					const requstObj = this.requstObj
					if (valid) {
						try{
							let res =  await login(requstObj.userName,requstObj.password)
							sessionStorage.setItem('user',JSON.stringify(res.data))
							this.$router.push({
								name:'home'
							})
						}catch(err){
							this.$message.error(err)
						}
					} else {
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		}
	}
</script>

<style lang="less" scoped>
	.login_container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #e6e6e6;
		.login_box {
			background-color: #fff;
			box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
			height: 30%;
			padding-right: 50px;
			display: flex;
			align-items: center;
			border-radius: 5px;
			padding-top: 20px;
		}
	}
</style>
