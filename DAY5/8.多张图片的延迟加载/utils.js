var utils = (function () {

    function win(attr,value) {
        if(value == undefined){
            return document.documentElement[attr] || document.body[attr];
        }
        document.documentElement[attr]=value;
        document.body[attr]=value
    }

    function offset (ele){
        let L = ele.offsetLeft;
        let T = ele.offsetTop;
        let parent = ele.offsetParent;
        while (parent){
            //处理一下兼容性
            if(!/MEIE 8/i.test(window.navigator.userAgent)){
                L+= parent.clientLeft
                T+= parent.clientTop
            }
            L+= parent.offsetLeft
            T+= parent.offsetTop
            parent = parent.offsetParent
        }
        return {left:L,top:T}
    }
    function json(value) {
       return "JSON" in window? JSON.parse(value):eval("("+value+")")
    }
    return {
        win:win,
        offset:offset,
        json:json,
    }
})()