// 注册和登录的处理
const express = require('express')
const path = require('path')

//创建路由对象
const accountRouter = express.Router()

//导入控制器模块
const accountController = require(path.join(__dirname, '../controllers/accountController.js'))

//获取注册页面的请求
accountRouter.get('/register', accountController.getRegisterpage)

// 获取登录页面的请求
accountRouter.get('/login', accountController.getloginpage)

// 处理登录帐号请求
accountRouter.post('/login',accountController.postlogin)

// 处理注册请求
accountRouter.post('/register',accountController.register)

// 处理获取验证码请求
accountRouter.get('/vcode',accountController.getvcode)

// 导出路由对象
module.exports= accountRouter