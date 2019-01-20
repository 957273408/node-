//导包
const express=require('express')
const path=require('path')
//创建app
const app=express()

// 导入路由对象
const accountRouter=require(path.join(__dirname,'routers/accountRouter.js'))
app.use('/account',accountRouter)

app.get('/',(res,req)=>{
    req.send('hello word')
}).listen(8080,'127.0.0.1',err=>{
    console.log('start');
})