require('./style.scss');

window.$ = require('jquery');

require('slick-carousel');
require('slick-carousel/slick/slick.scss');

$('.nut-slider').on('init', function(event, slick){

    let callback = function(entries, observer) {
        $(entries).each((i, entry) => {
            // console.log(entry.intersectionRatio);
            if(entry.intersectionRatio > 0) {
                $(entry.target).addClass('nut-slider__show');
            } else {
                $(entry.target).removeClass('nut-slider__show')
                    .removeClass('nut-slider__first')
                    .removeClass('nut-slider__second')
                    .removeClass('nut-slider__third')
            }
        })
        $('.nut-slider__show').removeClass('nut-slider__first')
            .removeClass('nut-slider__second')
            .removeClass('nut-slider__third');

        if($('.nut-slider__show').eq(0).length) {
            $('.nut-slider__show').eq(0).addClass('nut-slider__first');
        }
        if($('.nut-slider__show').eq(1).length) {
            $('.nut-slider__show').eq(1).addClass('nut-slider__second');
        }
        if($('.nut-slider__show').eq(2).length) {
            $('.nut-slider__show').eq(2).addClass('nut-slider__third');
        }
    };
    let observer = new IntersectionObserver(callback);

    $('.slick-slide').each((i, target) => {
        var options = {
            // root: document.querySelector('#scrollArea'),
            rootMargin: '-20px',
            threshold: 1
        };
        observer.observe(target, options);
    })
});
$('.nut-slider').slick({
    vertical: true,
    slidesToShow: 1,
    centerMode: true,
    arrows: false,
    verticalSwiping: true,
    speed: 300,
    infinite: false,
    initialSlide: 2
});







