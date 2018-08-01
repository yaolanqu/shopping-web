var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql');
var url = require('url');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/nav' });
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'nav',
            whereObj:{},
            showObj:{
                _id:0
            },
            success:(result)=>{
                res.render('nav', {
                    menuActiveIndex:2,
                    result,
                    len:result,
                    rule:req.cookies.rule
                });
                db.close();
            }
        });
    })
});
/*router.get('/getInfo', function(req, res, next) {
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'category',
            whereObj:{},
            showObj:{_id:0},
            success:(result)=>{
                res.send(result);
                db.close();
            }
        });
    })

});*/
router.post('/addCartGoods', function(req, res, next) {
    var insertObj = req.body;
    mysql.connect((db)=>{
        mysql.insert(db,'cart',insertObj,(result)=>{
            console.log(12212221);
            db.close();
        });
    })
});
/*//删除图片
router.get('/deleteCartGoods', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    var deleteObj = {
        id
    };
    mysql.connect((db)=>{
        mysql.deleteOne(db,'nav',deleteObj,(result)=>{
            res.redirect('/nav');
            db.close();
        });
    })
});
//修改
router.post('/updateCartGoods', function(req, res, next) {
    var whereObj = {
        id : req.body.id
    }
    var updateObj = {
        $set:{
            image:req.body.image,
            name:req.body.name,
            price:req.body.price,
            times:req.body.times
        }
    }
    mysql.connect((db)=>{
        mysql.updateOne(db,'nav',whereObj,updateObj,(result)=>{
            res.redirect('/nav');
            db.close();
        })
    })
});
//图片是否使用
router.get('/updateUse', function(req, res, next) {
    var obj = url.parse(req.url,true).query;
    var {id,type} = obj;
    var whereObj = {
        id
    }
    var updateObj = {
        $set:{
            flag:type
        }
    }
    mysql.connect((db)=>{
        mysql.updateOne(db,'nav',whereObj,updateObj,(result)=>{
            res.redirect("/nav");
            db.close();
        })
    })
});
router.get('/showUsenav', function(req, res, next) {

    var flag = url.parse(req.url,true).query.flag;
    var whereObj = {
        flag
    }
    var showObj = {
        _id:0
    }
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'nav',
            whereObj,
            showObj,
            success:(result)=>{
                res.send(result);
                db.close();
            }
        })
    })
});
router.post('/uploadnav', upload.single('recimg'), function (req, res, next) {
    var id = req.body.bid;
    var filename = req.file.filename;
    var realname = filename+"."+req.file.mimetype.split('/')[1];
    var imgUrl = '/nav/'+realname;
    console.log(id,filename,realname,imgUrl);
    fs.rename(__dirname+'/../uploads/nav/'+filename,__dirname+'/../uploads/nav/'+realname,(err,result)=>{
        if(err) return;
        mysql.connect((db)=>{
            mysql.insert(db,"navImg",{img:imgUrl},(result)=>{
                mysql.find({
                    db,
                    collectionName:"nav",
                    whereObj:{},
                    showObj:{_id:0},
                    success:(result)=>{
                        res.render('nav_add',{
                            menuActiveIndex:2,
                            result,
                            id,
                            imgUrl,
                            rule:req.cookies.rule
                        });
                    }
                })
            })
        })
    })
})*/
/*router.get('/paging',(req,res,next)=>{
    var {pageCode,limitNum} = url.parse(req.url,true).query;
    async.waterfall([
        (cb)=>{
            mysql.connect((db)=>{
                mysql.find({
                    db,
                    collectionName:'nav',
                    whereObj:{},
                    showObj:{_id:0},
                    success:(result)=>{
                        cb(null,{
                            db,
                            len:result.length
                        });
                    }
                });
            })
        },
        (config,cb)=>{
            mysql.paging({
                db:config.db,
                collectionName:'nav',
                whereObj:{},
                showObj:{_id:0},
                pageCode:pageCode*1,
                limitNum:limitNum*1,
                success:(result)=>{
                    cb(null,{
                        len:config.len,
                        totalNum:Math.ceil(config.len/limitNum),
                        pageCode:pageCode*1,
                        result
                    });
                }
            })
        }
    ],(err,result)=>{
        res.render('nav',{
            menuActiveIndex:2,
            result:result.result,
            len:result.len,
            totalNum:result.totalNum,
            pageCode:pageCode*1,
        });
    });
})*/
module.exports = router;
