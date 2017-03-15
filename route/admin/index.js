/**
 * Created by Administrator on 2017/3/11 0011.
 */
const express = require('express');
const common = require('../../libs/common');
const mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'learn'
});

module.exports = function () {
    var router = express.Router();

    //检查登录状态
    router.use(function (req, res, next) {
        if (!req.session['admin_id'] && req.url != '/login') {
            res.redirect('/admin/login');
        } else {
            next();
        }
    });


    //请求根目录下
    router.get('/', function (req, res) {
        res.render('admin/index.ejs', {})
    });
    //请求login
    router.use('/login',require('./login')());
    //请求banner
    router.use('/banner',require('./banner')());
    return router;
};