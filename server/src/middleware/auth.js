const jwt = require('jsonwebtoken')
const UserModel = require('../model/userModel')

async function auth(req, res, next) {
	// .. some logic here .. like any other middleware
	try {
		let token = req.headers.authorization
		if(!token)throw('err')
		//token错误
		let {data}=jwt.verify(token, 'sdy2018secret')
		if(!data)throw('err')
		const user = await UserModel.findById(data)
		if(!user)throw('err')
		next();
	} catch (err) {
		res.json({
			code: 401,
			msg: 'token error'
		})
	}
}

module.exports = auth
