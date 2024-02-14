(function ($) {
  'use strict';

// PC/SP判定
// スクロールイベント
// リサイズイベント
// スムーズスクロール

  /* ここから */
  var break_point = 640;//ブレイクポイント
  var mql = window.matchMedia('screen and (max-width: '+break_point+'px)');//、MediaQueryListの生成
  var deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP

// pagetop
  var timer = null;
  // var $pageTop = $('#pagetop');
  // $pageTop.hide();

// スクロールイベント
  $(window).on('scroll touchmove', function () {

    // スクロール中か判定
    if (timer !== false) {
      clearTimeout(timer);
    }

    // 200ms後にフェードイン
    timer = setTimeout(function () {
      if ($(this).scrollTop() > 100) {
        // $('#pagetop').fadeIn('normal');
      } else {
        // $pageTop.fadeOut();
      }
    }, 200);

    var scrollHeight = $(document).height();
    var scrollPosition = $(window).height() + $(window).scrollTop();
    var footHeight = parseInt($('#footer').innerHeight());


    if (deviceFlag == 0) { // → PC
      if (scrollHeight - scrollPosition <= footHeight) {
        // 現在の下から位置が、フッターの高さの位置にはいったら
        // $pageTop.css({
        //   'position': 'absolute',
        //   'bottom': footHeight
        // });
      }
    } else { // → SP
      // $pageTop.css({
      //   'position': 'fixed',
      //   'bottom': '20px'
      // });
    }

  });


// リサイズイベント

  var checkBreakPoint = function (mql) {
    deviceFlag = mql.matches ? 1 : 0;// 0 : PC ,  1 : SP
    // → PC
    if (deviceFlag == 0) {
    } else {
      // →SP
    }
    deviceFlag = mql.matches;
  }

// ブレイクポイントの瞬間に発火
  mql.addListener(checkBreakPoint);//MediaQueryListのchangeイベントに登録

// 初回チェック
  checkBreakPoint(mql);



  var Header = {
    init:function(){
      this.$btn = $('.nav-btn');
      this.$nav = $('.nav-wrap');
      this.event();
    },
    event:function(){
      var _this = this;
      this.$btn.on('click',function(){
        if($(this).hasClass('active')){
          _this.close();
        }else{
          _this.open();
        }
      });
    },
    open:function(){
      this.$btn.addClass('active');
      this.$nav.addClass('active');
    },
    close:function(){
      this.$btn.removeClass('active');
      this.$nav.removeClass('active');
    }
  };
  Header.init();


// スムーズスクロール
// #で始まるアンカーをクリックした場合にスムーススクロール
  $('a[href^="#"]').on('click', function () {
    var speed = 500;
    // アンカーの値取得
    var href = $(this).attr('href');
    // 移動先を取得
    var target = $(href == '#' || href == '' ? 'html' : href);
    // 移動先を数値で取得
    var position = target.offset().top;
    //modal
    if($(this).hasClass('js-modal')){
      return false;
    }

    // スムーススクロール
    $('body,html').animate({
      scrollTop: position
    }, speed, 'swing');
    return false;
  });


  /* animation
  ------------------------------*/

  // scroll effects
  $.fn.acs = function (options) {

    var elements = this;
    var defaults = {
      screenPos: 1.4,
      className: 'is-animated'
    };
    var setting = $.extend(defaults, options);


    $(window).on('load scroll', function () {
      add_class_in_scrolling();
    });

    function add_class_in_scrolling() {
      var winScroll = $(window).scrollTop();
      var winHeight = $(window).height();
      var scrollPos = winScroll + (winHeight * setting.screenPos);

      if (elements.offset().top < scrollPos) {
        elements.addClass(setting.className);
      }
    }
  }

  $('.anm, [class*="anm-"], .anm-list > *').each(function () {
    $(this).acs();
  });

  $('.c-text01-box > *,.c-text02-box > *,.home-tab-map > *').each(function () {
    $(this).acs();
  });



  // list animation delay
  $.fn.anmDelay = function (options) {
    var elements = this;
    var defaults = {
      delay: 0.2,
      property: 'animation-delay'
    };
    var setting = $.extend(defaults, options);

    var index = elements.index();
    var time = index * setting.delay;
    elements.css(setting.property, time + 's');
  }

  $('.anm-list > *').each(function () {
    $(this).anmDelay();
  });


  // var slider01 = $('.l-slider01-block__slider');
  // if(slider01[0]){
  //   slider01.slick({
  //     autoplay:true,
  //     slidesToShow:3,
  //     slidesToScroll:1,
  //     centerMode: true,
  //     speed:2000,
  //     nextArrow:'<button class="slick-next slick-arrow" aria-label="Next" type="button" style=""></button>',
  //     prevArrow:'<button class="slick-prev slick-arrow" aria-label="Prev" type="button" style=""></button>',
  //     responsive: [
  //       {
  //         breakpoint: 641,
  //         settings: {
  //           slidesToShow:1,
  //           speed:800,
  //         }
  //       }
  //     ]
  //   });
  // }

  var $toggle = $('.c-list02__box01');
  if($toggle[0]){
    $toggle.on('click',function(){

      $(this).toggleClass('is-active');
      $(this).find('.c-list02__toggle').toggleClass('is-active');
      if($(this).hasClass('is-active')){
        $(this).next('.c-list02__box02').slideDown();
      }else{
        $(this).next('.c-list02__box02').slideUp();
      }
    });
  }
  var $toggle = $('.c-list02__box01');
  if($toggle[0]){
    $toggle.on('click',function(){

      $(this).toggleClass('is-active');
      $(this).find('.c-list02__toggle').toggleClass('is-active');
      if($(this).hasClass('is-active')){
        $(this).next('.c-list02__box02').slideDown();
      }else{
        $(this).next('.c-list02__box02').slideUp();
      }
    });
  }

  var $modal = $('.js-modal');
  $modal.each(function(){
    var $modalAttr = $(this).attr("href");
    $(this).modaal({
      content_source: $modalAttr,
    });
  });

  //ヘッダーの左右スクロール
  $(window).on("scroll", function(){
    $("header").css("left", -$(window).scrollLeft());
  });

  //クーポンタイマー
  const day = document.getElementById("day");
  const hour = document.getElementById("hour");
  const min = document.getElementById("min");
  const sec = document.getElementById("sec");



  function countdown() {
    const now = new Date(); // 現在時刻を取得
    const endTime = new Date("2024/02/29 23:59:59") // 終了時刻
    const diff = Number(endTime) - Number(now.getTime()); // 時間の差を取得（ミリ秒）


    if(diff< 0){
      let $sale = $("#sale");
      if($sale){
        $sale.remove();
      }
      return;
    }


    // ミリ秒から単位を修正
    const calcDay = Math.floor(diff / 1000 / 60 / 60 / 24);
    const calcHour = Math.floor(diff / 1000 / 60 / 60) % 24;
    const calcMin = Math.floor(diff / 1000 / 60) % 60;
    const calcSec = Math.floor(diff / 1000) % 60;

    // 取得した時間を表示（2桁表示）
    day.innerHTML = calcDay < 10 ? '0' + calcDay : calcDay;
    hour.innerHTML = calcHour < 10 ? '0' + calcHour : calcHour;
    min.innerHTML = calcMin < 10 ? '0' + calcMin : calcMin;
    sec.innerHTML = calcSec < 10 ? '0' + calcSec : calcSec;

  }
  countdown();
  setInterval(countdown,1000);

  // コンプレックス解消
  const day02 = document.getElementById("day02");
  const hour02 = document.getElementById("hour02");
  const min02 = document.getElementById("min02");
  const sec02 = document.getElementById("sec02");
  function countdown02() {
    const now = new Date(); // 現在時刻を取得
    const endTime = new Date("2024/01/31 23:59:59") // 終了時刻
    const diff = Number(endTime) - Number(now.getTime()); // 時間の差を取得（ミリ秒）


    if(diff< 0){
      let $count = $("#count");
      if($count){
        $count.remove();
      }
      return;
    }


    // ミリ秒から単位を修正
    const calcDay = Math.floor(diff / 1000 / 60 / 60 / 24);
    const calcHour = Math.floor(diff / 1000 / 60 / 60) % 24;
    const calcMin = Math.floor(diff / 1000 / 60) % 60;
    const calcSec = Math.floor(diff / 1000) % 60;

    // 取得した時間を表示（2桁表示）
    day02.innerHTML = calcDay < 10 ? '0' + calcDay : calcDay;
    hour02.innerHTML = calcHour < 10 ? '0' + calcHour : calcHour;
    min02.innerHTML = calcMin < 10 ? '0' + calcMin : calcMin;
    sec02.innerHTML = calcSec < 10 ? '0' + calcSec : calcSec;

  }
  countdown02();
  setInterval(countdown02,1000);



  //「こんな美容外科～注意」のトグル
  let $warningCon01 = $(".warning__con01");
  if($warningCon01[0]){
    $warningCon01.on('click',function(){
      $(this).next().slideToggle();
      $(this).find(".toggle-btn").toggleClass("is-active");
    });
  }


})(jQuery);


/* クリックイベント
=========================== */
$(function () {
  $("#js-embedToggle").on("click", function () {
    $("#js-embed").slideToggle(300);
    $("#js-embed").toggleClass("open", 300);
  });
});

$('#js-embedToggle').on('click', function() {
  if(!$(this).hasClass('is-open')) {
    $(this).addClass('is-open');
  } else {
    $(this).removeClass('is-open');
  }
});

$(function () {
  $("#js-embedToggle2").on("click", function () {
    $("#js-embed2").slideToggle(300);
    $("#js-embed2").toggleClass("open", 300);
  });
});

$('#js-embedToggle2').on('click', function() {
  if(!$(this).hasClass('is-open')) {
    $(this).addClass('is-open');
  } else {
    $(this).removeClass('is-open');
  }
});

$(function () {
  $("#js-embedToggle3").on("click", function () {
    $("#js-embed3").slideToggle(300);
    $("#js-embed3").toggleClass("open", 300);
  });
});

$('#js-embedToggle3').on('click', function() {
  if(!$(this).hasClass('is-open')) {
    $(this).addClass('is-open');
  } else {
    $(this).removeClass('is-open');
  }
});

$(function () {
  $("#js-embedToggle4").on("click", function () {
    $("#js-embed4").slideToggle(300);
    $("#js-embed4").toggleClass("open", 300);
  });
});

$('#js-embedToggle4').on('click', function() {
  if(!$(this).hasClass('is-open')) {
    $(this).addClass('is-open');
  } else {
    $(this).removeClass('is-open');
  }
});


$(function () {
  $("#js-introToggle").on("click", function () {
    $("#js-introTxt").slideToggle(300);
    $("#js-introTxt").toggleClass("open", 300);
  });
});

$('#js-introToggle').on('click', function() {
  if(!$(this).hasClass('is-open')) {
    $(this).addClass('is-open');
  } else {
    $(this).removeClass('is-open');
  }
});

$(function () {
  $("#js-introToggle2").on("click", function () {
    $("#js-introTxt2").slideToggle(300);
    $("#js-introTxt2").toggleClass("open", 300);
  });
});

$('#js-introToggle2').on('click', function() {
  if(!$(this).hasClass('is-open')) {
    $(this).addClass('is-open');
  } else {
    $(this).removeClass('is-open');
  }
});
