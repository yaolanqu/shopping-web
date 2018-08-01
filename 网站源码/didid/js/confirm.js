$(document).ready(function(){
    var totalPrice = 0;
    $.getJSON("http://localhost:3000/api/nav",function(obj) {
        var arr = JSON.parse(localStorage.getItem("record"));
        for (var i = 0; i < arr.length; i++) {
            var str = "";
            if (arr[i].count) {
                for (var j = 0; j < obj.length; j++) {
                    var item = obj[j];
                    if (item.id == arr[i].id) {
                        console.log(item.price,arr[i].count);
                        totalPrice += getPrice(item.price)*arr[i].count;
                        str +=
                            `
                        <div class="tMain">
        <div class="oTr">
            <div class="mainProduct ">
                <div class="oTd item-1">
                    <div class="img">
                        <a href="#" target="_blank">
                            <img src="http://localhost:3000${item.image}" width="60"
                            height="60">
                        </a>
                    </div>
                    <div class="name">
                        <a href="#" target="_blank"
                                         style="text-align: left;">${item.name}</a>
                    </div>
                </div>
                <div class="oTd item-2">${item.price}</div>
                <div class="oTd item-3">${arr[i].count}</div>
                <div class="oTd item-4">有货</div>
                <div class="oTd item-5">￥${arr[i].count*getPrice(item.price)}</div>
            </div>
        </div>
    </div>
                    `;
                    }
                }
                $(".totleNum").html("￥"+totalPrice);
                localStorage.setItem("totalPrice",totalPrice)
            }
            $('.orderCon').html(str);
        }
    })
    var password = '';
    $.getJSON("http://localhost:3000/api/userManage",function(arr){
        var username = localStorage.getItem("username");
        for(var i=0;i<arr.length;i++){
            if(arr[i].username == username){
                password = arr[i].password;
                console.log(1111,arr[i].address);
                if(arr[i].address !=''){
                    console.log(111);
                    $('.addressList').css("display","block");
                    $(".selfInfo").css("display","none");
                    $(".addressCon .pubTitle").html('<h3>收货地址</h3>');
                    $(".revUser").html(arr[i].receiver);
                    $(".address").html(arr[i].address);
                    $(".phoneNum").html(arr[i].username.substr(0,3)+"****"+arr[i].username.substr(arr[i].username.length-4,4));
                    $('#settlAddressInfo').html(arr[i].address);
                    $("#settlConsigneeInfo").html(arr[i].receiver);
                    $("#settlMobleInfo").html(arr[i].username.substr(0,3)+"****"+arr[i].username.substr(arr[i].username.length-4,4));
                }else{
                    $('.addressList').css("display","none");
                    $(".selfInfo").css("display","block");
                }
            }
        }
    })
    $(".saveAddress").click(function(){
        $('#settlAddressInfo').html($(".currentArea").val()+' '+$(".detailArea").val());
        $("#settlConsigneeInfo").html($(".revName").val());
        $("#settlMobleInfo").html($(".phoneNums").val());
        if(localStorage.getItem("username")){
            $.ajax({
                type:'post',
                url:'http://localhost:3000/api/userManage/insertData',
                data:{
                    username:localStorage.getItem("username"),
                    password:password,
                    address:$(".currentArea").val()+$(".detailArea").val(),
                    receiver:$(".revName").val()
                },
                success:(res)=>{}
            });
            $(".selfInfo").css("display","none");
            $('.addressList').css("display","block");
            $(".addressCon .pubTitle").html('<h3>收货地址</h3>');
            $(".revUser").html($(".revName").val());
            $(".address").html($(".currentArea").val()+' '+$(".detailArea").val());
            $(".phoneNum").html($(".phoneNums").val().substr(0,3)+"****"+$(".phoneNums").val().substr($(".phoneNums").val().length-4,4));
        }
    })
    $(".submitBtn").click(function(){
        location.href = './cashier.html'
    })
    function getPrice(price){
        return price.split("￥")[1]*1;
    }
})