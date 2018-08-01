var express = require('express');
var router = express.Router();
var mysql = require("./tool/mysql");
var url = require("url")
var sendCode = require("./tool/sendCode")
var async = require("async")

/* GET users listing. */
router.post('/', function(req, res, next) {
    let { PhoneNumbers} = req.body;
    async.waterfall([
        function(cb){
            mysql.connect( ( db ) => {
                cb(null, db);
            })
        },
        function(db, cb){
            mysql.find({
                db,
                collectionName: "users",
                whereObj: {
                    username:PhoneNumbers
                },
                showObj:{_id:0},
                success:(result) => {
                    cb(null, {
                        db,
                        result
                    })
                }
            })
        }
    ], (err, result) => {
        if(result.result.length > 0){
            res.send({
                stats: 2
            })
        }else{
            sendCode.send({
                PhoneNumbers,
                code: '9527',
                success: () => {
                    res.send({
                        stats: 1,
                        code:'9527'
                    })
                },fail: () => {
                    res.send({
                        stats: 0
                    })
                }
            })
        }
    })
});

module.exports = router;
