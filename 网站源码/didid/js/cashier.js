$(document).ready(function(e) {
    $(".paymentList label").bind('click',function(){
        var index = $(this).parent().index();
        var top = 60*index;
        $(this).parent().addClass("checked").siblings().removeClass("checked");
        $("#payAmount").css('top',top+'px');
    });
    $(".sucCon b").html('￥'+localStorage.getItem("totalPrice"));
    $("#payAmount b").html('￥'+localStorage.getItem("totalPrice"))
    $(".payBtn").bind("click",function(){
        $(".cover").fadeIn(2000,function(){
            console.log(111);
            $(this).fadeOut(2000,function () {
                localStorage.removeItem("record");
                location.href = "../index.html";
            });
        });
    })
});