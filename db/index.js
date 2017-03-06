var mongoDBOpen=function(){
    var mongodb=require("mongodb");
    var server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
    var  db = new mongodb.Db('nodeWebSession', server, {safe:true});
    db.open(function(err,db){
        if(!err){
            db.createCollection("webSession",{safe:true},function(err,collection){
                if(err)return;
                collection.remove();
            });
            global.mongoCollection=function(col,fn){
                db.createCollection(col,{safe:true},function(err,collection){
                    if(err){
                        console.log(err);
                        return;
                    }
                    fn(collection);
                });
            };
            /*var tmp1={title:"测试数据"};
             var tmp2={title:"测试Hello World!"};
             collection.insert([tmp1,tmp2],{safe:true},function(err,result){
             console.log(result);
             });
             collection.find().toArray(function(err,docs){
             console.log("find");
             console.log(docs);
             });
             collection.findOne(function(err,doc){
             console.log("findOne");
             console.log(doc);
             })*/
        }else{
            console.log(err);
        }
    });
};
module.exports=mongoDBOpen;