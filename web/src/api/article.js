import http from '@/plugins/http.js'


export  function article(params={}){
	try{
		return new Promise( async(resolve,reject)=>{
			let {data} = await http({
				methods:'get',
				url:'/proxy/web/article',
				params
			})
			if(data.code!==200&&data.code!==201) reject('服务器内部错误')
			resolve(data)
		})
	}catch(err){
		
	}
}

export  function tags(){
	try{
		return new Promise( async(resolve,reject)=>{
			let {data} = await http({
				methods:'get',
				url:'/proxy/web/tags'
			})
			if(data.code!==200&&data.code!==201) reject('服务器内部错误')
			resolve(data)
		})
	}catch(err){
		
	}
}