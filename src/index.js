import './styles/styles.scss';

window.$ = window.jQuery = require('jquery');

let params = ['nut-slider__item_left', 'nut-slider__item_center', 'nut-slider__item_right'];

//$('.nut-slider .nut-slider__item').each((i, el) => {
//    if(i === 3) return;
//    $(el).addClass( params[i]);
//});


class NutSlider {
    constructor(container) {
        this.container = $(container);
        this.scrollController = '';
        this.scrollTop = this.scrollTop.bind(this);
        this.scrollBottom = this.scrollBottom.bind(this);
        this.vInterval = undefined;
    }

    scrollBottom() {
        const itemLeft = this.container.find('.nut-slider__item_left');
        const itemCenter = this.container.find('.nut-slider__item_center');
        const itemRight = this.container.find('.nut-slider__item_right');

        if(!itemLeft.next().next().next().length) return;

        itemLeft.removeClass('nut-slider__item_left');
        itemCenter.addClass('nut-slider__item_left');
        itemCenter.removeClass('nut-slider__item_center');
        itemRight.addClass('nut-slider__item_center');
        itemRight.removeClass('nut-slider__item_right');
        itemRight.next().addClass('nut-slider__item_right');
        this.vibrate(200);
    }

    scrollTop() {
        const itemLeft = this.container.find('.nut-slider__item_left');
        const itemCenter = this.container.find('.nut-slider__item_center');
        const itemRight = this.container.find('.nut-slider__item_right');

        if(!itemRight.prev().prev().prev().length) return;

        itemLeft.prev().addClass('nut-slider__item_left');
        itemLeft.removeClass('nut-slider__item_left');
        itemLeft.addClass('nut-slider__item_center');
        itemCenter.addClass('nut-slider__item_right');
        itemCenter.removeClass('nut-slider__item_center');
        itemRight.removeClass('nut-slider__item_right');
        this.vibrate(200);
    }

    touchHandler() {
        this.container.on('touchstart', (e) => {
            const start = Math.floor(e.touches[0].screenY);
            let move;

            const touchMove = (e) => {
                move = Math.floor(e.touches[0].screenY);
                // console.log( start,  move);
                clearTimeout(this.scrollController);
                if(start > move) {
                    // console.log('bottom');
                    if(start - move > 20) {
                        this.scrollController = setTimeout( this.scrollTop,100);
                    }

                } else {
                    // console.log('top');
                    if(move - start > 20) {
                        this.scrollController = setTimeout( this.scrollBottom,100);
                    }
                }
            };


            $(window).on('touchmove', touchMove);
            $(window).one('touchend', (e) => {
                if(move) e.preventDefault();
                //this.scrollBottom();

                $(window).off('touchmove', touchMove)
            });
        });
    }
    //вибрация
    vibrate(val){
        if("vibrate" in navigator)  return navigator.vibrate(val);
        if("oVibrate" in navigator)  return navigator.oVibrate(val);
        if("mozVibrate" in navigator)  return navigator.mozVibrate(val);
        if("webkitVibrate" in navigator)  return navigator.webkitVibrate(val);
        console.warn('Ваш браузер не поддерживает vibration Api');
    }

    init() {
        const itemLeft = parseInt(getComputedStyle(this.container.find('.nut-slider__item_left')[0]).height);
        const itemCenter =  parseInt(getComputedStyle(this.container.find('.nut-slider__item_center')[0]).height);
        const itemRight = parseInt(getComputedStyle(this.container.find('.nut-slider__item_right')[0]).height);
        // console.log(itemLeft, itemCenter, itemRight);
        this.container.css({'height': itemLeft + itemCenter + itemRight + 'px'})
    }


    start() {
        this.touchHandler();
        this.init();
    }
}

const slider = new NutSlider('.nut-slider');
slider.start();
