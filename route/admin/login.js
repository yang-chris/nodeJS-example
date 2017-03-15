const express=require('express');
const common = require('../../libs/common');
const mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'learn'
});

module.exports=function () {
    var router=express.Router();
    //请求页面
    router.get('/', function (req, res) {
        res.render('admin/login.ejs', {});
    });
//提交数据
    router.post('/', function (req, res) {
        //res.send('我是admin').end();
        var username = req.body.username;
        var password = common.md5(req.body.password + common.MD5_SUFFIX);

        //数据库查询数据
        db.query(`SELECT * FROM admin_table WHERE username='${username}'`, function (err, data) {
            if (err) {
                console.error(err);
                res.status(500).send('databese is error').end();
            } else {
                console.log(data);
                if (data.length == 0) {
                    res.status(400).send('no this admin').end();
                } else {
                    if (data[0].password == password) {
                        req.session['admin_id'] = data[0].ID;
                        res.redirect('/admin/');
                    } else {
                        res.status(400).send('this password is incorrect').end()
                    }
                }
            }
        });

        console.log(username, password);
    });

    return router;
};