$(function(){
    $(document).scrollTop(200);
    //var cookieStr = getCookie("record")
    var cookieStr = localStorage.getItem("record")
    var search = location.search;
    function getVal(url){
        var arr = url.split("?")[1];
        return arr.split("=")[1];
    }
    var dataId = getVal(search);
    /****搜索*****************/
    (function(){
        $('.ipts').val("火力全开领劵满319减31块9");
        $('.ipts').focus(function(){
            $(this).val("");
        });
        $('.ipts').blur(function(){
            $(this).val("火力全开领劵满319减31块9");
        });
        $(".ipts")[0].oninput = function(){
            console.log(111);
            $(".requestTxt").css("display","block");
            $.getJSON("http://list.jiuxian.com/assKeyWords.htm?t=1521706998273&callback=?&wd="+this.value,function(data){
                var str = "";
                for(var i=0;i<data.resultList.length;i++){
                    str += `<li><a>${data.resultList[i].word}</a></li>`;
                }
                str += '<p><span></span></p>';
                $(".requestTxt").html(str);
            });
        }
        $(".requestTxt").hover(function(){
            $(this).css("display","block");
        },function(){
            $(this).slideUp(1000);
        });
        $(".requestTxt").click(function(e){
            var e = e || event;
            if(e.target.tagName == "SPAN"){
                $(".requestTxt").css("display","none");
            }
            return false;
        });
        $(document).click(function(){
            $(".requestTxt").css("display","none");
        });
    })();
    /*******二级菜单**********/
    (function(){
        $.getJSON("../json/subMenu.json",function(obj){
            for(var i=0;i<obj.data.length;i++){
                var item = obj.data[i];
                var str = "";
                var showMain = "";
                var hidTxt = "";
                for(var j=0;j<item.b.length;j++){
                    showMain += `<a>${item.b[j]}</a>`;
                }
                for(var k=0;k<item.c.length;k++){
                    var ddStr = "";
                    for(var s=0;s<item.c[k].e.length;s++){
                        ddStr += `<a>${item.c[k].e[s]}</a>`;
                    }
                    hidTxt += `<dl><dt>${item.c[k].d}</dt><dd>${ddStr}</dd></dl>`;
                }
                if(item.image){
                    str += `
                    <li>
                        <p>
                            <span class="pub-Icon"></span>
                            <span>${item.a}</span>
                        </p>
                        <p>${showMain}</p>
                        <div class="hid-m-Img hidMain-r">
                            <div class="hd-txt">
                                ${hidTxt}
                            </div>
                            <div class="hidImg">
                                <img src="../${item.image}">
                            </div>
                        </div>
                    </li>
                    `;
                }else{
                    str += `
                    <li>
                        <p>
                            <span class="pub-Icon"></span>
                            <span>${item.a}</span>
                        </p>
                        <p>${showMain}</p>
                        <div class="hid-m-noImg hidMain-r">
                            <div class="hd-txt">
                                ${hidTxt}
                            </div>
                        </div>
                    </li>
                    `;
                }

                $(".mainSubMenu").append(str);
            }
        })
        $(".mainSubMenu").css("display","none");
        $(".cateTit").hover(function(){
            console.log(111);
            $(".mainSubMenu").css("display","block");
        },function(){
            $(".mainSubMenu").css("display","none");
        });
        $(".mainSubMenu").hover(function(){
            $(this).css("display","block");
        },function(){
            $(this).css("display","none");
        });
    })();
    /*fdj*/
    (function(){
        $.getJSON("http://localhost:3000/api/nav",function(obj){
            $.each(obj,function(i,val){
                if(val.id == dataId){
                	console.log(val);
                    $(".nameTit").html(val.name);
                    $(".left-img").attr("src","http://localhost:3000"+val.image);
                    $(".bigImg").attr("src","http://localhost:3000"+val.image);
                    $(".bigImg").css({
                        width:800,
                        height:800
                    });
                    $(".bPrice").html(val.price);
                    $(".mcr-tit").html(val.name);
                    $("#goods").css("background","url(http://localhost:3000"+val.image+") no-repeat center center/30px 30px");
                }
            })
        });
        var oCover = $(".cover")[0];
        var oSmall = $("#main-txt")[0];
        var oBig = $(".big-pic")[0];
        var oBigImg = $(".bigImg")[0];
        var left = $(".show-pic")[0];
        oBigImg.style.width = 420*420/210 + "px";
        oBigImg.style.height = 420*420/210 + "px";
        left.onmouseenter = function(){
            oCover.style.display = "block";
            oBig.style.display = "block";
        }
        left.onmouseleave = function(){
            oCover.style.display = "none";
            oBig.style.display = "none";
        }
        left.onmousemove = function(e){
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                var e = e || event;
                var oLeft = e.pageX - oSmall.offsetLeft  - 105;
                var oTop = e.pageY - oSmall.offsetTop -105;
                if(oLeft <= 0){
                    oLeft = 0;
                }else if(oLeft >=230){
                    oLeft = 230;
                }
                if(oTop <= 0){
                    oTop = 0;
                }else if(oTop >= 230){
                    oTop = 230;
                }
                oCover.style.left = oLeft + "px";
                oCover.style.top = oTop + "px";
                oBigImg.style.left = -oLeft*(420/210) + "px";
                oBigImg.style.top = -oTop*(420/210) + "px";
            }
    })();
    /*右侧购物车管理*/
    (function(){
        $(".small-pic li").hover(function(){
            $(this).addClass("on").siblings().removeClass("on");
        });
        $(".add").click(function(){
            var value = parseInt($(".iptNum").val()) +1;
            $(".iptNum").val(value)
        });
        $(".reduce").click(function(){
            var value = parseInt($(".iptNum").val()) -1;
            if(value < 1) value = 1;
            $(".iptNum").val(value)
        });
        $(".cartShop").dblclick(function(){
            $(".skip-cover").css("display","block");
            $(".skip").css("display","block");
            setTimeout(function(){
                $(".skip-cover").css("display","none");
            },3000)
            return false;
        });
        $(".cartShop").click(function(e){
            var username = localStorage.getItem("username");
            if(username){
                var a = 0.002; //三元一次方程，a的值必须得知道
                var aGoods = document.getElementById("goods");
                aGoods.style.display = "block"
                var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                aGoods.offsetTop += scrollTop;
                var aCart = document.getElementById("right-side");
                var A = {
                    x:aGoods.offsetLeft,
                    y:aGoods.offsetTop
                }
                var B = {
                    x:1220+18,
                    y:265+scrollTop+35
                }
                var b = (A.y-a*A.x*A.x-(B.y-a*B.x*B.x))/(A.x-B.x);
                var c = A.y-a*A.x*A.x-b*A.x;
                var x = A.x;
                clearInterval(aGoods.timer);
                aGoods.timer = setInterval(function(){
                    var y = a*x*x + b*x + c;
                    aGoods.style.left = x + "px";
                    aGoods.style.top = y + "px";
                    if(aGoods.offsetLeft >= B.x){
                        clearInterval(aGoods.timer);
                        $("#goods").css({"left":630,"top":640})
                        $("#goods").css("display","none");
                    }
                    x += 25;
                },40);
                var cookieStr = localStorage.getItem("record");
                if(cookieStr){
                    var arr = JSON.parse(cookieStr);
                    var isHas = false;
                    for(var j=0;j<arr.length;j++){
                        if(dataId == arr[j].id){
                            isHas = true;
                            arr[j].count = parseInt(arr[j].count)+parseInt($(".iptNum").val());
                        }
                    }
                    if(isHas == false){
                        var num = $(".iptNum").val();
                        arr.push({"id":dataId,"count":num});
                    }
                }else{
                    var cut = $(".iptNum").val();
                    var arr = [{"id":dataId,"count":cut}];
                }
                localStorage.setItem("record",JSON.stringify(arr))
            }else{
                alert("登录成功后才能添加商品！");
            }
        });
        var cWidth = document.documentElement.clientWidth || document.body.clientWidth;
        var cHeight = document.documentElement.clientHeight || document.body.clientHeight;
        $(".skip").css("left",(cWidth-466)/2);
        $(".skip").css("top",(cHeight-320)/2);

        $(".skip .close").click(function(){
            $(".skip-cover").css("display","none");
            $(".skip").css("display","none");
        });
        var onOFF = true;
        $(".city").click(function(){
            if(onOFF){
                $(this).find(".detai-city").css("display","block");
            }else{
                $(this).find(".detai-city").css("display","none");
            }
            onOFF = !onOFF;
        })
    })();
    /****right cartShop****/
    (function(){
        $("#goodsCart").click(function(){
        $(".cartList").css("display","block");
        //var cookieStr = getCookie("record");
        var cookieStr = localStorage.getItem("record");
        if(cookieStr){
            var arr = JSON.parse(cookieStr);
            $.getJSON("http://localhost:3000/api/nav",function(obj){
                var str = "";
                $.each(obj,function(i,val){
                    for(var i=0;i<arr.length;i++){
                        if(arr[i].id == val.id){
                            str += `

                                <li data-id="${val.id}">
                                    <img src="http://localhost:3000${val.image}" alt="" />
                                    <p>${val.name}</p>
                                    <p>
                                        <span class="reduces hidden"></span>
                                        <span class="counts">${arr[i].count}</span>
                                        <span class="adds hidden"></span>
                                        <span class="lprice">${val.price.split(".")[0]}</span>
                                    </p>
                                    <span class="pub-Icon hidden"></span>
                                </li>
                            `;
                        }
                    }
                })
                $(".cartList .list").html(str);
                $(".cartList .cartClose").click(function(){
                    $(".cartList").css("display","none");
                });
                $(".cartList .list li").hover(function(){
                    var that = $(this);
                    $(this).find(".hidden").css("display","block");
                    $(this).find(".pub-Icon").click(function(){
                        //var arr = JSON.parse(getCookie("record"));
                        var arr = JSON.parse(localStorage.getItem("record"));
                        for(var i=0;i<arr.length;i++){
                            if($(that).attr("data-id") == arr[i].id){
                                $(".totalCount").html(parseInt($(".totalCount").html()) - parseInt(arr[i].count));
                                arr.splice(i,1);
                                if(arr.length<1){
                                    //removeCookie("record");
                                    localStorage.removeItem("record");
                                }else{
                                    //setCookie("record",JSON.stringify(arr),30);
                                    localStorage.setItem("record",JSON.stringify(arr))
                                }
                            }
                        }
                        $(that).remove();
                        getTotalPrice();

                    });
                    $(this).find(".adds").click(function(){
                        //var arr = JSON.parse(getCookie("record"));
                        var arr = JSON.parse(localStorage.getItem("record"));
                        for(var i=0;i<arr.length;i++){
                            if($(that).attr("data-id") == arr[i].id){
                                arr[i].count = parseInt(arr[i].count) + 1;
                                $(that).find(".counts").html(arr[i].count);
                                //setCookie("record",JSON.stringify(arr),30);
                                localStorage.setItem("record",JSON.stringify(arr));
                                getTotalNum();
                                getTotalPrice();
                            }
                        }
                    });
                    $(this).find(".reduces").click(function(){
                        //var arr = JSON.parse(getCookie("record"));
                        var arr = JSON.parse(localStorage.getItem("record"));
                        for(var i=0;i<arr.length;i++){
                            if($(that).attr("data-id") == arr[i].id){
                                arr[i].count = parseInt(arr[i].count) - 1;
                                $(that).find(".counts").html(arr[i].count);
                                //setCookie("record",JSON.stringify(arr),30);
                                localStorage.setItem("record",JSON.stringify(arr))
                                getTotalNum();
                                getTotalPrice();
                            }
                        }
                    });
                },function(){
                    $(this).find(".hidden").css("display","none");
                })
                getTotalNum();
                getTotalPrice();
                function getTotalNum(){
                    var num = 0;
                    $(".cartList .list li").each(function(i,val){
                        var count = parseInt($(this).find(".counts").html());
                        num += count;
                    });
                    $(".totalCount").html(num);
                }
                function getTotalPrice(){
                    var num = 0;
                    $(".cartList .list li").each(function(i,val){
                        var count = parseInt($(this).find(".counts").html());
                        var price = parseInt($(this).find(".lprice").html().split("￥")[1]);
                        num += count * price;
                    });
                    $(".cbPrice").html("共计 ：￥"+num);
                }
            });

        }
    })
    })()
})
