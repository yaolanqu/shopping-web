var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql');
var url = require('url');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/mProducts' });
var fs = require('fs');
var async = require('async');
var requestData = require('./tool/myRequest.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'mProduct',
            whereObj:{},
            showObj:{
                _id:0
            },
            success:(result)=>{
                res.render('mProduct', {
                    menuActiveIndex:5,
                    result,
                    flag:2,
                    len:result.length,
                    pageCode:0,
                    limitNum:4,
                    totalNum:1
                });
                db.close();
            }
        });
    })
});
router.get('/getInfo', function(req, res, next) {
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'mProduct',
            whereObj:{},
            showObj:{_id:0},
            success:(result)=>{
                res.send(result);
                db.close();
            }
        });
    })

});
router.get('/getdeInfo', function(req, res, next) {
    var iid = url.parse(req.url,true).query.id
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'mProduct',
            whereObj:{iid},
            showObj:{_id:0},
            success:(result)=>{
                res.send(result);
                db.close();
            }
        });
    })

});
//添加图片
router.get('/addmProduct', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'mProductImg',
            whereObj:{},
            showObj:{_id:0},
            success:(result)=>{
                res.render('mProduct_add',{
                    menuActiveIndex:5,
                    id,
                    result,
                    imgUrl:"",
                    rule:req.cookies.rule
                });
                db.close();
            }
        });
    })

});
router.post('/addmProductAction', function(req, res, next) {
    var insertObj = req.body;
    insertObj.flag = "1";//默认都是可用的
    mysql.connect((db)=>{
        mysql.insert(db,'mProduct',insertObj,(result)=>{
            res.redirect('/mProduct');
            db.close();
        });
    })
});
//删除图片
router.get('/deletemProduct', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    var deleteObj = {
        id
    };
    mysql.connect((db)=>{
        mysql.deleteOne(db,'mProduct',deleteObj,(result)=>{
            res.redirect('/mProduct');
            db.close();
        });
    })
});
//修改图片
router.get('/updatemProduct', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    res.render('mProduct_update',{
        menuActiveIndex:5,
        id,
        rule:req.cookies.rule
    });
});
router.post('/updatemProductAction', function(req, res, next) {
    var whereObj = {
        id : req.body.id
    }
    var updateObj = {
        $set:{
            image:req.body.image,
            name:req.body.name,
            price:req.body.price
        }
    }
    mysql.connect((db)=>{
        mysql.updateOne(db,'mProduct',whereObj,updateObj,(result)=>{
            res.redirect('/mProduct');
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
        mysql.updateOne(db,'mProduct',whereObj,updateObj,(result)=>{
            res.redirect("/mProduct");
            db.close();
        })
    })
});
router.get('/showUsemProduct', function(req, res, next) {

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
            collectionName:'mProduct',
            whereObj,
            showObj,
            success:(result)=>{
                res.render('mProduct',{
                    menuActiveIndex:5,
                    result,
                    flag,
                    len:result.length,
                    totalNum:1,
                    pageCode:0,
                    limitNum:4
                });
                db.close();
            }
        })
    })
});
router.post('/uploadmProduct', upload.single('mProductimg'), function (req, res, next) {
    var id = req.body.bid;
    var filename = req.file.filename;
    var realname = filename+"."+req.file.mimetype.split('/')[1];
    var imgUrl = '/mProducts/'+realname;
    console.log(id,filename,realname,imgUrl);
    fs.rename(__dirname+'/../uploads/mProducts/'+filename,__dirname+'/../uploads/mProducts/'+realname,(err,result)=>{
        if(err) return;
        mysql.connect((db)=>{
            mysql.insert(db,"mProductImg",{img:imgUrl},(result)=>{
                mysql.find({
                    db,
                    collectionName:"mProductImg",
                    whereObj:{},
                    showObj:{_id:0},
                    success:(result)=>{
                        console.log(id);
                        res.render('mProduct_add',{
                            menuActiveIndex:5,
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
})
router.get('/paging',(req,res,next)=>{
    var {pageCode,limitNum} = url.parse(req.url,true).query;
    async.waterfall([
        (cb)=>{
            mysql.connect((db)=>{
                mysql.find({
                    db,
                    collectionName:'mProduct',
                    whereObj:{},
                    showObj:{_id:0},
                    success:(result)=>{
                        console.log(result,333);
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
                collectionName:'mProduct',
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
                    console.log(result);
                }
            })
        }
    ],(err,result)=>{
        res.render('mProduct',{
            menuActiveIndex:5,
            result:result.result,
            len:result.len,
            totalNum:result.totalNum,
            pageCode:pageCode*1,
            flag:1,
            rule:req.cookies.rule
        });
    });
})
router.post('/insertProduct', function(req, res, next) {
    console.log(req.body);
    var {title,price,orgPrice,sale,cfav,showLarge,iid} = req.body;
    var insertObj = {title,price,orgPrice,sale,cfav,showLarge,iid}
    mysql.connect((db)=>{
        mysql.insert(db,"mProduct",insertObj,(result)=>{
            res.send("ok");
            db.close();
        });
    })

});
module.exports = router;
