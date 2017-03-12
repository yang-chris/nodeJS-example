/**
 * Created by Administrator on 2017/3/11 0011.
 */
const crypto=require('crypto');
var obj=crypto.createHash('md5');
obj.update('123456');
var str=obj.digest('hex');
console.log(str)