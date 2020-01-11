import http from '@/plugins/http.js'

//添加文章
export  function article(reqObj){
	try{
		return new Promise( async(resolve,reject)=>{
			let {data} = await http({
				 method: 'post',
				 url: '/proxy/admin/article',
				 data:reqObj
			})
			 if(data.code!==200)reject(data.msg)
			 resolve()
		})
	}catch(err){
		throw(err)
	}
}

//获取文章列表
export  function articles(params={}){
	try{
		return new Promise( async(resolve,reject)=>{
			let {data} = await http({
				 method: 'get',
				 url: '/proxy/admin/article',
				 params
			})
			 if(data.code!==200&&data.code!==201)reject(data.msg)
			 resolve(data)
		})
	}catch(err){
		throw(err)
	}
}
//删除文章
export  function deleteArticle(id){
	try{
		return new Promise( async(resolve,reject)=>{
			let {data} = await http({
				 method: 'delete',
				 url: '/proxy/admin/article/'+id
			})
			console.log(data)
			 if(data.code!==200)reject(data.msg)
			 resolve()
		})
	}catch(err){
		throw(err)
	}
}

//更新文章
export  function updateArticle(id,body){
	try{
		return new Promise( async(resolve,reject)=>{
			let {data} = await http({
				 method: 'put',
				 url: '/proxy/admin/article/'+id,
				 data:body
			})
			 if(data.code!==200)reject(data.msg)
			 resolve()
		})
	}catch(err){
		throw(err)
	}
}


//图片上传
export  function uploadImg(file){
	try{
		return new Promise( async(resolve,reject)=>{
			var formdata = new FormData();
			formdata.append('image', file);
			let {data} = await http({
			   url: '/proxy/admin/uploadImg',
			   method: 'post',
			   data: formdata,
			   headers: { 'Content-Type': 'multipart/form-data' },
			})
			 if(data.code!==200)reject(data.msg)
			 resolve(data.data)
		})
	}catch(err){
		throw(err)
	}
}

//登录
export  function login(username,password){
	try{
		return new Promise( async(resolve,reject)=>{
			let {data} = await http({
				 method: 'post',
				 url: '/proxy/admin/login',
				 data:{
					 username,
					 password
				 }
			})
			console.log(data)
			 if(data.code!==200)reject('用户名或者密码错误')
			 resolve(data)
		})
	}catch(err){
		throw(err)
	}
}
