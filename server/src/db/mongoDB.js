const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

function connectionDB(){
	const db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', ()=>{
	  console.log('连接成功')
	});
}

module.exports = connectionDB