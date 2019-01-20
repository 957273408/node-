//导包
const express=require('express')

//创建app
const app=express()

app.get('/',(res,req)=>{
    req.send('hello word')
}).listen(8080,err=>{
    console.log('start');
})