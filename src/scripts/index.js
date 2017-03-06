(function(){
    var interval=function(f,t,d){
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
    class Contoller{
        constructor(){
            var imgarr=["../images/b2.jpg","../images/b3.jpg"];
            var b1=document.querySelector(".background-imgA"),
                b2=document.querySelector(".background-imgB");
            b1.style.backgroundImage="url("+imgarr[0]+")";
            b2.style.backgroundImage="url("+imgarr[1]+")";
            var sw=false;
            interval(function(){
                if(sw){
                    b1.className="background-imgA fadeIn";
                    b2.className="background-imgB fadeOut";
                    sw=!sw;
                }else{
                    b1.className="background-imgA fadeOut";
                    b2.className="background-imgB fadeIn";
                    sw=!sw;
                }
            },5000,5000);
            var body=document.body,
                _html=body.parentNode;
            body.onscroll=function(){
                //console.log(_html.scrollTop);
            }
            /*body.addEventListener("scroll",function(){
                console.log(this.scrollTop);
            });*/
        }
        index(){
            console.log("执行！");
        }
    }
    var ctrl=new Contoller();
    ctrl[document.querySelector("[yctrl]").getAttribute("yctrl")]();
})();