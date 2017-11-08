$(function() {
    //测试ie版本
    ietest.init();
    //亮点切换
    colour.init();
    //右边导航
    widget.init();
    //亮点
    lightspot.init();
    //顶部导航
    topbar.init();
    //配置表
    config.init();
    //计算器
    counter.init();
    //出台初始化
    scrollstage.init();
    //初始化工具
    ctitools.init();
    //预约试驾
    testdrive.init();
    //屏幕测试
    screentest.init();

});

/*
-------------------------------------顶部导航*/
var topbar = {
    init: function() {
        var $more = $(".top-menu-center .menu-more");
        var $topbar = $(".menu-one");
        this.$more_son = $(".menu-more-son");
        //返回顶部按钮
        var $btngoup = $(".cti-btn-gotop");
        //记录窗体的高度
        this.winH = $(window).height();
        //一级导航
        this.$onenav = $(".menu-one");
        //二级导航
        this.$secondnav = $(".cti-top-menu-second");
        var self = this;

        this.$secondnav.css({
            "top": $(window).height() - this.$secondnav.height(),
            "visibility": "visible"
        });

        $more.mouseenter(function(event) {
            /* Act on the event */
            self.$more_son.fadeIn();
        });

        $topbar.mouseleave(function(event) {
            /* Act on the event */
            self.$more_son.finish().fadeOut();
        });

        this.$more_son.mouseleave(function(event) {
            /* Act on the event */
            self.$more_son.finish().fadeOut();
        });

        $(".cti-index-kv-img").click(function(event) {
            /* Act on the event */
            self.$more_son.finish().fadeOut();
        });

        //返回顶部按钮
        $btngoup.click(function(event) {
            /* Act on the event */
            $("html,body").animate({
                scrollTop: 0
            }, "slow");
        });
        //坚挺滚动
        $(window).scroll(function() {
            // console.log($(window).scrollTop());
            if ($(window).scrollTop() > 800) {
                $btngoup.fadeIn();
            } else {
                $btngoup.fadeOut();
            }
        });


        //导航点击滚动关联
        setTimeout(function() {
            self.navclick();
            //执行滚动检测
            self.scroll();
        }, 1000);
    },
    hideslidenav: function() {
        this.$more_son.finish().fadeOut();
    },
    scroll: function() {
        var self = this;
        $(window).scroll(function(event) {
            var st = $(window).scrollTop();

            if (st > self.winH) {
                self.$secondnav.removeClass("d-absolute");
                self.$onenav.addClass('d-hide');
                self.$secondnav.css({
                    "top": "0"
                });
                //隐藏顶部下拉导航
                self.hideslidenav();
            } else {
                self.$onenav.removeClass('d-hide');
                self.$secondnav.addClass('d-absolute');
                self.$secondnav.css({
                    "top": $(window).height() - self.$secondnav.height(),
                    "visibility": "visible"
                });
            }
            //检测
            self.$secendlink.removeClass('d-active');
            self.$rightnavlink.eq(3).removeClass('d-active');

            if (st > self.offsetTops[0] - 10 && st < self.offsetTops[1] - 10) {
                self.$secendlink.eq(0).addClass('d-active');
            }
            if (st > self.offsetTops[1] - 10 && st < self.offsetTops[2] - 10) {
                self.$secendlink.eq(1).addClass('d-active');
            }
            if (st > self.offsetTops[2] - 10 && st < self.offsetTops[3] - 200) {
                self.$secendlink.eq(2).addClass('d-active');
            }
            if (st > self.offsetTops[3] - 200) {
                self.$secendlink.eq(3).addClass('d-active');
                self.$rightnavlink.eq(3).addClass('d-active');
            }
        });
    },
    navclick: function() {
        //导航点击
        this.$secendlink = $(".cti-second-nav-anchor");
        //右边导航关联
        this.$rightnavlink = $(".cti-right-fixed-nav ul li");
        var self = this;

        //记录坐标集合
        this.offsetTops = [];
        this.offsetTops.push($(".cti-lightspot-wrap").offset().top - 50);
        this.offsetTops.push($(".cti-config-wrap").offset().top - 50);
        this.offsetTops.push($(".cti-news-wrap").offset().top - 50);
        this.offsetTops.push($(".cti-dealerquery-wrap").offset().top - 50);
        this.$secendlink.click(function() {
            var i = $(this).index();
            var scrollTop = 0;
            self.$secendlink.removeClass('d-active');
            $(this).addClass('d-active');
            self.$rightnavlink.removeClass('d-active');
            switch (i) {
                case 1:
                    scrollTop = self.offsetTops[0];
                    break;
                case 2:
                    scrollTop = self.offsetTops[1];
                    break;
                case 3:
                    scrollTop = self.offsetTops[2];
                    break;
                case 4:
                    scrollTop = self.offsetTops[3];
                    //又导航
                    self.$rightnavlink.eq(3).addClass('d-active');
                    break;
            }
            //滚动
            $("html,body").animate({
                "scrollTop": scrollTop
            }, "slow");
        });
        self.$rightnavlink.click(function(event) {
            self.$rightnavlink.removeClass("d-active");
            $(this).addClass('d-active');
            if ($(this).index() == 3) {
                self.gopage(3);
            }
        });
    },
    gopage: function(i) {
        /* Act on the event */
        this.$secendlink.eq(i).trigger('click');
    },
    resetrightNav: function() {
        this.$rightnavlink.removeClass("d-active");
    }
}

/*浮窗导航
=======================================*/
var widget = {
    init: function() {
        //判断分辨率
        if ($(window).width() <= 1024) {
            return;
        }
        $('.d-slide-1-widget').addClass('d-amt-rotateUnfoldLeft').show();
        //视频关闭
        $('#d_video_layer_close').click(function() {
            $('#d_video_layer').fadeOut();
            $('#d_video_create').html('');
        });
        $('.d-slide-1-code-txt').mouseenter(function() {
            var self = this;
            setTimeout(function() {
                $(self).css('background-position', '0 0');
                $('.d-slide-1-widget').addClass('d-slide-1-widget-extends');
                $('.d-slide-1-code>img').show();
            }, 200);
        });
        $('.d-slide-1-widget').mouseleave(function() {
            setTimeout(function() {
                $('.d-slide-1-code-txt').css('background-position', '0 -18px');
                $('.d-slide-1-widget').removeClass('d-slide-1-widget-extends');
                $('.d-slide-1-code>img').hide();
            }, 200);
        });
        $('.d-slide-1-app-txt').mouseenter(function() {
            var self = this;
            setTimeout(function() {
                $(self).css('background-position', '0 0');
                $('.d-slide-1-widget').addClass('d-slide-1-widget-extends');
                $('.d-slide-1-app>.qrapp1').hide();
                $('.d-slide-1-app>.qrapp,.mpsystem').show();
                $('.d-slide-1-app').css({
                    'z-index': '9999'
                });
                $('.d-slide-1-code').css({
                    'display': 'none'
                });
                $('.android').css({
                    'opacity': '0.3'
                });
                $('.ios').css({
                    'opacity': '1'
                });
            }, 200);
        });
        $('.d-slide-1-app').mouseleave(function() {
            setTimeout(function() {
                $('.d-slide-1-app-txt').css('background-position', '0 -18px');
                $('.d-slide-1-widget').addClass('d-slide-1-widget-extends');
                $('.d-slide-1-app>img,.mpsystem').hide();
                $('.d-slide-1-app').css({
                    'margin-top': '8px',
                    'z-index': '9999',
                    'background': 'none',
                    'padding': '0'
                });
                $('.d-slide-1-code').css({
                    'display': 'block'
                });
            }, 200);
        });
        $('.ios').mouseenter(function() {
            $('.qrapp').show()
            $('.qrapp1').hide();
            $('.ios').css({
                'opacity': '1'
            });
            $('.android').css({
                'opacity': '0.3'
            });
        });
        $('.android').mouseenter(function() {
            $('.qrapp1').show();
            $('.qrapp').hide();
            $('.ios').css({
                'opacity': '0.3'
            });
            $('.android').css({
                'opacity': '1'
            });
        });
    }
}


//颜色切换
var colour = {
    init: function() {
        var $lightli = $(".cti-colour-toggle-btn ul li");
        var $imgs = $(".cti-colour-car-img img");
        var $imgcontainer = $(".cti-colour-car-img");

        //预加载第一张图片
        $("<img>").on("load error", function() {
            resize();
            $imgcontainer.addClass('d-active');
            $(window).resize(function(event) {
                /* Act on the event */
                resize();
            });
        }).attr("src", $imgs.eq(0).attr("src"));

        function resize() {
            var winw = $(window).width();
            if (winw <= 1366) {
                winw = winw * 0.7;
            } else {
                winw = winw * 0.565;
            }
            var winh = winw * 0.425;
            $imgcontainer.css({
                "width": winw,
                "height": winh
            });
        }

        $lightli.mouseenter(function(event) {
            /* Act on the event */
            $imgs.removeClass('d-show');
            $imgs.eq($(this).index()).addClass('d-show');
            $lightli.removeClass('d-active');
            $(this).addClass('d-active');
        });
    }
}

//亮点
/*动画停止判断*/
var animationend = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
var lightspot = {
    init: function() {
        //关闭弹窗
        this.$alertwrapper = $(".cti-lightspot-alert-wrap");
        //亮点列表
        this.$lightspotlist = $(".cti-lightspot-item");
        //弹窗列表
        this.$lightspotitemmax = $(".cti-lightspot-item-max");
        var self = this;
        var self = this;
        var speed = 800;
        if (ietest.islowerversion) {
            speed = 10;
        }
        this.swiper = new Swiper("#cti-news-swiper", {
            loop: false,
            speed: speed,
            pagination: ".cti-news-pagination",
            calculateHeight: true,
            paginationClickable: true,
            onSwiperCreated: function() {
                setTimeout(function() {
                    paginInit();
                }, 500);
            }
        });

        function paginInit() {
            var $pagins = $(".cti-news-pagination .swiper-pagination-switch");
            $pagins.each(function(index, el) {
                $(el).html("<label></label>");
            });

            $pagins.find("label").click(function() {
                $(this).parent().trigger("click");
            });
        }

        this.$lightspotlist.click(function(event) {
            /* Act on the event */
            self.$alertwrapper.show();
            self.$lightspotitemmax.hide();
            //ie版本低性能显示
            if (ietest.islowerversion) {
                self.$lightspotitemmax.eq($(this).index()).show();
                return;
            }
            self.$lightspotitemmax.eq($(this).index()).fadeIn();
        });

        //通用切换
        this.commonchange();
        //二级滑块切换
        this.secondSlide();
        //底部数量分组
        this.seelingChange();
    },
    commonchange: function() {
        //极致空间
        var self = this;
        //关闭按钮
        this.$close = $(".cti-lightspot-item-close img");
        //买点大图
        this.$sellings;
        //选项卡列表
        this.$sellingstab = $(".cti-lightspot-item-sellings-tab li");
        //选项卡最外层容器
        this.$sellingstabwrapper = $(".cti-lightspot-item-sellings");
        //背景大图容器
        this.$sellingsbg = $(".scroll-stage-wrapper");
        this.$sellingsshadow = $(".scroll-stage-wrapper-shadow");
        //点击关闭按钮
        this.$close.click(function(event) {
            if (!isopen) {
                self.closeAlert();
                return;
            }
            /* Act on the event */
            prevIndex = -1
            if (ietest.islowerversion) {
                $(".cti-lightspot-maxpic li").hide();
            } else {
                //隐藏所有二级的内容
                $(".cti-lightspot-maxpic li").removeClass('rollInRight rollOutRight rollOutLeft rollInLeft');
            }
            self.$sellingsbg.removeClass('blur');
            self.$sellingsshadow.removeClass('blur-shadow');
            //显示大标题
            $(".cti-lightspot-item-title").show();
            //清除选中状态
            self.$sellingstab.removeClass('d-active');
            isopen = false;
        });
        //标识是否是第一次
        var prevIndex = -1;
        //记录上一次的节点
        var $prevNode;
        //标识是否打开了二级页面
        var isopen = false;
        this.$sellingstab.click(function(event) {
            //开启标识
            isopen = true;
            var parentIndex = $(this).parents(".cti-lightspot-item-max").index();
            var index = $(this).index();
            self.$sellings = self.$lightspotitemmax.eq(parentIndex).find(".cti-lightspot-maxpic li");
            //添加选中样式
            self.$sellingstab.removeClass('d-active');
            $(this).addClass('d-active');
            self.$sellings.css({"z-index":"-1"});
            self.$sellings.eq(index).css({"z-index":"99"});
            // =================zwy=====================================
            if (self.$sellings.eq(index).hasClass("zwy")) {
                var zwy = new Swiper('.zwy-swiper-container',{
                    loop : false,//可选选项，开启循环
                    calculateHeight : true,
                    initialSlide :1,
                    onInit: function(swiper){
                       $('#arr_right').fadeIn();
                       $('#arr_left').fadeIn();
                    },
                    onSlidePrev: function(swiper){ 
                      $('#arr_right').fadeIn();
                      if(swiper.activeIndex<=0){
                         $('#arr_left').fadeOut();
                      }else{
                         $('#arr_left').fadeIn();
                      }
                    },
                    onSlideNext:function(swiper){
                        
                      $('#arr_left').fadeIn();
                      if(swiper.activeIndex==swiper.slides.length-1){
                         $('#arr_right').fadeOut();
                      }else{
                          $('#arr_right').fadeIn();
                      }
                    }
                })
                $('#arr_left').click(function(){
                    zwy.swipePrev(); 
                })
                $('#arr_right').click(function(){
                    zwy.swipeNext(); 
                })
                 $('.zwynano01').nanoScroller();
                 $('.zwynano02').nanoScroller();
                 $('.zwynano01 .pane,.zwynano02 .pane').remove();
                 $('.zwynano01').nanoScroller();
                 $('.zwynano02').nanoScroller();
            }
            // =================zwy=====================================
            
            //判断是不是第一次悬浮
            if (prevIndex == -1) {
                //设置背景模糊
                self.$sellingsbg.eq(parentIndex).addClass('blur');
                self.$sellingsshadow.eq(parentIndex).addClass('blur-shadow');
                //隐藏标题
                var $titlemax = $(this).parents(".cti-lightspot-item-sellings").find(".cti-lightspot-item-title").hide();
                prevIndex = index;
                setTimeout(function() {
                    startMove(true);
                }, 500);
            } else {
                startMove(false);
            }
            //如果是ie旧版本
            // if (ietest.islowerversion) {
            //     self.$sellings.hide();
            //     self.$sellings.eq(index).show();
            //     return;
            // }

            function startMove(isfirst) {
                //判断左右方向
                if (prevIndex > index) {
                    //如果不是第一次就执行移除动画
                    if (!isfirst) {
                        $prevNode.removeClass('rollInRight rollInLeft rollOutRight').addClass('rollOutLeft animated');
                    }
                    setTimeout(function() {
                        self.$sellings.eq(index).removeClass('rollOutLeft rollInLeft rollOutRight').addClass('rollInRight animated');
                        $prevNode = self.$sellings.eq(index);
                    }, 400);
                } else {
                    //如果不是第一次就执行移除动画
                    if (!isfirst) {
                        $prevNode.removeClass('rollInLeft rollInRight rollOutLeft').addClass('rollOutRight animated');
                    }
                    setTimeout(function() {
                        self.$sellings.eq(index).removeClass('rollOutRight rollInRight rollOutLeft').addClass('rollInLeft animated');
                        $prevNode = self.$sellings.eq(index);
                    }, 400);
                }
                prevIndex = index;
            }
        });
        //鼠标离开买点选项卡的时候取消背景模糊
    },
    secondSlide: function() {
        //二级切换
        this.$arrows = $(".cti-lightspot-maxpic-sliders-arrows a");
        //图片列表
        this.$piclist = $(".cti-lightspot-maxpic-sliders-list img");
        var scrollIndex = 0;
        var self = this;
        this.$arrows.click(function(event) {
            /* Act on the event */
            var i = $(this).index();
            switch (i) {
                case 0:
                    if (scrollIndex > 0) {
                        scrollIndex--;
                    }
                    break;
                case 1:
                    if (scrollIndex < self.$piclist.length - 1) {
                        scrollIndex++;
                    }
                    break;
            }
            self.$piclist.hide();
            self.$piclist.eq(scrollIndex).show();
        });
    },
    seelingChange: function() {
        //底部买点切换
        var $sellingArrows = $(".cti-lightspot-item-sellings-tab-arrows a");
        var $sellingList = $("#cti_lightspot_safety_sellinglist li");

        var scrollIndex = 1;
        var groups = Math.round($sellingList.length / 4);
        var self = this;
        $sellingArrows.click(function(event) {
            /* Act on the event */
            var i = $(this).index();
            var $tablist = $(this).parents(".cti-lightspot-item-max").find(".cti-lightspot-safety-sellinglist li");
            switch (i) {
                case 0:
                    //隐藏列表
                    $sellingList.removeClass('d-hide');
                    $sellingList.eq(4).addClass('d-hide');
                    $sellingList.eq(5).addClass('d-hide');
                    //触发单机事件

                    $tablist.eq(0).trigger('click');
                    //隐藏箭头
                    $sellingArrows.hide().eq(1).show();
                    break;
                case 1:
                    //隐藏列表
                    $sellingList.removeClass('d-hide');
                    $sellingList.eq(0).addClass('d-hide');
                    $sellingList.eq(1).addClass('d-hide');
                    //触发单机事件
                    $tablist.eq(2).trigger('click');
                    //隐藏箭头
                    $sellingArrows.hide().eq(0).show();
                    break;
            }
        });
    },
    closeAlert: function() {
        //关闭浮窗
        if (ietest.islowerversion) {
            this.$alertwrapper.hide();
            return;
        }
        this.$alertwrapper.fadeOut();
    }
};
/*配置表*/
var config = {
    init: function() {
        var self = this;
        //swiper 速度
        this.swiperspeed = 500;
        //左右箭头
        this.$arrows = $(".cti-config-arrow-wrap a");
        //比对按钮
        this.$comparebtn = $(".cti-config-compare");
        //配置模块容器
        this.$configwrap = $(".cti-config-wrap");
        //下拉选择器
        this.$selector = $(".cti-config-selector");
        //配置列表
        this.$configlist = $(".cti-config-list");
        //对比模块
        this.$configdiff = $(".cti-config-diff");
        //详细链接
        this.$configlink = $(".cti-config-link");
        //iframe
        this.$configiframe = $("#cti_config_diff_iframe");
        //容器
        this.$configctn = $(".cti-config-diff-content");
        //选择器

        if (ietest.islowerversion) {
            this.swiperspeed = 0;
        }
        //配置swiper
        this.swiper = new Swiper("#cti_config_swiper", {
            speed: this.swiperspeed,
            slidesPerView: 3,
            slidesPerGroup: 3,
            offsetSlidesAfter: 1,
            calculateHeight: true,
            onInit: function() {
                setTimeout(function() {
                    //self.$selector.removeClass('d-resize d-show').addClass('d-hide');
                }, 800);
            },
            onSwiperCreated: function() {
                //初始化完毕
                self.$selector.addClass('d-hide');
            }
        });

        $(window).resize(function(event) {
            /* Act on the event */
            //self.$selector.addClass('d-resize');
        });

        //左右切换
        this.$arrows.click(function(event) {
            /* Act on the event */
            var i = $(this).index();
            switch (i) {
                case 0:
                    self.swiper.swipePrev();
                    break;
                case 1:
                    self.swiper.swipeNext();
                    break;
            }
        });

        //对比按钮点击
        this.$comparebtn.click(function(event) {
            /* Act on the event */
            event.stopPropagation(); //  阻止事件冒泡
            self.$selector.removeClass('d-show').addClass('d-hide');
            var select = $(this).parents("dl").find(".cti-config-selector").addClass('d-show');

        });
        //阻止冒泡事件
        $(".cti-config-selector select").click(function(event) {
            /* Act on the event */
            event.stopPropagation(); //  阻止事件冒泡
        });

        this.$configwrap.click(function(event) {
            event.stopPropagation(); //  阻止事件冒泡
            self.$selector.removeClass('d-show').addClass('d-hide');
        });

        //开始对比
        this.$selector.find("a").click(function(event) {
            self.$configlist.hide();
            self.$configdiff.show();
            //设置iframe的src
            var href = self.$configiframe.data("diff") + "#left:" + $(this).data("value") + "|right:" + $(this).siblings('select').eq(0).val();

            self.$configiframe.attr("src", href);

            self.$configctn.css({
                "top": ($(window).height() - self.$configctn.height()) / 2
            });
            //禁止窗体滚动
            ctitools.windownoscroll(true);
        });

        //点击查看详细信息按钮
        this.$configlink.click(function(event) {
            /* Act on the event */
            self.$configlist.hide();
            self.$configdiff.show();
            //设置iframe的src
            self.$configiframe.attr("src", $(this).data("href"));

            self.$configctn.css({
                "top": ($(window).height() - self.$configctn.height()) / 2
            });

            //禁止窗体滚动
            ctitools.windownoscroll(true);
        });

        //点击返回按钮
        $(".cti-config-diff-return").click(function(event) {
            /* Act on the event */
            self.$configlist.show();
            self.$configdiff.hide();
            self.$configiframe.attr("src", "http://www.dongfeng-honda-greiz.com/scripts/loading.html");
            //解除窗体滚动
            ctitools.windownoscroll(false);
        });
    }
};
/*贷款计算器*/
var counter = {
    init: function() {
        this.$outerwrapper = $(".cti-config-counter-outer");
        this.$closeicon = $(".cti-counter-top a");
        this.$starticon = $(".cti-config-counter-btn");
        this.$counterwrap = $(".cti-config-counter-wrap");
        var self = this;

        this.$starticon.click(function(event) {
            /* Act on the event */
            self.showcounter();
        });
        this.$closeicon.click(function(event) {
            /* Act on the event */
            //解除窗口滚动
            ctitools.windownoscroll(false);
            //关闭计算器
            self.$outerwrapper.fadeOut();
            //重置右边导航
            topbar.resetrightNav();
        });
    },
    showcounter: function() {
        this.$outerwrapper.fadeIn();
        var top = ($(window).height() - this.$counterwrap.outerHeight(true)) / 2;
        this.$counterwrap.css({
            "top": top
        });
        //禁止窗口滚动
        ctitools.windownoscroll(true);
        //设置滚动条
        $('.cti-conter-container .nano').nanoScroller();
    }
}

var scrollstage = {
    //初始化
    init: function(obj) {
        var obj = obj;
        if (typeof(obj) == "undefined") {
            obj = {
                scale: 1920 / 950,
                fill: true
            }
        }
        var stage = ".scroll-stage-wrapper"; //舞台
        var wrap = ".scroll-stage-container"; //外层
        var scale; //比例
        obj.scale != undefined ? scale = obj.scale : scale = 1920 / 950;
        var fill;
        obj.fill != undefined ? fill = obj.fill : fill = true; //是否满屏

        function resize() {
            if (fill) {
                $(wrap).css({
                    "width": $(window).width(),
                    "height": $(window).height(),
                    "overflow": "hidden"
                });
            } else {
                $(wrap).css({
                    "width": $($(wrap).parent()).width(),
                    "height": $($(wrap).parent()).height(),
                    "overflow": "hidden"
                });
            }

            var winH = $(wrap).height();
            var winW = $(wrap).width();
            var winScale = winW / winH; //当前窗体比例

            if (winScale < scale) { //当窗体宽度比高度小的时候，比例小的时候
                //console.log("高大");
                $(stage).css({
                    "height": winH,
                    "width": winH * scale,
                    "left": -((winH * scale) - winW) / 2
                });
            } else { //当窗体的宽度比高度大的时候,比例大的时候
                //console.log("宽大");
                $(stage).css({
                    "height": winW / scale,
                    "width": winW,
                    "left": 0,
                    "top": -(winW / scale - winH) / 2
                });
            }
        }
        resize();
        $(window).resize(function() {
            resize();
        });
    }
};

/*小工具*/
var ctitools = {
    init: function() {
        //防止页面左右被拖动
        $("body,html").on("touchstart", function() {
            return;
        });
        //禁止窗体滚动
        this.windownoscroll = function(rs) {
            if (rs) {
                $("body").addClass('cti-body-noscroll');
            } else {
                $("body").removeClass('cti-body-noscroll');
            }
        }
    }
}

/*预约试驾*/
var testdrive = {
    init: function() {
        //预约试驾顶部按钮
        this.$topbtn = $(".cti-top-menu-testdrive");
        //右侧导航btn
        this.$rightbtn = $("#cti-right-nav-testdrive");
        //预约试驾容器
        this.$testdrivewrap = $(".cti-testdrive-wrap");
        //关闭按钮
        this.$closebtn = $(".cti-testdrive-close");

        //提交按钮
        this.btnsubmit = $(".cti-testdrive-submit");
        //
        var self = this;
        this.$topbtn.click(function(event) {
            self.showtestdrive(0);
        });
        this.$rightbtn.click(function(event) {
            self.showtestdrive(0);
        });
        this.$closebtn.click(function(event) {
            self.closetestdrive();
        });

        //级联菜单
        this.$provinces = $("#cti-drive-provinces");
        this.$city = $("#cti-drive-city");
        this.$dealers = $("#cti-drive-dealers");
        //遍历省

        var html = "";
        
		/*
		$.ajax({
                url: 'http://www.wdhac.com.cn/category/siborui.php?a=getarea',
                type: 'GET',
                dataType: 'jsonp',
                data: {
                    pid: 0
                }
            })
            .done(function(data) {
                html = data.info;
                self.$provinces.html(html);
            });

        //省联动
        this.$provinces.change(function() {
            html = "";
            var p = $(this).val();
            $.ajax({
                    url: 'http://www.wdhac.com.cn/category/siborui.php?a=getarea',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        pid: p
                    }
                })
                .done(function(data) {
                    html = data.info;
                    self.$city.html(html);
                });

        });
        //城市联动
        this.$city.change(function() {
            html = "<option value=''>请选择经销商</option>";
            var cname = $(this).find("option:selected").text();
            $.ajax({
                    url: 'http://www.wdhac.com.cn/category/siborui.php?a=getshops',
                    type: 'GET',
                    dataType: 'jsonp',
                    data: {
                        cname: cname
                    }
                })
                .done(function(data) {
                    html = data.info;
                    self.$dealers.html(html);
                });
        });
		*/

        this.btnsubmit.click(function(event) {
            self.submit();
        });
    },
    showtestdrive: function(i) {
        $(".cti-testdrive-form thead h1 span").hide();
        $(".cti-testdrive-form thead h1 span").eq(i).show();
        //如果是ie低版本直接显示
        if (ietest.islowerversion) {
            this.$testdrivewrap.show();
            return;
        }
        this.$testdrivewrap.fadeIn();
    },
    closetestdrive: function() {
        if (ietest.islowerversion) {
            this.$testdrivewrap.hide();
            return;
        }
        this.$testdrivewrap.fadeOut();
        //重置右边导航
        topbar.resetrightNav();
    },
    submit: function() {
        //提交方法
        //检查非空
        var $uname = $("#cti-drive-name");
        var $sex = $("#cti-drive-sex");
        var $phone = $("#cti-drive-phone");

        var arg = {
            username: $uname.val().trim(),
            sex: $sex.val(),
            mobile: $phone.val(),
            provname: this.$provinces.find("option:selected").text(),
            cityname: this.$city.find("option:selected").text(),
            dealername: this.$dealers.find("option:selected").text()
        }
        if (arg.username == "") {
            alert("用户名不能为空");
            return;
        }

        if (arg.mobile == "" || arg.mobile.length != 11) {
            alert("电话号码格式有误");
            return;
        }

        if (arg.provname == "请选择省份" || arg.provname == "") {
            alert("请选择省");
            return;
        }
        if (arg.cityname == "请选择城市" || arg.cityname == "") {
            alert("请选城市");
            return;
        }
        if (arg.dealername == "请选择经销商" || arg.dealername == "") {
            alert("请选经销商");
            return;
        }

        // console.log(arg);

        //提交表单
        try {
            _dcv.push(['_setVar', 'customer', '东风本田']);
            _dcv.push(['_setVar', 'form_name', '']);
            _dcv.push(['_setVar', 'car_type', '哥瑞']);
            _dcv.push(['_setVar', 'name', arg.username]);

            _dcv.push(['_setVar', 'sex', arg.sex]);
            _dcv.push(['_setVar', 'mobile', arg.mobile]);
            _dcv.push(['_setVar', 'dealer_province', arg.provname]);
            _dcv.push(['_setVar', 'dealer_city', arg.cityname]);
            _dcv.push(['_setVar', 'media', '']);
            _dcv.push(['_setVar', 'dealer_name', arg.dealername]);
            _dcv.push(['_setVar', 'way', '试驾']);
            _dcv.push(['_setVar', 'channel', '哥瑞官网']);
            _dcv.push(['_setVar', 'activity', '哥瑞产品站']);
            _dcv.push(['_trackVar']);


			$.ajax({ 
				async:false,
				type:'get',      
				url:'http://www.dongfeng-honda.com/Api/clue_add',  
				data: {"car_mode_id":4,"province_id":$("#cti-drive-provinces").val(),"city_id":$("#cti-drive-city").val(),"dealer_id":$("#cti-drive-dealers").val(),"clue_drive_time":'',"clue_fullname":arg.username,"clue_gender":(arg.sex=="男"?"1":"2"),"clue_tel":arg.mobile,"clue_email":"","source":"哥瑞_PC"},
				dataType:'jsonp',  
				success:function(data){ 
				},
				beforeSend:function(){
					
				},
				complete:function(){
				
				},
				
			 });



            alert("您的信息提交成功！后续会有专员与您联系！");
            //重置表单
            $("#cti_testdrive_forms")[0].reset();
            //关闭窗口
            this.closetestdrive();
            setTimeout(function() {
                var obj = {
                    name: arg.username,
                    sex: arg.sex,
                    phone: arg.mobile,
                    province: arg.provname,
                    city: arg.cityname,
                    dealer: arg.dealername
                }
                doubleclicksubmit("pv", "201510", "2015p004", obj);
                doubleclicksubmit("uv", "201510", "2015p004", obj);
                ga('send', 'pageview', '/VP/pc/testdrivesubmit', {
                    'dimension1': arg.username + '_' + arg.sex + '_' + arg.mobile.substring(5, 11) + '_' + arg.provname + '_' + arg.cityname + '_' + arg.dealername
                });
            }, 1000);
            //检测代码
        } catch (e) {}
    }
};
/*屏幕测试*/
var screentest = {
    init: function() {
        function resize() {
            if ($(window).width() < $(window).height()) {
                $(".cti-hinit-rotation").show();
                setTimeout(function() {
                    $(".cti-hinit-rotation").hide();
                }, 3000);
            } else {
                $(".cti-hinit-rotation").hide();
            }
        }
        resize();
    }
}

/*ie测试*/
var ietest = {
    init: function() {
        this.ieversion = this.getversion(); //当前ie版本
        this.islowerversion = false; //是否为低版本
        if (this.ieversion == "ie8" || this.ieversion == "ie9" || this.ieversion == "ie7" || this.ieversion == "ie6") {
            this.islowerversion = true;
        }
    },
    getversion: function() {
        var ie_v = "";
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/7./i) == "7.") {
            ie_v = "ie7";
        } else
        if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/8./i) == "8.") {
            ie_v = "ie8";
        } else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.match(/9./i) == "9.") {
            ie_v = "ie9";
        } else if (navigator.appName == "Microsoft Internet Explorer") {
            ie_v = "ie6";
        }
        return ie_v;
    }
}
