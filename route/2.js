/**
 * Created by Administrator on 2017/3/11 0011.
 */
const express=require('express');
module.exports=function () {
    var router=express.Router();

    router.get('/a.html',function (req,res) {
        res.send('我是blog').end();
    });
    router.get('/b.html',function (req,res) {
        res.send('我也是blog').end();
    });
    return router;
}