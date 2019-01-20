//导包
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
//创建app
const app = express()

// 设置静态资源根目录
app.use(express.static(path.join(__dirname, 'public')))

// 导入路由对象
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'))
app.use('/account', accountRouter)

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.listen(8080, '127.0.0.1', err => {
    console.log('start');
})