function getCookie(cName) {
	var cookie = document.cookie;
	//解码  
	cookie = decodeURIComponent(cookie);
	var arr = cookie.split('; ')
	for(var i = 0; i < arr.length; i++) {
		var item = arr[i];
		//id=121212
		var tArr = item.split('=');
		var cookieName = tArr[0]
		var cookieVal = tArr[1];
		if(cookieName == cName) {
			return cookieVal;
		}

	}
}

function setCookie(cName, cVal, n) {
	//编码  把中文变成 英语和特殊符号
	cVal = encodeURIComponent(cVal);
	var date = DateUtil.getDateAfter(n);
	//age这个cookie 存7天
	document.cookie = cName + '=' + cVal + ';expires=' + date+";path=/";
}
function removeCookie(name) {
	setCookie(name, '', -7)
}