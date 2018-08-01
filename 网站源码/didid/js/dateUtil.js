var DateUtil = {
	
	//	判断某年份是否为闰年
	isleapYear:function(year){
		if(year%4==0 &&year%100!=0 || year%400==0){
			return true;
		}else{
			return false;
		}
	},
	//将日期格式化输出 “2015-08-24”
	format:function(date,sp){
		
		sp = sp || '|';
		date = date || (new Date)
		
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		
		
		var d = date.getDate();
		if(m <10){
			m = '0' + m;
		}
		if(d<10){
			d='0'+d;
		}
		return y+sp+m+sp+d
	}
	,
	//获得某个月份的天数
	getDays:function(y,m){
		if(m == 2){
			//this.isleapYear
			if(DateUtil.isleapYear(y)){
				return 29
			}else{
				return 28
			}
			
		}else if(m ==1 || m==3 || m==5 || m==7 ||m==8||m==10 ||m==12){
			return 31
		}else{
			return 30;
		}
		
	},
	
	//判断两个日期相差的天数
	getDisDays:function(date1,date2){
		var t = Math.abs(date1- date2);
		return Math.ceil(t/1000/60/60/24)
		
	},
	//获得N天以后的日期
	getDateAfter:function(n){
		var now = new Date();
		now.setDate(now.getDate()+n);
		return now;
	},
	toTimeStr:function(n){
		return n<10?'0'+n : n;
	}
	,
	//模仿微信上的时间显示
	getShowTime:function(date){
		//当天的0点
		var z = new Date();
		z.setHours(0)
		z.setMinutes(0)
		z.setSeconds(0)
		//0点的时间
		//0点之后的时间都显示，具体的时间
		//0点之前，先显示昨天， 昨天以前 显示日期
		
		var now = new Date();
		
		var str = '';
		//0点之后的时间都显示，具体的时间
		if(date > z){
			var h = date.getHours();
			var m = date.getMinutes();
			if(h >12){
				//下午
				str = '下午'+h+":"+this.toTimeStr(m);
			}else{
				//上午
				str = '上午'+h+":"+this.toTimeStr(m);
			}
		}else{
			//0点之前，先显示昨天， 昨天以前 显示日期
			//z;
			//昨天的零点时间
			var yz = z.setDate(z.getDate()-1);
			if(date > yz){
				//先显示昨天
				str = '昨天'
			}else{
				//， 昨天以前 显示日期  2012/21/1
				str  = this.format(date,'/')
			}
			
		}
		
		return str;
		
	}
	
	

}
