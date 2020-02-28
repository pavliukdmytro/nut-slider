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
    }
    
    touchHandler() {
        this.container.on('touchstart', (e) => {
            const start = Math.floor(e.touches[0].screenY);
            let move;
            
            const touchMove = (e) => {
                move = Math.floor(e.touches[0].screenY);
            };
    
            $(window).on('touchmove', touchMove);
            $(window).one('touchend', (e) => {
                if(move) e.preventDefault();
                //this.scrollBottom();
                this.scrollTop();
                $(window).off('touchmove', touchMove)
            });
        });
    }
    
    start() {
        this.touchHandler();
    }
}

const slider = new NutSlider('.nut-slider');
slider.start();