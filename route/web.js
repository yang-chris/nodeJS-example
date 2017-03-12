/**
 * Created by Administrator on 2017/3/11 0011.
 */
const express=require('express');
module.exports=function () {
    var router=express.Router();

    router.get('/',function (req,res) {
        res.send('我是web').end();
    });
    return router;
};