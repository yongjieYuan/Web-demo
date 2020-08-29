var that;
var r = 3;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        this.add = document.querySelector(".addTab");
        this.con = document.querySelector(".con");
        this.init();
    }
    update() {
        this.lis = this.main.querySelectorAll("li");
        this.close = document.querySelectorAll(".close");
        this.section = document.querySelectorAll("section");
        this.spans = document.querySelectorAll("li>span:first-child");
    }
    init() {
        //初始化，让相关的元素绑定事件
        this.update();
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.close[i].index = i;
            this.lis[i].onclick = this.toggle;
            this.close[i].onclick = this.remove;
            this.spans[i].ondblclick = this.edit;
            this.section[i].ondblclick = this.edit;
        }
        this.add.addEventListener("click", that.addTab);
    }
    toggle() {
        that.clearStyle();
        this.className = "selected";
        that.section[this.index].className = "conactive";
    }
    clearStyle() {
        for (var i = 0; i < that.lis.length; i++) {
            that.lis[i].className = "";
        }
        for (var i = 0; i < that.section.length; i++) {
            that.section[i].className = "";
        }
    }
    addTab() {
        r++;
        that.clearStyle();
        that.main.insertAdjacentHTML('beforeend', '<li class="selected"><span>测试' + r + '</span><span class="close">×</span></li>');
        that.con.insertAdjacentHTML('beforeend', '<section class="conactive">测试' + r + '</section>');
        that.init();
    }
    remove(e) {
        e.stopPropagation(); //此处是阻止冒泡，防止li的点击事件触发，li点击事件里有给section的类名赋值，但是this.index的值是被删除的li的index，被删除了就找不到相应的li，会报错，所以要加阻止冒泡
        var index = this.parentNode.index;
        (that.lis[index]).remove();
        (that.section[index].remove());
        if (document.querySelector(".selected")) return; //如果删除的不是最后一个，页面如果还有其他的tab选中状态，则把原有的tab选中状态不变
        that.lis[index - 1] && that.lis[index - 1].click(); //每次删除一个tab后调用点击事件选定最后一个tab
        that.init();
    }
    edit() {
        var txt = this.innerHTML;
        this.innerHTML = '<input type="text" value=' + txt + ' > ';
        var input = this.children[0];
        input.select();
        input.onblur = function() {
            this.parentNode.innerHTML = this.value;
        }
        input.onkeyup = function(e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
}
var tab = new Tab("#Tab");