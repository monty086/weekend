// 1.获取元素

var list = document.getElementById('list');
var header = document.getElementById('header');
var btnList = header.getElementsByTagName('a');

// 2.获取数据
let data = null;
let xhr = new XMLHttpRequest();//AJAX对象
xhr.open('get','data/product.json',false);//打开地址
xhr.onreadystatechange = function () { // 监听状态及获取数据
    if(xhr.readyState==4 && xhr.status==200){
        data = JSON.parse(xhr.responseText)
    }
}
xhr.send()//发送ajax请求


bindHtml(data)
function bindHtml (data){
    let str =''
    data.forEach((item)=>{
        str += `
             <li>
            <a href="javascript:;">
                <img src="${item.img}" alt="">
                <p>华为产品之一</p>
                <p class="hot">热度:${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </a>
        </li>
        `
    })
    list.innerHTML=str
}

for(var i=0;i<btnList.length;i++){
    btnList[i].index = -1;
    btnList[i].onclick = function () {
        this.index*=-1
        // 价格
       let attrName = this.getAttribute('attrName')
        sortALL.call(this,attrName)
        arrowChange.call(this)
        clearArrow.call(this)
    }
}
function sortALL(attr) {
    data.sort((a,b)=>{
        return (attr=='time'?new Date(a[attr])-new Date(b[attr]):(a[attr]-b[attr]))*this.index
    });
    bindHtml(data)
}

function arrowChange (){
    let up = this.children[0];
    let down = this.children[1];
    if(this.index>0){
        up.classList.add('bg')
        down.classList.remove('bg')
    }else {
        up.classList.remove('bg');
        down.classList.add('bg')
    }
}

function clearArrow (){
    for(var i=0;i<btnList.length;i++){
        if(this != btnList[i]){
            btnList[i].children[0].classList.remove('bg')
            btnList[i].children[1].classList.remove('bg')
            btnList[i].index = -1
        }
    }
}






