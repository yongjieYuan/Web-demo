var oImgs = document.getElementById("imgs");//获取图片
var oBox = document.getElementById("box");
var index = 1;//记录第几张图，默认从第一张图开始
var oTab = document.getElementById("tab").getElementsByTagName("li");
var oPre = document.getElementById("pre"),//上一个图片按钮
    oNext = document.getElementById("next");//下一个图片按钮
var nowTime = 0;
oTab[index-1].style.backgroundColor = "rgb(252, 125, .7)";//小按钮
//下一张图
oNext.onclick = function() {
    if(new Date() - nowTime  >= 300)
    {
		nowTime = new Date();//点击的间隔时间为3秒
		index ++;
		oTab[index-2].style.backgroundColor = "";
		move(oImgs,{marginLeft: -500*index + "px"},500,callback);
		if( index == 6 )
		{
			oTab[0] .style.backgroundColor = "rgb(252, 125, .7)";
		}
		else{
			oTab[index-1] .style.backgroundColor = "rgb(252, 125, .7)";
		}
    }
};
//上一张图
oPre.onclick = function() {
    if(new Date() - nowTime  >= 300)
    {
		nowTime = new Date();//点击的间隔时间为3秒
		oTab[index-1].style.backgroundColor = "";
		index--;
		move(oImgs,{marginLeft: -500*index + "px"},500,callback);
		if( index == 0 )
		{
			oTab[4].style.backgroundColor = "rgb(252, 125, .7)";
		}
		else{
			oTab[index -1 ] .style.backgroundColor = "rgb(252, 125, .7)";
		}
	}
};
//点击小按钮
for(var i = 0;i < oTab.length; i++)
{
    oTab[i].index = i;
    oTab[i].onclick =function() {
		oTab[index-1].style.backgroundColor = "";
        move(oImgs,{marginLeft: -500*(this.index+1) + "px"},500)
        oTab[this.index].style.backgroundColor = "rgb(252, 125, .7)";
        index = this.index + 1;
    }
}
//回调函数
function callback() {
	if( index == 6)
	{
		index = 1;
		this.style.marginLeft = "-500px";
		console.log(index);
	}
	else if(index == 0)
	{
		index = 5;
		this.style.marginLeft = "-2500px";
	}
}
//自动轮播
auto();
function auto(){
    turn = setInterval(function(){
    {
		nowTime = new Date();//点击的间隔时间为3秒
		index ++;
		oTab[index-2].style.backgroundColor = "";
		move(oImgs,{marginLeft: -500*index + "px"},500,callback);
		if( index == 6 )
		{
			oTab[0] .style.backgroundColor = "rgb(252, 125, .7)";
		}
		else{
			oTab[index-1] .style.backgroundColor = "rgb(252, 125, .7)";
		}
    }
    },3000);
 };
 //鼠标移入暂停
 oBox.onmouseenter = function() {
     clearInterval(turn);
 }
 //鼠标移出继续轮播
 oBox.onmouseleave =function(){
     auto();
 }
 //切换运动效果函数
function move(obj,myJson,during,callback,cv) {
    cv = cv || "linear";
    var startVal = {};//初始属性
    var endValu = {};//目标属性
    var startTime = new Date();//初始时间
    for(var key in myJson)
    {
        startVal[key] = parseInt(getStyle(obj,key));//获取要变的属性的初始值并将它转为整型；
        endValu[key] = parseInt(myJson[key]);//把目标属性值转化成整型
    }
    var timer = setInterval(function(){
        var time = new Date() - startTime;
        if(time >= during)
        {
            time = during;
            clearInterval(timer);
        }
        for( var key in myJson )
        {
            var b = startVal[key];
            var c = endValu[key] - b;
            var s = Tween[cv](time,b,c,during);
            obj.style[key] = s + "px";
		}
		if( time == during)
		{
			callback && callback.call(obj);
		}
    },13);
}

//获取属性
function getStyle (obj,attr){
    return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
}
//运动函数
var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线 //△s = aT²
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 3.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};