const path = require('path')
exports.getRegisterpage = (req, res) => {
    //内部对 fs.readFile 的封装
    res.sendFile(path.join(__dirname, '../public/views/register.html'))
}

// 导出注册方法

exports.register = (req, res) => {
    const result = {
        state: 0,
        massage: '注册失败'
    }
    // 1.拿到游览器传输过来的数据 (body-parser ===>app.js)
    const {
        username
    } = req.body
    // 2.先判断数据库中用户名,是否存在,如果存在返回提示(mongodb)
    const MongoClient = require('mongodb').MongoClient;
    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'heima';

    // Use connect method to connect to the server
    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, client) => {
        const db = client.db(dbName);
        const collection = db.collection('controterinit');
        collection.findOne({
            username
        }, (err, doc) => {
            if (!doc) {
                result.state = 1;
                result.massage = '注册成功';
                collection.insertOne(req.body, (err, result2) => {
                    client.close();
                    res.json(result)
                })
            } else {
                result.state = 2
                result.massage = '用户名已存在'
                client.close();
                res.json(result)
            }
        })
    });
}

// 到处获取登录页面
exports.getloginpage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/login.html'))
}

// 获取验证码
exports.getvcode = (req, res) => {
    // 导入二维码包
    const captchapng = require('captchapng');
    const vcode = parseInt(Math.random() * 9000 + 1000)
    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    req.session.vcode = vcode
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

// 登录验证
exports.postlogin = (req, res) => {
    const result = {
        status: 0,
        message: "登录成功"
    }
    const {
        username,
        password,
        vcode
    } = req.body;
    if (vcode != req.session.vcode) {
        [result.status, result.message] = [1, '验证码错误']
        res.json(result)
        return
    }
    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = 'mongodb://localhost:27017';

    // Database Name
    const dbName = 'heima';

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('controterinit');
        // Find some documents
        collection.findOne({
            username,
            password
        }, (err, doc) => {
            if (!doc) {
                [result.status, result.message] = [2, '用户名或密码错误']
            }
            res.json(result)
            client.close();
        })
    });
}