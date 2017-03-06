/**
 * Created by horou_dsk on 2017/2/9.
 */
var mysql=require("mysql");
global.mySql_collection=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    port:'3306',
    database:"njs"
});
var dao=require("../db/model");
module.exports={
    home:function(req,res){
        /*mySql_collection.query("select * from users",function(err,results,fields){
            if(err){console.log(err);return;}
            console.log(fields);
            res.render('index', { title: 'Home' ,sc:results});
        });*/
        dao.user.findAll().then(function(v){
            res.render('index', { title: 'Home' ,sc:v});
        }).catch(function(err){
            console.log(err);
        })

    }
};