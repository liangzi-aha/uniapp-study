const express = require('express');
const app = express();
const router = require('./router.js');

app.use(router); 

app.listen(5000,()=>{
	console.log('服务启动成功')
})