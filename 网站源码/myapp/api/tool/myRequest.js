var http = require('http');
var https = require('https');
var tool = {
    requestData:(config)=>{
        var {protocol,options,success} = config;
        if(protocol == "https"){
            https.request(options,(res)=>{
                var str = "";
                res.on('data',(data)=>{
                    str += data;
                })
                res.on('error',(err)=>{
                    console.log(err);
                })
                res.on('end',()=>{
                    success(str);
                })
            }).end()
        }else{
            http.request(options,(res)=>{
                var str = "";
                res.on('data',(data)=>{
                    str += data;
                })
                res.on('error',(err)=>{
                    console.log(err);
                })
                res.on('end',()=>{
                    success(str);
                })
            }).end()
        }
    }
}
module.exports = tool;
