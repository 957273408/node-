const path=require('path')
exports.getRegisterpage =(req,res)=>{
    //内部对 fs.readFile 的封装
    res.sendFile(path.join(__dirname,'../public/views/register.html'))
}

// 导出注册方法

exports.register=(req,res)=>{
    const result={
        state:0,
        massage:'注册失败'
    }
    // 1.拿到游览器传输过来的数据 (body-parser ===>app.js)
    const {username}=req.body
    console.log(username)
    // 2.先判断数据库中用户名,是否存在,如果存在返回提示(mongodb)

    // 3.如果用户名不存在,插入到数据库中

    res.json(result)
}
