/**
 * Created by Administrator on 2017/3/11 0011.
 */
const crypto=require('crypto');
module.exports={
    MD5_SUFFIX:'KJGHFTskjhkueY%^&&(!672819210这是MD5加密',
    md5:function (str) {
        var obj=crypto.createHash('md5');
        obj.update(str);
        return obj.digest('hex')
    }
};