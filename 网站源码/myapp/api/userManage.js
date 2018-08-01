var express = require('express');
var router = express.Router();
var mysql = require('./tool/mysql');
var url = require('url');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/secKills' });
var fs = require('fs');
var async = require('async');
/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.url,2222222222222);
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'userManage',
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
router.post('/insertData',(req,res,next)=>{
    var {username,password,address,receiver} = req.body;
    var insertObj = {
        username,
        password,
        address,
        receiver
    }
    mysql.connect((db)=>{
        mysql.find({
            db,
            collectionName:'userManage',
            whereObj:{username},
            showObj:{
                _id:0
            },
            success:(result)=>{
                if(result.length > 0){
                    var whereObj = {
                        username
                    }
                    var updateObj = {
                        $set:{
                            address,
                            receiver
                        }
                    }
                    mysql.connect((db)=>{
                        mysql.updateOne(db,'userManage',whereObj,updateObj,(result)=>{
                        })
                    })
                }else{
                    mysql.insert(db,'userManage',insertObj,(result)=> {
                        cb(null, result);
                    })
                }
                db.close();
            }
        });
    })
});
router.post('/getData',(req,res,next)=>{
    var {password,username} = req.body;
    var whereObj = {
        username,
        password
    }
    async.waterfall([
        (cb)=>{
            mysql.connect((db)=>{
                cb(null,db);
            })
        },
        (db,cb)=>{
            mysql.find({
                db,
                collectionName:'users',
                whereObj,
                showObj:{_id:0},
                success:(result)=>{
                    cb(null,result);
                }
            })
        }
    ],(err,result)=>{
        if(result.length > 0){
            res.send(true);
        }else{
            res.send(false);
        }
    });
})
router.get('/deleteUser',(req,res,next)=>{
    var id = url.parse(req.url,true).query.id*1;
    var deleteObj = {
        id
    }
    console.log(id)
    mysql.connect((db)=>{
        mysql.deleteOne(db,'users',deleteObj,(result)=>{
            res.redirect('/users');
        })
    })
})
module.exports = router;
