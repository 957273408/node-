//导包
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session');
//创建app
const app = express()

// 设置静态资源根目录
app.use(express.static(path.join(__dirname, 'public')))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// 使用session
app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
}))
// 导入路由对象
const accountRouter = require(path.join(__dirname, 'routers/accountRouter.js'))
app.use('/account', accountRouter)
app.use('/student', accountRouter)

app.listen(8080, '127.0.0.1', err => {
    console.log('start');
})