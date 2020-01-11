const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const UserModel = require('../model/userModel')
const jwt = require('jsonwebtoken')

// 登录
  router.post('/admin/login', async (req, res) => {
    const { username, password } = req.body
	console.log(req.body)
    if (!username) {
      res.json({
        message: "用户名为空",
		code:422
      })
      return;
    }
    if (!password) {
      res.json({
        message: "密码为空",
		code:422
      })
      return;
    }
    // 1.验证用户名是否存在
    const user = await UserModel.findOne({username})
    if (!user) {
      res.json({
        message: "用户名或者密码错误",
		code:422
      })
      return;
    }
    // 2. 验证密码是否合法
    const isValid = bcrypt.compareSync(password, user.password)
    if (!isValid) {
      res.send({
        message: "用户名或者密码错误",
		code:422
      })
      return;
    }
    // 3. 生成jwt token并返回
   //  const token = jwt.sign({id: user._id}, app.get('secret'))
   const token =jwt.sign({
     exp: Math.floor(Date.now() / 1000) + (30*60),
     data: user._id
   }, 'sdy2018secret');
    res.send({
      code: 200,
	  data:{
		  username: user.username,
		  token: token
	  }
    })
  })

//账号生成
// router.post('/admin/create',(req,res)=>{

// 	UserModel.create(req.body)
// 	res.send('----')
// })

module.exports = router