$(function(){
    $(".login .btn").eq(0).css("backgroundPosition","-38px 10px");
    $(".login .btn").eq(1).css("backgroundPosition","-70px 10px");
    $(".login .btn").eq(2).css("backgroundPosition","-412px 10px");
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
    /*var cookie = JSON.parse(getCookie("p"));
    var name = cookie.name;
    var password = cookie.password;*/


    $(".pag").each(function(){
        var that = this;
        $(this).find(".ipt").focus(function(){
            $(that).find(".clear").css("display","block");
            $(this).val("");
            $(that).find(".hint").css("display","none");
        });
    })
    $(".pag").each(function(){
        var that = this;
        $(this).find(".ipt").blur(function(){
            $(that).find(".clear").css("display","none");
        });
    })
    $(".ipt").eq(0).blur(function(){
        var that = $(this).parent();
        $.getJSON('http://localhost:3000/api/userManage',(arr)=>{
            var isHas = false;
            for(var i=0;i<arr.length;i++){
                console.log(arr[i].username,$(this).val(),3333);
                if(arr[i].username == $(this).val()){
                    $(that).find(".hint").css("display","none");
                    isHas = true;
                }
            }
            if(!isHas){
                $(that).find(".hint").css("display","block");
                $(that).find(".hint-txt").html("请输入正确用户名");
            }
        })
    });
    $(".ipt").eq(1).blur(function(){
        var that = $(this).parent();
        $.getJSON('http://localhost:3000/api/userManage',(arr)=>{
            var isHas = false;
            for(var i=0;i<arr.length;i++){
                if(arr[i].password == $(this).val()){
                    $(that).find(".hint").css("display","none");
                    isHas = true;
                }
            }
            if(!isHas){
                $(that).find(".hint").css("display","block");
                $(that).find(".hint-txt").html("请输入正确密码");
            }
        })
    });
    $(".enter").click(function(){
        if(($(".code").html()).toLowerCase() == ($(".ipt").eq(2).val()).toLowerCase()){
            $.getJSON('http://localhost:3000/api/userManage',(arr)=>{
                for(var i=0;i<arr.length;i++){
                    console.log(arr[i].username,$(".ipt").eq(0).val());
                    if(arr[i].username == $(".ipt").eq(0).val() && arr[i].password==$(".ipt").eq(1).val()){
                        console.log(localStorage.setItem("username",$(".ipt").eq(0).val()));
                        location.href = "../index.html";
                    }
                }
            })
        }
    })
})

