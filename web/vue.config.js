module.exports = {
	devServer: {
		open: true,
		sockHost: 'http://localhost:3003',
		disableHostCheck: true,
		port: 3003, // 此处修改你想要的端口号，
		host: 'localhost', //代理服务器地址
		proxy: {
			//使用/proxy代理请求地址
			'/proxy': {
				target: 'http://localhost:3000', // 要请求的地址
				ws: true, // 要代理 websockets
				changeOrigin: true, //是否跨域
				pathRewrite: {
					'^/proxy': '/' //配置请求地址路径,为http://localhost:3000/
				}
			}
		}
	},
	lintOnSave: false // 取消 eslint 验证
}