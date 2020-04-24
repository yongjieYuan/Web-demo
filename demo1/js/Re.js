function Name() {
    //验证姓名
    var name = document.getElementById("txtname").value; //获取你所填写的信息
    var nameReg = /^[\u4e00-\u9fa5]{2,6}$/;  //定义约束,要求输入2到6个中文
    if (!nameReg.test(name)) {   //判断
        var t = span_name.innerHTML = "请输入2~6个汉字!"; //输入不合法，则显示提示信息
        return false;
    }
    else {
        span_name.innerHTML = "格式正确"; //验证通过后提示
        return true;
    }
}
function Password() {
    //密码
    var pwd = document.getElementById("txtpwd").value;
    var reg = /^[\d\w]{6,12}$/;
    if (!reg.test(pwd)) {
        span_pwd.innerHTML = "请输入6~12以内数字、字母或组合密码";
    }
    else {
        span_pwd.innerHTML = "格式正确";
    }
}
function Email() {
    //邮箱验证
    var email = document.getElementById("txtemail").value;
    var reg1 = /^[\w\d]{1,9}@[\w\d]{1,9}\.[\w]{2,3}$/;
    if (!reg1.test(email)) {
        span_email.innerHTML = "错误!如:jack@163.com";
    }
    else {
        span_email.innerHTML = "格式正确";
    }
}