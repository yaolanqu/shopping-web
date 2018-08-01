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
    /**查找展示信息************/
    (function(){
        var search = location.search;
        function getVal(url){
            var arr = url.split("?")[1];
            return arr.split("=")[1];
        }
        var word = encodeURI(getVal(search));
        $.getJSON("http://localhost:3000/api/nav/search?word="+word,function(obj){
            var str = '';
            for(var i=0;i<10;i++){
                for(var j=0;j<obj.length;j++){
                    str += `
                        <li>
                            <a href="./item.html?id=${obj[j].id}">
                            <img src="http://localhost:3000${obj[j].image}" alt="">
                            <p class="desc">${obj[j].name}</p>
                            <p class="price">${obj[j].price}</p>
</a>
                        </li>
                    `;
                }
            }
            $("#goods_list").html(str);
        })
    })()
})
