/*视频工场*/
var videofactory = function() {
    var self = this;
    this.getDevice = function() {
        if (/android/i.test(navigator.userAgent)) {
            return 'android';
        }

        if (/iphone/i.test(navigator.userAgent)) {
            return 'iphone';
        }

        if (/ipad/i.test(navigator.userAgent)) {
            return 'ipad';
        }

        if (/mac/i.test(navigator.userAgent)) {
            return 'mac';
        }

        if (/Windows/i.test(navigator.userAgent)) {
            return 'pc';
        }
        return 'unkone';
    };
    this.getPlayer = function(arg) {
        arg = $.extend({
            width: 850,
            height: 500,
            flv: '',
            ogg: '',
            mp4: '',
            teaserUrl: '',
            swfplayer: ''
        }, arg);
        var player = '<div>对不起，没有找到播放设备。</div>';
        var device = self.getDevice();
        switch (device) {
            case 'android':
                device = 'mac';
            case 'ipad':
                device = 'mac';
            case 'iphone':
                device = 'mac';
            case 'mac':
                tmp = '<video width="' + arg.width + '" height="' + arg.height + '"  autoplay="autoplay" controls="controls">' +
                    '<source src="' + arg.ogg + '" type="video/ogg">' +
                    '<source src="' + arg.mp4 + '" type="video/mp4">' +
                    'Your browser does not support the video tag.' +
                    '</video>';
                break;
            default:
                var swfplayer = arg.swfplayer || 'NonverBlaster.swf'/*tpa=http://www.dongfeng-honda-greiz.com/scripts/swf/NonverBlaster.swf*/;
                tmp = '<object data="' + swfplayer + '" id="video_object" width="' + arg.width + '" height="' + arg.height + '" type="application/x-shockwave-flash"' +
                    //' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"'+
                    '>' +
                    '<param value="transparent" name="wmode">' +
                    '<param value="true" name="allowFullScreen">' +
                    '<param value="mediaURL=' + arg.flv + '&amp;teaserURL=' + arg.teaserUrl + '&amp;allowSmoothing=true&amp;autoPlay=true&amp;buffer=6&amp;showTimecode=ture&amp;loop=false&amp;controlColor=0xFFFFFF&amp;controlBackColor=0x000000&amp;playerBackColor=&amp;defaultVolume=100&amp;scaleIfFullScreen=true&amp;showScalingButton=true&amp;crop=false" name="flashvars">' +
                    '<param value="NonverBlaster.swf"/*tpa=http://www.dongfeng-honda-greiz.com/scripts/swf/NonverBlaster.swf*/ name="src">' +
                    '<param name="movie" value="NonverBlaster.swf"/*tpa=http://www.dongfeng-honda-greiz.com/scripts/swf/NonverBlaster.swf*/>' +
                    '<param name="quality" value="high" />' +
                    '<embed src="NonverBlaster.swf"/*tpa=http://www.dongfeng-honda-greiz.com/scripts/swf/NonverBlaster.swf*/ movie="NonverBlaster" autoPlay="true" transparent="wmode" allowFullScreen="true" flashvars="' + arg.flv + '&amp;teaserURL=' + arg.teaserUrl + '&amp;allowSmoothing=true&amp;autoPlay=true&amp;buffer=6&amp;showTimecode=ture&amp;loop=false&amp;controlColor=0xFFFFFF&amp;controlBackColor=0x000000&amp;playerBackColor=&amp;defaultVolume=100&amp;scaleIfFullScreen=true&amp;showScalingButton=true&amp;crop=false" width="' + arg.width + '" height="' + arg.height + '" quality="high"  type="application/x-shockwave-flash" name="video_object"></embed>' +
                    '</object>';

        }
        return tmp;
    }
};
/*视频弹窗对象*/
var video = function() {
    //初始化方法
    this.init = function() {
        try {
            $("#d_video_layer").remove();
            var html = '<div class="scroll-videobg" id="d_video_layer"><div class="scroll-layer-close" id="d_video_layer_close"></div><div class="scroll-video-stage"><div class="scroll-video-container"></div><div class="scroll-video-list"></div></div></div>';

            $("body").append(html);

            function reset() {
                $('#d_video_layer').hide();
            };
            reset();
        } catch (e) {
            alert(e.message);
        }
    };
    //播放方法
    this.play = function(obj) {
        var flash = new videofactory();
        var parame = null;
        obj != undefined ? parame = obj : parame = null;
        if (parame == null) {
            throw new Error("参数错误，请传入正确的参数。例：{flv:'http://www.dongfeng-honda-greiz.com/scripts/xxx.flv',mp4:'http://www.dongfeng-honda-greiz.com/scripts/xxx.mp4'}");
            return;
        }
        player = flash.getPlayer({
            width: "100%",
            height: "100%",
            flv: parame.flv,
            ogg: '',
            mp4: parame.mp4,
            teaserUrl: '',
            swfplayer: 'NonverBlaster.swf'/*tpa=http://www.dongfeng-honda-greiz.com/scripts/swf/NonverBlaster.swf*/
        });
        var videolist = $(".cti-index-video-list").html();
        $('.scroll-video-container').html(player);
        $(".scroll-video-list").html(videolist);
        $('#d_video_layer').fadeIn();
        $('.d-layer-close').hide();
        $('.scroll-video-stage').css({
            "top": ($(window).height() - 480) / 2
        });
        $('#d_video_layer_close').css({
            "top": ($(window).height() - 480) / 2 - 40,
            "display": "block"
        });
        $('#d_video_layer_close').click(function() {
            $('#d_video_layer').fadeOut();
            //清除视频
            $('.scroll-video-container').html('');
        });
    };
    //调用初始化方法
    this.init();
};

$(function() {
    var vplayer = new video();
    window.playvideo = function(url, i) {
        vplayer.play({
            mp4: url,
            flv: url
        });
        var index = i;
        setTimeout(function() {
            $(".scroll-video-stage ul li").removeClass('d-active').eq(index).addClass('d-active');
        }, 1000);
    }
});
