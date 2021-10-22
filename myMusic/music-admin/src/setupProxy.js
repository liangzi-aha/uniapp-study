/**
 * 1、添加setupProxy文件，文件名必须叫这个
 * 2、按照http-proxy-middleware中间件
 * 3、配置代理:
 */
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5588/',
            changeOrigin: true,
            pathRewrite: {
                "^/api": ""
            },
        })
    );
};