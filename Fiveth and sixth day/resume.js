var oTag = document.getElementById("change");
var styleLink = document.getElementsByTagName("link")[0];
var i = 1;
oTag.onclick = function(){
    if(i == 4)
    {
        i = 1;
    }

    styleLink.href = "style_" + i + ".css";
    i++;
}
