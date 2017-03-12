/**
 * Created by Administrator on 2017/3/11 0011.
 */
const express=require('express');
const common=require('../libs/common');
const mysql=require('mysql');

var db=mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'learn'
});

module.exports=function () {
    var router=express.Router();

    //检查登录状态
    router.use(function (req,res,next) {
        if(!req.session['admin_id']&&req.url!='/login'){
            res.redirect('/admin/login');
        }else{
            next();
        }
    });
    //请求页面
    router.get('/login',function (req,res) {
        res.render('admin/login.ejs',{});
    });
    //提交数据
    router.post('/login',function (req,res) {
        //res.send('我是admin').end();
        var username=req.body.username;
        var password=common.md5(req.body.password+common.MD5_SUFFIX);

        //数据库查询数据
        db.query(`SELECT * FROM admin_table WHERE username='${username}'`,function (err,data) {
            if(err){
                console.error(err);
                res.status(500).send('databese is error').end();
            }else{
                console.log(data);
                if(data.length==0){
                    res.status(400).send('no this admin').end();
                }else{
                    if(data[0].password==password){
                        req.session['admin_id']=data[0].ID;
                        res.redirect('/admin/');
                    }else{
                        res.status(400).send('this password is incorrect').end()
                    }
                }
            }
        })

        console.log(username,password);
    });

    //请求根目录下
    router.get('/',function (req,res) {
        res.render('admin/index.ejs',{})
    });
    //请求banner页面
    router.get('/banner',function (req,res) {
        res.render('admin/banner.ejs',{})
    });
    return router;
};