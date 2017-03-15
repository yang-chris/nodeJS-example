const express=require('express');
const mysql = require('mysql');

var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'learn'
});
module.exports=function () {
    var router=express.Router();
    //请求banner页面
    router.get('/', function (req, res) {
        switch (req.query.act) {
            case 'mod':
                db.query(`SELECT * FROM banner_table WHERE id=${req.query.id}`, function (err, data) {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database errror0').end()
                    } else if (data.length == 0) {
                        res.status(400).send('data not found').end()
                    } else {
                        db.query(`SELECT * FROM banner_table`, function (err, banner) {
                            if (err) {
                                console.error(err);
                                res.status(500).send('database error1').end();
                            } else {
                                res.render('admin/banner.ejs', {banner, mod_data: data[0]})
                            }
                        })
                    }
                });
                break;
            case "del":
                db.query(`DELETE FROM banner_table WHERE ID=${req.query.id}`, function (err, data) {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/banner')
                    }
                });
                break;
            default:
                db.query(`SELECT * FROM banner_table`, function (err, banner) {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.render('admin/banner.ejs', {banner})
                    }
                });
                break;
        }

    });
    //提交banner数据
    router.post('/', function (req, res) {
        var title = req.body.title;
        var description = req.body.description;
        var href = req.body.href;
        console.log(title, '+++' + description + '+++' + href);
        if (!title || !description || !href) {
            res.status(400).send('数据不完整').end();
        } else {
            if (req.body.mod_id) {          //修改
                db.query(`UPDATE banner_table SET \
          title='${req.body.title}',\
          description='${req.body.description}',\
          href='${req.body.href}' \
          WHERE ID=${req.body.mod_id}`, function (err, data) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('database error 添加').end();
                    } else {
                        res.redirect('/admin/banner');
                    }
                })

            } else {      //添加
                db.query(`INSERT INTO banner_table (title,description,href) VALUE('${title}','${description}','${href}')`, function (err, data) {
                    if (err) {
                        console.error(err);
                        res.status(500).send('database error').end();
                    } else {
                        res.redirect('/admin/banner');
                    }
                })
            }
        }
    });

    return router
}