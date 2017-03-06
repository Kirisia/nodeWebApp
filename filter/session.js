/**
 * Created by horou_dsk on 2017/2/14.
 */
const crypto = require('crypto');
global.interval=function(f,t,d){
    var timeFn=function(fn,timeout,delay){
        setTimeout(()=>{
            var forFn=function(){
                if(this.isout)return;
                fn();
                setTimeout(()=>{
                    forFn.call(this);
                },timeout);
            };
            forFn.call(this);
        },delay||0);
    };
    return new timeFn(f,t,d);
};
interval.cancel=function(_this){
    _this.isout=true;
    _this=undefined;
};
global.isArray=function(object){
    return object && typeof object==='object' &&
        Array == object.constructor;
};
function session_time(){
    var current_time=Date.now();
    mongoCollection("webSession",collection=>{
        collection.find().toArray(function(err,result){
            if(err)return;
            for(var val of result){
                if(current_time-val.time>3600000){
                    collection.remove({id:val.id},function(err,rr){
                    });
                }
            }
        });
    });
    setTimeout(session_time,600000);
}
setTimeout(()=>{
    session_time();
},10000);
module.exports=function(req,res){
    if(!req.getSession){
        var ExS=req.cookies[".ExS"];
        function setExS(){
            ExS = crypto.createHmac('md5',"xxx"+(session_id++)+"ooo"+Math.random())
                .digest('hex');
            res.cookie(".ExS",ExS,{httpOnly:true});
            mongoCollection("webSession",collection=>{
                collection.insert({"id":ExS,time:Date.now()});
            });
        }
        if(!ExS) {
            setExS();
        }
        req.getSession_num=0;
        req.sbodys={};
        req.setSession=function(val){
            req.isSetSession=true;
            mongoCollection("webSession",collection=>{
                collection.findOne({id:ExS},function(err,data){
                    if(!data){
                        collection.insert({id:ExS,time:Date.now()});
                    }
                    collection.update({id:ExS},{$set:val},true,false);
                    req.isSetSession=false;
                });
            });
        };
        req.getSession=function(key,fn){
            req.getSession_num++;
            var timer=interval(function(){
                if(!req.isSetSession){
                    mongoCollection("webSession",collection=>{
                        collection.findOne({id:ExS}).then(e=>{
                            var value;
                            if(!e){
                                collection.insert({id:ExS,time:Date.now()});
                                req.getSession_num--;
                                if(typeof fn==="function"){
                                    fn(req.sbodys);
                                }
                                return;
                            }
                            if(isArray(key)){
                                for(var i of key){
                                    value = e[i];
                                    if(!value)
                                        value=null;
                                    req.sbodys[i]=value;
                                }
                            }else{
                                value = e[key];
                                if(!value)
                                    value=null;
                                req.sbodys[key]=value;
                            }
                            req.getSession_num--;
                            if(typeof fn==="function"){
                                fn(req.sbodys);
                            }
                        });
                    });
                    interval.cancel(timer);
                }
            },100);
        };
        req.setFn=function(fn){
            var timer=interval(function(){
                if(!req.getSession_num){
                    fn(req.sbodys);
                    interval.cancel(timer);
                }
            },100);
        };
    }
};