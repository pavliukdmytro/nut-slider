require('./style.scss');

window.$ = require('jquery');

require('slick-carousel');
require('slick-carousel/slick/slick.scss');


$('.nut-slider').slick({
    vertical: true,
    slidesToShow: 1,
    centerMode: true,
    arrows: false,
    verticalSwiping: true,
    speed: 300
});








