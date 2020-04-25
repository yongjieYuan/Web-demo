function getDate()
{
var date= new Date();
var p= date.getHours();
var q;
var date1=date.toLocaleString();
var div1 =document.getElementById("time");
if(p<=10)
{
    q="上午";
    div1.innerHTML = q+"好!"+"今天是"+date1;
}
else if(p<=14)
{
    q="中午"
        div1.innerHTML = q+"好!"+"今天是"+date1;
}
else
{
    q="晚上"
        div1.innerHTML = -q+"好!"+"今天是"+date1;
}

}
setInterval("getDate()",1000);  
