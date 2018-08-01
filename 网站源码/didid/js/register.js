$(function(){
    // var cookies = getCookie("p");
    $(".ipt").focus(function(){
        $(this).parent().css("borderColor","#cd7c83");
    });
    $(".ipt").blur(function(){
        $(this).parent().css("borderColor","#dcdcdc");
    });
    var reg1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    var reg2 = /^[a-zA-Z]\w{5,17}$/;
    var inpt1 = false;
    var inpt2 = false;
    var inpt3 = false;
    var inpt4 = false;
    $(".ipt").eq(0).focus(function(){
        $(".hint-txt").eq(0).css("background","#dcdcdc");
        $(".hint-txt").eq(0).html("请输入11位手机号");
        console.log(3333);
    });
    $(".ipt").eq(0).blur(function(){
        console.log(222);
        if(!reg1.test(this.value)){
            $(".hint-txt").eq(0).css("background","#f2727f");
            $(".hint-txt").eq(0).html("请输入正确手机号");
        }else{
            console.log(111);
            $.getJSON('http://localhost:3000/api/userManage',(arr)=>{
                console.log(arr);
                for(var i=0;i<arr.length;i++){
                    if(arr[i].username == this.value){
                        $(".hint-txt").eq(0).css("background","#f2727f");
                        $(".hint-txt").eq(0).html("手机号重复");
                        $(".close").eq(0).css({
                            "display":"none"
                        });
                        $(".hint-txt").eq(0).css("display","block");
                    }
                }
            })
        }
    });
    $(".ipt")[0].oninput = function(){
        if(reg1.test(this.value)){
            $(".close").eq(0).css({
                "backgroundPosition":"-139px 0",
                "display":"block"
            });
            $(".hint-txt").eq(0).css("display","none");
        }else{
            $(".close").eq(0).css({
                "display":"none"
            });
            $(".hint-txt").eq(0).css("display","block");
        }
    }

    $(".ipt").eq(2).focus(function(){
        $(".hint-txt").eq(1).css("background","#dcdcdc");
        $(".hint-txt").eq(1).html("请输入字母,数字,_组成6~18位密码");
    });
    $(".ipt").eq(2).blur(function(){
        if(!reg2.test(this.value)){
            $(".hint-txt").eq(1).css("background","#f2727f");
            $(".hint-txt").eq(1).html("请输入密码");
        }else{
            $.getJSON('http://localhost:3000/api/userManage',(arr)=>{
                for(var i=0;i<arr.length;i++){
                    if(arr[i].password == this.value){
                        $(".hint-txt").eq(1).css("background","#f2727f");
                        $(".hint-txt").eq(1).html("密码重复");
                        $(".close").eq(1).css({
                            "display":"none"
                        });
                        $(".hint-txt").eq(1).css("display","block");
                    }
                }
            })
        }
    });
    $(".ipt")[2].oninput = function(){
        if(reg2.test(this.value)){
            $(".close").eq(1).css({
                "backgroundPosition":"-139px 0",
                "display":"block"
            });
            $(".hint-txt").eq(1).css("display","none");
        }else{
            $(".close").eq(1).css({
                "display":"none"
            });
            $(".hint-txt").eq(1).css("display","block");
        }
    }
    var arr = ['0','1','2','3','4','5','6','7','8','9','A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];
    function randomCode(){
        var str = "";
        for(var i=0;i<4;i++){
            str += arr[Math.floor(Math.random()*arr.length)];
        }
        return str;
    }
    $(".code").html(randomCode());
    $(".code").click(function(){
        $(this).html(randomCode());
        return false;
    })
    $(".enter").click(function(){
        var ipt1Str = $(".ipt").eq(0).val();
        var ipt2Str = $(".ipt").eq(2).val();
        var ipt3Str = $(".ipt").eq(3).val();
        if(reg1.test(ipt1Str) && reg2.test(ipt2Str) && (ipt2Str ==  ipt3Str) && ($(".ipt").eq(1).val()).toLowerCase() == ($(".code").html()).toLowerCase()){
            $.ajax({
                type:'post',
                url:'http://localhost:3000/api/userManage/insertData',
                data:{
                    username:ipt1Str,
                    password:ipt2Str,
                    address:'',
                    receiver:''
                },
                success:(result)=>{
                    console.log(result);
                }
            });
            localStorage.setItem("username",ipt1Str)
            location.href = "../index.html";
        }
    });
})
