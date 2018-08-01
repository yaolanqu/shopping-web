/**
 *
 * @authors Your Name (you@example.org)
 * @date    2018-03-07 16:39:32
 * @version $Id$
 */

function ajax(url,endFn){
    var xhr = new XMLHttpRequest();
    xhr.open("get",url);
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var obj = JSON.parse(xhr.responseText);
                endFn(obj);
            }
        }
    }
}
function ajax_bak(url,endFn){
    var xhr = new XMLHttpRequest();
    xhr.open("get",url);
    xhr.setRequestHeader('Authorization','APPCODE b56ceeed6e2449fc8985d4fe85769899');
    xhr.send();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            if(xhr.status == 200){
                var obj = JSON.parse(xhr.responseText);
                endFn(obj);
            }
        }
    }
}

