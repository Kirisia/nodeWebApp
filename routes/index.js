var express = require('express');
var router = express.Router();
var filter=require("../filter/filter");
var session=require("../filter/session");
var controller=require("../controller/index");
/* GET home page. */

router.use(function(req,res,next){
    session(req,res);
    var isok=filter(req,res);
    if(isok)next();
});

router.get('/', function(req, res, next) {
    req.getSession("cao",e=>{
        if(!e.cao){
            req.setSession({cao:"我靠",ai:"nima",hehe:"草"});
        }
    });
    controller.home(req,res);
});

router.get('/index',function(req,res){
    console.log(req.sbodys);
    res.send("Hello World");
});

router.get("/home",function (req,res) {
    req.getSession(["cao","ai"]);
    req.setFn(function(e){
        console.log(e);
        res.send(`<h1>hehe${e.cao}</h1>`);
    });
});

router.post("/addsql",function (req) {
    mySql_collection.query("insert into user(name,age) values(?,?),(?,?)",[req.body.name,req.body.age,"结束",555],function (err,result) {
        if(err)return;
        console.log(result);
    });
});

router.get("/jsonp",function(req,res){
    console.log("有请求！");
    res.send(`IPCallBack('{"id":123}')`);
});

module.exports = router;
