/**
 * Created by samsung on 2017/4/6.
 */
    $(function(){
        banner();
        /*初始化页签*/
        initTab();
        /*初始页面上的工具提示*/
        $('[data-toggle="tooltip"]').tooltip();

    })

var banner =function(){
    var $banner=$(".carousel");

    var $point=$banner.find(".carousel-indicators");

    var $image=$banner.find(".carousel-inner");

    var $window=$(window);

    var data = [
        {
            pcSrc:'images/slide_01_2000x410.jpg',
            mSrc:'images/slide_01_640x340.jpg'
        },
        {
            pcSrc:'images/slide_02_2000x410.jpg',
            mSrc:'images/slide_02_640x340.jpg'
        },
        {
            pcSrc:'images/slide_03_2000x410.jpg',
            mSrc:'images/slide_03_640x340.jpg'
        },
        {
            pcSrc:'images/slide_04_2000x410.jpg',
            mSrc:'images/slide_04_640x340.jpg'
        }
    ]


    var render=function(){
        var isMobile=$window.width()<768?true:false;
        var pointHTML="";
        var imageHTML="";

        $.each(data,function(k,v){
            pointHTML += '<li data-target="#carousel-example-generic" data-slide-to="'+k+'" '+(k==0?'class="active"':'')+'></li>\n';

            imageHTML += '<div class="item '+(k==0?'active':'')+'">';

            if(isMobile){
                imageHTML += '<a class="m_imageBox" href="#"><img src="'+v.mSrc+'" /></a>';
            }else{
                imageHTML += '<a class="pc_imageBox" href="#" style="background-image: url('+v.pcSrc+');"></a>';
            }
            imageHTML += '</div>';
        })
        $point.html(pointHTML);
        $image.html(imageHTML);
    }

    $window.on("resize",function(){
        render();
    }).trigger("resize");


    var startX=0;
    var distanceX=0;
    var isMove=false;
    $banner.on('touchstart',function(e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function(e){
        /*手势的条件*/
        /*
         * 1.滑动过的
         * 2.移动的距离超过50px 认为是手势
         * */
        if(isMove && Math.abs(distanceX) >= 50){
            /*满足*/
            if(distanceX > 0){
                /*右滑  上一张*/
                $banner.carousel('prev');
            }else{
                /*左滑  下一张*/
                $banner.carousel('next');
            }
        }
        /*重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
    })


}


var initTab = function(){
    /*
     * 1.把所有的页签在一行显示    设置父容器的宽度是所有子容器的宽度之和
     * 2.满足区域滚动的html结构要求   必须有大容器套着一个小容器
     * 3.实现滑动功能                使用区域滚动插件  iscroll
     * */

    /*父容器*/
    var tabs = $('.wjs_product .nav-tabs');
    /*所有的子容器*/
    var liList = tabs.find('li');


    /*1.把所有的页签在一行显示    设置父容器的宽度是所有子容器的宽度之和*/
    /*计算宽度之和*/
    var width = 0;

    $.each(liList,function(i,item){
        /*width 内容的宽度*/
        /*innerWidth 内容和内边距的宽度*/
        /*outerWidth 内容和内边距和边框的宽度*/
        /*outerWidth(true) 内容和内边距和边框和外边距的宽度*/

        width += $(item).outerWidth(true);
    });

    tabs.width(width);

    /*2.满足区域滚动的html结构要求   必须有大容器套着一个小容器*/
    /*3.实现滑动功能                使用区域滚动插件  iscroll*/
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false
    });


}
