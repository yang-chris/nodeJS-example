/**
 * Created by Administrator on 2017/3/11 0011.
 */
const express=require('express');
const static=require('express-static');
const mysql=require('mysql');
const cookieParser=require('cookie-parser');
const cookieSession=require('cookie-session');
const expressRoute=require('express-route');
const consolidate=require('consolidate');
const bodyParse=require('body-parser');
const multer=require('multer');
const common=require('./libs/common');
var server=express();
server.listen(8080);

//1获取请求数据
server.use(bodyParse.urlencoded());

var multerObj=multer({dest:'./static/upload'});
server.use(multerObj.any());
//2.cookie、session
server.use(cookieParser());
(function () {
    var keys=[];
    for(var i=0;i<100000;i++){
        keys[i]='a_'+Math.random();
    }
    server.use(cookieSession({
        name:'sess_id',
        keys:keys,
        maxAge:20*60*1000   //20min
    }));
})();

//3.模板
server.engine('html',consolidate.ejs);
server.set('views','template');
server.set('view engine','html');

//4.route
server.use('/',require('./route/web.js')());
server.use('/admin/',require('./route/admin/index.js')());

//5.default：static
server.use(static('./static/'));
