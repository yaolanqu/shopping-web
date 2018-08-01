var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql');
var url = require('url');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/secKills' });
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'salePro',
            whereObj:{},
            showObj:{
                _id:0
            },
            success:(result)=>{
                /*res.render('salePro', {
                    menuActiveIndex:4,
                    result,
                    flag:2
                });*/
                res.send(result);
                db.close();
            }
        });
    })
});
//添加图片
router.get('/addCarousel', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'salePro',
            whereObj:{},
            showObj:{_id:0},
            success:(result)=>{
                res.render('salePro_add',{
                    menuActiveIndex:4,
                    id,
                    result,
                    imgUrl:""
                });
                db.close();
            }
        });
    })

});
router.post('/addCarouselAction', function(req, res, next) {
    var insertObj = req.body;
    insertObj.flag = "1";//默认都是可用的
    mysql.connect((db)=>{
        mysql.insert(db,'salePro',insertObj,(result)=>{
            res.redirect('/salePro');
            db.close();
        });
    })
});
//删除图片
router.get('/deleteCarousel', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    var deleteObj = {
        id
    };
    mysql.connect((db)=>{
        mysql.deleteOne(db,'salePro',deleteObj,(result)=>{
            res.redirect('/salePro');
            db.close();
        });
    })
});
//修改图片
router.get('/updateCarousel', function(req, res, next) {
    var id = url.parse(req.url,true).query.id;
    res.render('salePro_update',{
        menuActiveIndex:4,
        id
    });
});
router.post('/updateCarouselAction', function(req, res, next) {
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
        mysql.updateOne(db,'salePro',whereObj,updateObj,(result)=>{
            res.redirect('/salePro');
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
        mysql.updateOne(db,'salePro',whereObj,updateObj,(result)=>{
            res.redirect("/salePro");
            db.close();
        })
    })
});
router.get('/showUseCarousel', function(req, res, next) {

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
            collectionName:'salePro',
            whereObj,
            showObj,
            success:(result)=>{
                res.send(result);
                db.close();
            }
        })
    })
});
router.post('/uploadsecKill', upload.single('secKillimg'), function (req, res, next) {
    var id = req.body.bid;
    var filename = req.file.filename;
    var realname = filename+"."+req.file.mimetype.split('/')[1];
    var imgUrl = '/secKills/'+realname;
    console.log(id,filename,realname,imgUrl);
    fs.rename(__dirname+'/../uploads/secKills/'+filename,__dirname+'/../uploads/secKills/'+realname,(err,result)=>{
        if(err) return;
        mysql.connect((db)=>{
            mysql.insert(db,"secKillImg",{img:imgUrl},(result)=>{
                mysql.find({
                    db,
                    collectionName:"salePro",
                    whereObj:{},
                    showObj:{_id:0},
                    success:(result)=>{
                        console.log(id);
                        res.render('salePro_add',{
                            menuActiveIndex:4,
                            result,
                            id,
                            imgUrl
                        });
                    }
                })
            })
        })
    })
})
module.exports = router;
