const express = require('express')
const app = express()
const adminRouter = require('./router/admin.js')
const publicRouter = require('./router/public.js')
const webRouter = require('./router/web.js')
const connecttionDB = require('./db/mongoDB.js')
const bodyParser = require('body-parser')


app.use('/uploads', express.static(__dirname + '/uploads'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//连接数据库
connecttionDB()

app.use(webRouter)
app.use(publicRouter)
app.use(adminRouter)


app.listen(3000,()=>{
	console.log('服务开启成功')
})