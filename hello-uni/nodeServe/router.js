const express = require('express');

// 创建router
const Router = express.Router();
const controller = require('./controller.js');

// 获取用户信息
Router.get('/getUser',controller.userInfo)


module.exports =  Router;