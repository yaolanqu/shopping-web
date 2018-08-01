var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql');
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'secKill' ,
            whereObj:{},
            showObj:{
                _id:0
            },
            success:(result)=>{
                res.send(result);
                db.close();
            }
        });
    })
});
router.get('/getInfo', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'secKill',
            whereObj:{item_id:id},
            showObj:{_id:0},
            success:(result)=>{
                res.send(result);
                db.close();
            }
        });
    })

});
//添加图片
router.get('/addsecKill', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    res.render('secKill_add',{
        menuActiveIndex:3,
        id
    });
});
router.post('/addsecKillAction', function(req, res, next) {
    var insertObj = req.body;
    insertObj.flag = "1";//默认都是可用的
    mysql.connect((db)=>{
        mysql.insert(db,'secKill',insertObj,(result)=>{
            res.redirect('/secKill');
            db.close();
        });
    })
});
//删除图片
router.get('/deletesecKill', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    var deleteObj = {
        id
    };
    mysql.connect((db)=>{
        mysql.deleteOne(db,'secKill',deleteObj,(result)=>{
            res.redirect('/secKill');
            db.close();
        });
    })
});
//修改图片
router.get('/updatesecKill', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    res.render('secKill_update',{
        menuActiveIndex:3,
        id
    });
});
router.post('/updatesecKillAction', function(req, res, next) {
    var whereObj = {
        id : req.body.id
    }
    var updateObj = {
        $set:{
            images:req.body.images
        }
    }
    mysql.connect((db)=>{
        mysql.updateOne(db,'secKill',whereObj,updateObj,(result)=>{
            res.redirect('/secKill');
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
        mysql.updateOne(db,'secKill',whereObj,updateObj,(result)=>{
            res.redirect("/secKill");
            db.close();
        })
    })
});
router.get('/showUsesecKill', function(req, res, next) {

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
            collectionName:'secKill',
            whereObj,
            showObj,
            success:(result)=>{
                /*res.render('secKill',{
                    menuActiveIndex:3,
                    result,
                });*/
                res.send(result);
                db.close();
            }
        })
    })
});
router.get('/paging',(req,res,next)=>{
    var {pageCode,limitNum} = url.parse(req.url,true).query;
    async.waterfall([
        (cb)=>{
            mysql.connect((db)=>{
                mysql.find({
                    db,
                    collectionName:'secKill',
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
                collectionName:'secKill',
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
        res.render('secKill',{
            menuActiveIndex:5,
            result:result.result,
            len:result.len,
            totalNum:result.totalNum,
            pageCode:pageCode*1,
        });
    });
})
module.exports = router;
