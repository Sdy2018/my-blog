const express = require('express');
const router = express.Router();
const articleModel = require('../model/ariticleModel')
const tagModel = require('../model/tagModel')
const multer = require('multer')
const fs = require('fs')
const auth = require('../middleware/auth')


router.use(auth)


//添加文章
router.post('/admin/article', async (req, res) => {
	try {
		let article=await articleModel.create(req.body)
		for(let i = 0;i<article.tags.length;i++){
			let obj ={
				articleId: article._id,
				tag:article.tags[i],
				digest:article.digest,
				tags:article.tags,
				title:article.title
			}
			await tagModel.create(obj)
		}
		res.json({
			code:200,
			msg:'发布成功'
		})
	} catch (err) {
		throw (err)
	}
})

//修改文章
router.put('/admin/article/:id', async (req, res) => {
	try {
		let article=req.body
		await articleModel.findByIdAndUpdate(req.params.id,req.body)
		await tagModel.deleteMany({articleIdl:req.body.articleIdl})
		for(let i = 0;i<article.tags.length;i++){
			let obj ={
				articleId: article._id,
				tag:article.tags[i],
				digest:article.digest,
				tags:article.tags,
				title:article.title
			}
			await tagModel.create(obj)
		}
		res.json({
			code:200,
			msg:'更新成功'
		})
		
	} catch (err) {
		throw (err)
	}
})
//查询文章
router.get('/admin/article', async (req, res) => {
	try {
		const query=req.query
		let limit=parseInt(query.pageSize)||10
		let skip = parseInt(query.pageSize)*(parseInt(query.pageNumber)-1)||0
		let reqParams ={}
		if(query.id){
			reqParams._id=query.id
		}
		
		let articleList =await articleModel.find(reqParams,null,{
			limit,
			skip
		})
		let total = await articleModel.find().countDocuments();
		let code = 200
		if(articleList.length===0) code =201
		res.json({
			code,
			msg:'查询成功',
			data:articleList,
			total
		})
	} catch (err) {
		throw (err)
	}
})

//删除文章
router.delete('/admin/article/:id', async (req, res) => {
	try {
		await articleModel.findByIdAndRemove(req.params.id)
		await tagModel.remove({
			articleId:req.params.id
		})
		res.json({
			code:200,
			msg:'删除成功'
		})
	} catch (err) {
		throw (err)
	}
})

//上传图片
router.post('/admin/uploadImg', multer().single('image'), async(req, res) => {
	const file = req.file
	const filename = (new Date()).getTime()+file.originalname
	console.log(filename)
	fs.writeFile(__dirname+'/../uploads/'+filename,file.buffer,  function(err) {
	   if (err) {
	       return console.error(err);
		   res.json({
			   code:500,
			   msg:'上传失败'
		   })
	   }
	   let url = 'http://localhost:3002/uploads/' + filename
	   res.json({
			code:200,
			msg:'上传成功',
			data:{
				url
			}
	   })
	});
})


module.exports = router