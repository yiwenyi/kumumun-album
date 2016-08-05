/**
 * Created by Zyra on 2016/5/26.
 */
$(document).ready(function () {

    //点击图片放大
    $('.section').on('click', '.pic img', function () {
        console.log(this)
        $('.show').css({
            'width': innerWidth,
            'height': innerHeight
        })
        var src = $(this).get(0).src;
        var img = new Image();//创建一个新img元素 获得图片的实际宽高
        img.src = src;
        var imgWidth = img.width;
        var imgHeight = img.height;
        $('.show img').get(0).src = src;
        $('.show img').css({
            'left': innerWidth * 0.5 - imgWidth * 0.5,
            'top': innerHeight * 0.5 - imgHeight * 0.5
        });
        $('.show').fadeIn();
    })

    //点击放大的图片还原
    $('.show').click(function () {
        $(this).fadeOut()
    })



    //向下滚动添加图片
    var colHeight = [], Min;
    $(window).scroll(function () {
        var scrollTop = document.body.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        var bodyHeight = document.body.clientHeight;
        if (bodyHeight == scrollTop + clientHeight) {


            for (var i = 0; i < 8; i++) {//一次添加8张照片
                //获取每个列的高度
                $.each($('.col'), function (index) {
                    colHeight[index] = [index, $(this).height()];
                })
                Min = colHeight[0]
                $.each(colHeight, function (index, value) {
                    if (colHeight[index][1] < Min[1]) {
                        Min = colHeight[index]
                    }
                })
                $('div.col').eq(Min[0]).addPic();
            }
        }

    })
    $.fn.extend({
        addPic: function () {
            var rnd = Math.floor(Math.random() * 51 + 1);
            $(this).append("<dl class='pic'><dt><img src='http://7xtcml.com1.z0.glb.clouddn.com/image/jpg/" + rnd + ".jpg' alt=''/></dt><dd class='picName'>1111</dd><dd class='picExp'>2222</dd></dl>")
            return this
        }
    })

    //点击add
    var colLen;
    $('.add').click(function () {
        $('.section').append('<div class="col"></div>');
        colLen = $('.col').length;
        $('.col').css('width', 100 / colLen + '%')
        console.log($('.section div:last-child').height() +":"+Min)
        for(var i = 0;;i++){
            if($('.section div:last-child').height() > Min[1]){
                return
            }else{
                $('.section div:last-child').addPic();
            }
        }


    })
    //点击delete
    $('.delete').click(function () {
        $('.section div:last-child').remove()
        colLen = $('.col').length;
        $('.col').css('width', 100 / colLen + '%')
    })
})

