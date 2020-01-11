const express = require('express');
const router = express.Router();
const articleModel = require('../model/ariticleModel')
const tagModel = require('../model/tagModel')
const multer = require('multer')
const fs = require('fs')
const auth = require('../middleware/auth')


//查詢標籤列表
router.get('/web/tags', async(req,res)=>{
	try{
		// tagModel.distinct('tag',(err,arr)=>{
		// 	console.log(arr)
		// });
		let tags=await tagModel.aggregate([{ 
		 $group: { 
			_id:"$tag", //按照$day进行分组（一组为1天） 
			number:{$sum:1}   
		 } 
        }, ])
		console.log(tags)
		// console.log(tagModel.aggregate)
		let code = 200
		let msg = '查询成功'
		if(tags.length===0){
			code=201
			msg='暂无数据'
		}
		res.json({
			code,
			msg,
			data: tags,
		})
	}catch(err){
		
	}
})


//查询文章
router.get('/web/article', async (req, res) => {
	try {
		const query = req.query
		let limit = parseInt(query.pageSize) || 10
		let skip = parseInt(query.pageSize) * (parseInt(query.pageNumber) - 1) || 0
		let reqParams = {}
		let articleList = []
		let total = null
		//查询tag文档里的
		if (query.tag) {
			articleList = await tagModel.find({
				tag: query.tag
			}, null, {
				limit,
				skip
			})
			total = await articleModel.find({
				tag: query.tag
			}).countDocuments()
		} else {
			//查询文章文档里的
			if (query.id) {
				reqParams._id = query.id
				total = 1
			} else {
				total = await articleModel.find().countDocuments()
			}
			articleList = await articleModel.find(reqParams, null, {
				limit,
				skip,
				sort: [{'_id':-1}]
			})
		}
		let code = 200
		if (articleList.length === 0) {
			code = 201
			total = 0
		}
		res.json({
			code,
			msg: code===200?'查询成功':'暂无数据',
			data: articleList,
			total
		})
	} catch (err) {
		throw (err)
	}
})

module.exports = router
