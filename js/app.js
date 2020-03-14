window.onload = function(){
    imgLocation("container","box");
    var imgData={"data":[{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]};
    window.onscroll = function(){
        if(this.checkFlag()){
            var cparent = document.getElementById("container");
            for(var i = 0; i < imgData.data.length; i++){
                var ccontent = document.createElement("div");
                ccontent.className = "box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className = "box_img";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src = "pic_man/" + imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function checkFlag(){
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
    // console.log(lastContentHeight);
    var scollTop = document.documentElement.scrollTop||document.body.scrollTop;
    // console.log(scollTop);
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    // console.log(lastContentHeight + ":"+ scollTop + ":" + pageHeight);
    if(lastContentHeight < scollTop + pageHeight){
        return true;
    }
}

function imgLocation(parent,content){
    //将父级控件下的所有的内容全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);
    var imgwidth = ccontent[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth/imgwidth);
    cparent.style.cssText = "width:"+imgwidth*num+"px;margin; 0 auto";
    var boxheightarr = [];
    for (var i = 0; i < ccontent.length; i++){
        if(i < num){
            boxheightarr[i] = ccontent[i].offsetHeight;
        } else{
            var minheight = Math.min.apply(null,boxheightarr);
            var minIdex = getminheightLocation(boxheightarr,minheight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minheight + "px";
            ccontent[i].style.left = ccontent[minIdex].offsetLeft+"px";
            boxheightarr[minIdex] = boxheightarr[minIdex]+ccontent[i].offsetHeight;
        }
    }
}

function getminheightLocation(boxheightarr, minheight){
    for(var i in boxheightarr) {
        if (boxheightarr[i] == minheight){
            return i;
        }
    }
}

function getChildElement(parent,content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    for (var i = 0; i < allcontent.length; i++){
        if (allcontent[i].className == content) {
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}