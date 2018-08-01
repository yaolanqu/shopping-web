$(function(){
    /****搜索*****************/
    /***获取用户名*****/
    if(localStorage.getItem("username")){
        $(".logout").css("display","none");
        $(".login").css("display","block");
        $(".login span").html("欢迎"+localStorage.getItem("username"));
        $(".leave").click(function(){
            localStorage.removeItem("username");
            location.href = "index.html";
        });    
    }else{
        $(".logout").css("display","block");
        $(".login").css("display","none")
    }
    var arr = JSON.parse(localStorage.getItem("record"));
    var totalNum = 0;
    if(arr){
        for(var i=0;i<arr.length;i++){
            totalNum += parseInt(arr[i].count);
        }
    }
    $(".mainCount").html(' '+totalNum+' ');
    (function(){
        $('.ipts').val("火力全开领劵满319减31块9");
        $('.ipts').focus(function(){
            $(this).val("");
        });
        $('.ipts').blur(function(){
            $(this).val("火力全开领劵满319减31块9");
        });
        var inputTxt = '';
        $(".ipts")[0].oninput = function(){
            inputTxt = $(this).val();
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
        $("#searchBtn").click(function(){
            location.href = 'html/list.html?word='+inputTxt
        });
    })();
    /****mainLunbo*************/
    (function(){
        var timer = null;
        var num = 0;
        var lunboStr = '';
        var tabDotStr = '';
        $.getJSON("http://localhost:3000/api/mainLunbo",function(obj){
            for(var i=0;i<obj.length;i++){
                if(i%2==0){
                    lunboStr += `
                        <li style="background-image: url('http://localhost:3000${obj[i].image}')">
                            <div class="ban-cter">
                                <div class="mav">
                                    <img src="img/lun-small1.png" alt="">
                                    <img src="img/lun-small2.jpg" alt="">
                                    <img src="img/lun-small3.png" alt="">
                                </div>
                            </div>
                        </li>
                    `;
                }else{
                    lunboStr += `
                        <li style="background-image: url('http://localhost:3000${obj[i].image}')">
                            <div class="ban-cter">
                                <div class="mav">
                                    <img src="img/lun-small4.png" alt="">
                                    <img src="img/lun-small5.jpg" alt="">
                                    <img src="img/lun-small6.png" alt="">
                                </div>
                            </div>
                        </li>
                    `;
                }
                tabDotStr += `
                    <span>${i+1}</span>
                `
                 ;

            }
            $("#mainLunbo").html(lunboStr);
            $(".tabDot").html(tabDotStr);
            $(".tabDot span").eq(0).addClass("on");
            /*$("#mainLunbo li").each(function(i){
                $(this).css("background-image","url('img/big-lunbo"+(i+1)+".jpg')");
            });*/
            $("#mainLunbo li").eq(0).css("display","block");
            $(".tabDot span").hover(function(){
                num = $(this).index();
                $("#mainLunbo li").eq($(this).index()).fadeIn(1000).siblings().fadeOut(1000);
                $(this).addClass("on").siblings().removeClass("on ");
            });
            autoplay();
            function autoplay(){
                timer = setInterval(function(){
                    num++;
                    if(num > 8) num = 0;
                    $("#mainLunbo li").eq(num).fadeIn(1000).siblings().fadeOut(1000);
                    $(".tabDot span").eq(num).addClass("on").siblings().removeClass("on");
                },2000);
            }
            $("#mainLunbo-wrap").hover(function(){
                clearInterval(timer);
            },function(){
                autoplay();
            });
        })

    })();
    /****二级菜单************/

    (function(){
        $.getJSON("json/subMenu.json",function(obj){
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
                                <img src="${item.image}">
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
    })();

    /****hotMain*************/
    (function(){
        $.getJSON("http://localhost:3000/api/secKill",function(obj){
            var str = "";
            for(var i=0;i<obj.length;i++){
                var item = obj[i];
                if((i+1) % 10 != 0){
                    str += `
                    <div>
                        <a href="html/item.html?id=${item.id}" title="${item.name}">
                            <img src="http://localhost:3000${item.image}" alt="" />
                            <p>${item.name}</p>
                            <span>${item.price}</span>
                        </a>
                    </div>
                    `;
                }else{
                    str += `
                    <div>
                        <a href="html/item.html?id=${item.id}" title="${item.name}">
                            <img src="http://localhost:3000${item.image}" alt="" />
                            <p>${item.name}</p>
                            <span>${item.price}</span>
                        </a>
                    </div>
                    `;
                    $(".hotMain-pic").append(`<div class="item">${str}</item>`);
                    str = "";
                }
            }
        });
        $(".hotMain-l-t li").mouseover(function(){
            $(this).addClass("on").siblings().removeClass("on");
            $(".hotMain-pic .item").eq($(this).index()).css("display","block").siblings().css("display","none");
        });
        $(".hotMain-r-st").eq(0).css("display","block");
        $(".hotMain-r-t li").mouseover(function(){
            $(this).addClass("on").siblings().removeClass("on");
            $(".hotMain-r-st").eq($(this).index()).css("display","block").siblings(".hotMain-r-st").css("display","none");
        });
        var timer = null;
        var num = 0;
        $(".hotMain-lb").each(function(){
            $(this).find(".hotDot span").eq(num).addClass("on");
            $(this).find("li").eq(num).css("display","block");
            $(this).find(".hotDot span").mouseover(function(){
                num = $(this).index();
                $(this).addClass("on").siblings().removeClass("on");
                $(".hotMain-lb li").eq(num).fadeIn(1000).siblings().fadeOut(1000);
            });
        });
        autoplay();
        function autoplay(){
            timer = setInterval(function(){
                num++;
                if(num>2) num = 0;
                $(".hotMain-lb").each(function(){
                    $(this).find(".hotDot span").eq(num).addClass("on").siblings().removeClass("on");
                    $(this).find("li").eq(num).fadeIn(1000).siblings().fadeOut(1000);
                });
            },2000);
        }
        $(".hotMain-lb").hover(function(){
            clearInterval(timer);
        },function(){
            autoplay();
        });
    })();
    /****commend*************/
    (function(){
        var num = 0;
        $.getJSON("http://localhost:3000/api/salePro",function(obj){
            var str = "";
            $.each(obj,function(i,n){
                var timeData = getDates(n.times);
                str += `
                    <div timer="${n.times}">
                        <a href="html/item.html?id=${n.id}" title="${n.name}">
                            <img src="http://localhost:3000${n.image}" alt="" />
                            <p>${n.name}</p>
                        </a>
                        <p>${n.price}</p>
                        <p class="count-time">${timeData}</p>
                    </div>
                `;
            })
            $(".rmd-lunbo").html(str);
            $(".rmd-lunbo div").each(function(){
                var that = this;
                $(this).times = setInterval(function(){
                    var subTime = parseInt($(that).attr("timer"));
                    subTime--;
                    $(that).attr("timer",subTime);
                    //console.log(subTime);
                    $(that).find(".count-time").html(getDates(subTime));
                    if(!subTime){
                        clearInterval(that.times);
                    }
                },1000)
            });
        });
        function getDates(n){
            var h = addZero(Math.floor(n/3600));
            var m = addZero(Math.floor(n/60%60));
            var s = addZero(Math.floor(n%60));
            return `剩余:<span>${h}</span>小时<span>${m}</span>分钟<span>${s}</span>秒`;
        }
        function addZero(num){
            return num<10?"0"+num:""+num;
        }
        $(".btn-left").click(function(){
            num--;
            if(num<0) num = 2;
            $(".rmd-lunbo").animate({"left":-1200*num},1000);
            $(".rmd-h2-r span").eq(num).addClass("on").siblings().removeClass("on");
        });
        $(".btn-right").click(function(){
            num++;
            if(num>2) num = 0;
            $(".rmd-lunbo").animate({"left":-1200*num},1000);
            $(".rmd-h2-r span").eq(num).addClass("on").siblings().removeClass("on");
        });
        $(".rmd-h2-r span").eq(0).addClass("on");
        $(".rmd-h2-r span").click(function(){
            num = $(this).index();
            $(this).addClass("on").siblings().removeClass("on");
            $(".rmd-lunbo").animate({"left":-1200*num},1000);
        });
    })();

    /****bottom************/
    (function(){
        $(".bSearch").focus(function(){
            $(this).val("");
        })
        $(".bSearch").blur(function(){
            $(this).val("请输入你的邮箱地址");
        })
    })();

    (function(){
        $.getJSON("json/mainProduct.json",function(obj){
            $.each(obj.data,function(i,n){
                var item = obj.data[i];
                var titpStr = "";
                var lboStr = "";
                var mainPicStr = "";
                var mainBtlStr = "";
                var mainBtpStr = "";
                var typeStr = "";
                var typechoStr = "";
                var dotBtnStr = "";
                var str = "";
                $.each(item.titP,function(i,val){
                    if(i != item.titP.length -1){
                        titpStr += `<a>${val}</a>|`;
                    }else{
                        titpStr += `<a>${val}</a>`;
                    }
                })
                $.each(item.lbo,function(i,val){
                    lboStr += `<li><img src="${val}"></li>`;
                })
                $.each(item.mainPic,function(i,val){
                    mainPicStr +=
                    `
                        <div>
                            <a href="html/item.html?id=${val.id}" title="${val.name}">
                                <img src="${val.image}" alt="" />
                                <p>${val.name}</p>
                            </a>
                            <p>${val.price}</p>
                        </div>
                    `;
                })
                $.each(item.hot,function(i,val){
                    var text = "";
                    $.each(val.text,function(a,b){
                        text += `<a>${b}</a>`;
                    })
                    mainBtlStr +=
                    `
                        <div>
                            <h3>${val.title}</h3>
                            <p>${text}</p>
                        </div>
                    `
                    ;
                })
                $.each(item.bbot[0].type,function(i,val){
                    if(i != item.bbot[0].type.length -1){
                        typeStr += `<a>${val}</a>|`;
                    }else{
                        typeStr += `<a>${val}</a>`;
                    }
                    dotBtnStr += `<span></span>`;
                })
                $.each(item.bbo,function(i,val){
                    mainBtpStr +=
                    `
                        <div>
                            <a href="html/item.html?id=${val.id}" title="${val.name}">
                                <img src="${val.image}" alt="" />
                            </a>
                            <p>
                                <a href="">${val.name}</a>
                                <a href="">${val.price}</a>
                            </p>
                        </div>
                    `;
                })

                str +=
                `
                    <div class="mainPro">
                        <h2>
                            <div class="tit-l">
                                <i class="pubIcon">${item.titC}</i>
                                <span>${item.titN}</span>
                            </div>
                            <div class="tit-r">
                                ${titpStr}
                            </div>
                        </h2>
                        <div class="mainPic">
                            <div class="lbo">
                                <ul class="list">${lboStr}</ul>
                                <div class="dotBtn">
                                    ${dotBtnStr}
                                </div>
                            </div>
                            <div class="mainPic-r">
                                ${mainPicStr}
                            </div>
                        </div>
                    </div>
                    <div class="mainBt">
                        <div class="mainBt-l">
                            ${mainBtlStr}
                        </div>
                        <div class="mainBt-r">
                            <h3>
                                <div class="mainBt-tit">${item.bbot[0].tit}</div>
                                <div class="mainBt-place">
                                ${typeStr}
                                </div>
                            </h3>
                            <div class="typecho">
                                <div class="typePic">
                                    ${mainBtpStr}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                $("#product-main").append(str);
            })
            $(".mainBt-r").each(function(){
                var that = this;
                $(this).find(".mainBt-place a").hover(function(){
                    $(that).find(".typePic").animate({"left":-$(this).index()*1000},400);
                });
            });
            $(".lbo").each(function(){
                $(this).find("span").eq(0).addClass("on");
                var that = this;
                $(this).find("span").click(function(){
                    $(that).find(".list").animate({left:-210*$(this).index()},600);
                    $(this).addClass("on").siblings().removeClass("on");
                });
            });
        })

    })();
})
