$(function() {
    let toDoList = []; //记录正在进行的事件
    getData(); //获取本地数据
    loadData(); //加载（渲染）本地数据
    //当输入框敲下回车键触发的事件
    $("#title").on("keydown", function(e) {
            if (e.keyCode == 13) {
                //组织默认方法
                e.preventDefault();
                //内容不能为空
                if (e.target.value == '') {
                    alert('内容不能为空');
                } else {
                    let title = { title: e.target.value, done: false };
                    toDoList.push(title);
                    saveData();
                    loadData();
                    //敲击回车后将文本框的内容清空
                    e.target.value = "";
                }
            }
        })
        //勾选事项(点击每个任务列前的的复选框触发事件)
    $("ol,ul").on("click", "input", function(e) {
            //获取对应的li标签的索引号
            //这里就比较复杂了，自己的编码水平比较菜，暴力获取每个li标签的id中的数字，比如p-2
            let index = parseInt($(this).parent().prop("id")[2]);
            toDoList[index].done = $(this).prop("checked");
            saveData();
            getData();
            loadData();
        })
        //存取数据
    function saveData() {
        localStorage.setItem('todo', JSON.stringify(toDoList));
    }
    //获取本地的事项数据
    function getData() {
        //每一次执行该方法的时候都要将存放内容的数组（toDoList,doneList）给清空，使相同的内容不重复出现
        toDoList = [];
        //将本地的数据通过JSON解析成对象的格式取出来,并创建一个局部的todoData存入
        let todoData = JSON.parse(localStorage.getItem('todo'));
        //判断本地的数据是否为空
        if (todoData !== null) {
            //遍历这个局部的数组并存入到toDoList
            $.each(todoData, function(i, val) {
                toDoList.push(todoData[i]);
            })
        }
    }
    //加载事项数据
    function loadData() {
        let toDoCount = 0; //正在进行的事件个数
        let doneCount = 0; //已经完成的事件个数
        //先清理掉原来存在的li标签
        $('ol,ul').empty();
        //根据数据的内容创建列表
        $.each(toDoList, function(i, val) {
            //oLi代表有序列表里的li;uLi代表无序列表的li
            let oLi = "<li id='p-" + i + "'><input type='checkbox'><p>" + toDoList[i].title + "</p><a href='javascript:;' class='iconfont icon-lajitong'></a></li>";
            let uLi = "<li id='p-" + i + "'><input type='checkbox' checked><p>" + toDoList[i].title + "</p><a href='javascript:;' class='iconfont icon-lajitong'></a></li>";
            if (val.done) {
                $('ul').append(uLi);
                doneCount++;
            } else {
                $('ol').append(oLi);
                toDoCount++;
            }
        })
        $("#todocount").html(toDoCount);
        $("#donecount").html(doneCount);
    }
    //删除事项
    $("ol,ul").on("click", "a", function(e) {
            //获取所在的li标签的索引号
            let index = parseInt($(this).parent().prop("id")[2]);
            toDoList.splice(index, 1);
            saveData();
            getData();
            loadData();
            oTip();
        })
        //清除全部事项
    $("#clear").on("click", function() {
            toDoList.splice(0, toDoList.length);
            saveData();
            getData();
            loadData();
            oTip();
        })
        //如果事项都被删除了则弹出提示
    function oTip() {
        console.log(1);
        getData();
        if (toDoList.length == 0) {
            $("#tip").stop().removeClass("animate__fadeOutDown").addClass("animate__fadeInDown");
            setTimeout(function() {
                $("#tip").removeClass("animate__fadeInDown").addClass("animate__fadeOutDown");
            }, 2000);
        }
    }
})