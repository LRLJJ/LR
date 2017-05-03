/**
 * Created by samsung on 2017/4/6.
 */
    $(function(){
        banner();
        /*��ʼ��ҳǩ*/
        initTab();
        /*��ʼҳ���ϵĹ�����ʾ*/
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
        /*���Ƶ�����*/
        /*
         * 1.��������
         * 2.�ƶ��ľ��볬��50px ��Ϊ������
         * */
        if(isMove && Math.abs(distanceX) >= 50){
            /*����*/
            if(distanceX > 0){
                /*�һ�  ��һ��*/
                $banner.carousel('prev');
            }else{
                /*��  ��һ��*/
                $banner.carousel('next');
            }
        }
        /*����*/
        startX = 0;
        distanceX = 0;
        isMove = false;
    })


}


var initTab = function(){
    /*
     * 1.�����е�ҳǩ��һ����ʾ    ���ø������Ŀ���������������Ŀ��֮��
     * 2.�������������html�ṹҪ��   �����д���������һ��С����
     * 3.ʵ�ֻ�������                ʹ������������  iscroll
     * */

    /*������*/
    var tabs = $('.wjs_product .nav-tabs');
    /*���е�������*/
    var liList = tabs.find('li');


    /*1.�����е�ҳǩ��һ����ʾ    ���ø������Ŀ���������������Ŀ��֮��*/
    /*������֮��*/
    var width = 0;

    $.each(liList,function(i,item){
        /*width ���ݵĿ��*/
        /*innerWidth ���ݺ��ڱ߾�Ŀ��*/
        /*outerWidth ���ݺ��ڱ߾�ͱ߿�Ŀ��*/
        /*outerWidth(true) ���ݺ��ڱ߾�ͱ߿����߾�Ŀ��*/

        width += $(item).outerWidth(true);
    });

    tabs.width(width);

    /*2.�������������html�ṹҪ��   �����д���������һ��С����*/
    /*3.ʵ�ֻ�������                ʹ������������  iscroll*/
    new IScroll('.nav-tabs-parent',{
        scrollX:true,
        scrollY:false
    });


}
