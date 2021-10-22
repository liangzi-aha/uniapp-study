const express = require('express');
const app = express();
const port = 8080;
const front = require('./router/front');
const admin = require('./router/admin');
const cookieParser = require('cookie-parser');
const path = require('path');

// 设置前台接口运行跨域请求 发布可以去掉
// app.use('/front/*', (req, res, next) => {
//     res.set({
//         'Access-Control-Allow-Credentials': true,
//         'Access-Control-Allow-Origin': req.headers.origin || '*',
//         'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
//         'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
//     })
//     next();
// })

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//parse application/json
app.use(express.json());
// cookie-parser插件：用于在响应头添加set-cookie属性，往前台写入cookie
app.use(cookieParser());

// 公开静态资源
app.use('/publicStatic', express.static('./publicStatic'));
// 前台地址单独添加 静态资源
app.use('/', express.static('./publicStatic/frontDesk'));

app.use('/front', front);
app.use('/admin', admin);

// 后台使用hash模式
app.use('/background', function (req, res) {
    res.set({
        'Content-Type': 'text/html; charset=utf-8'
    })
    res.sendFile(path.join(__dirname, '/publicStatic/background/index.html'));
})

// 前台使用history模式
app.use('*', function (req, res) {
    res.set({
        'Content-Type': 'text/html; charset=utf-8'
    })
    res.sendFile(path.join(__dirname, '/publicStatic/frontDesk/index.html'));
})

app.listen(port, () => {
    console.log('服务启动成，端口号:' + port)
})