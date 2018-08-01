$(function(){
    $(".rapidEnter .pubIcon").each(function(i){
        $(this).css("backgroundPosition",-i*40+"px -163px")
    });
    $(".rapidEnter li").hover(function(){
        $(this).addClass("on").siblings().removeClass("on");
        if(!$(this).index){
            $(this).find(".pubIcon").css("backgroundPosition","-20px -163px")
        }else{
            $(this).find(".pubIcon").css("backgroundPosition",-(20+$(this).index()*40)+"px -163px")
        }

    },function(){
        $(this).find(".pubIcon").css("backgroundPosition",-($(this).index())*40+"px -163px")
        $(this).removeClass("on").siblings().removeClass("on");
    });
    $(".backTop").click(function(){
        var n = $(document).scrollTop();
        var timer = setInterval(function(){
            n -= 15;
            if(n<0){
                clearInterval(timer)
            }
            $(document).scrollTop(n);
        },13)
    });
})