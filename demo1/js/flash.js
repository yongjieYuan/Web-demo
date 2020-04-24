window.onload= function(){  
		
    var prev = document.getElementById("prev"); //获取第一个按钮的id
    var next = document.getElementById("next");  //获取第二个按钮的id
    var img = document.getElementsById("flash_img")[0]; //获取img标签的第一个元素
    var imgarr = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg"]; //图片把路径存入数组中
    var index = 0; 
    var p = document.getElementById("duanluo");
    prev.onclick = function(){
        img.src = imgarr[index];
        if(index == 0){
            index = imgarr.length-1; 
            
        }  //单机响应函数
        
        else index--;  //控制第一个按钮的切换
        p.innerHTML = "这是第"+(index+1)+"张图片"; //显示第几张图片
    }
    next.onclick = function(){
        img.src = imgarr[index];
        if(index == imgarr.length-1){
            index = 0;
        }
        else index ++;  //控制第二个按钮图片切换
        p.innerHTML = "这是第"+(index+1)+"张图片";//向p中添加文字
    }		
}