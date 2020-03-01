import './styles/styles.scss';

class NutSlider {
    constructor(slider, clearMargin) {
        this.slider = slider;
        this.slides = slider.children;
        this.scrollController = 0;
        this.sliderRotateCounter = 0;
        this.clearMargin = clearMargin;
        this.scrollBottom = this.scrollBottom.bind(this);
        this.scrollTop = this.scrollTop.bind(this);
        this.rotateXSlider = this.rotateXSlider.bind(this);
    }
    
    createCircle() {
        let circleLength = 0;
        let rotate = 0;
        //count all slides height
        for(let i = 0; i < this.slides.length; i++) {
            if(i > 5) continue;
            circleLength += parseInt(getComputedStyle(this.slides[i]).height);
        }
        //create circle
        for(let i = 0; i < this.slides.length; i++) {
            this.slides[i].style.cssText = `transform: rotateX(-${rotate}deg)
                                            translateZ(${circleLength / (Math.PI * 2) - this.clearMargin}px);
                                            top: calc(50% - ${circleLength / 6 / 2}px);
                                            left: calc(50% - ${parseInt(getComputedStyle(this.slides[0]).width) / 2}px);
                                            `;
            rotate += 360 / 6;
        }
        this.slider.style.height = (circleLength / (Math.PI  * 2)) * 2 + 100 + 'px';
    }
    
    initShowSlide() {
        this.slides[this.slides.length - 1].classList.add('nut-slider__top');
        this.slides[0].classList.add('nut-slider__center');
        this.slides[1].classList.add('nut-slider__bottom');
    }
    
    touchHandler() {
        let mobileDevice = false;
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            mobileDevice = true;
        }
        this.slider.addEventListener(!mobileDevice ? 'mousedown' : 'touchstart', (e) => {
            const start = !mobileDevice ? e.pageY : Math.floor(e.touches[0].screenY);
            let move;
    
            const touchMove = (e) => {
                move = !mobileDevice ? e.pageY : Math.floor(e.touches[0].screenY);
                clearTimeout(this.scrollController);
                if(start > move) {
                    if(start - move > 20) {
                        this.scrollController = setTimeout( this.scrollTop,100);
                    }
                } else {
                    if(move - start > 20) {
                        this.scrollController = setTimeout( this.scrollBottom,100);
                    }
                }
            };
            
            window.addEventListener(!mobileDevice ? 'mousemove' :'touchmove', touchMove);
            window.addEventListener(!mobileDevice ? 'mouseup' :'touchend', (e) => {
                if(move) e.preventDefault();
                window.removeEventListener(!mobileDevice ? 'mousemove' :'touchmove', touchMove);
            }, {once: true});
        });
    }
    
    vibrate(val){
        if("vibrate" in navigator)  return navigator.vibrate(val);
        if("oVibrate" in navigator)  return navigator.oVibrate(val);
        if("mozVibrate" in navigator)  return navigator.mozVibrate(val);
        if("webkitVibrate" in navigator)  return navigator.webkitVibrate(val);
    }
    
    scrollBottom() {
        const slideTop = this.slider.querySelector('.nut-slider__top');
        const slideCenter = this.slider.querySelector('.nut-slider__center');
        const slideBottom = this.slider.querySelector('.nut-slider__bottom');
        
        const moveSlide = (slide, slideClass) => {
            if(slide.nextElementSibling === null) {
                this.slides[0].classList.add(slideClass);
            } else {
                slide.nextElementSibling.classList.add(slideClass);
            }
            slide.classList.remove(slideClass);
        };
        
        moveSlide(slideTop, 'nut-slider__top');
        moveSlide(slideCenter, 'nut-slider__center');
        moveSlide(slideBottom, 'nut-slider__bottom');
    
        this.rotateXSlider(this.sliderRotateCounter += 60);
        this.vibrate(200);
    }
    
    scrollTop() {
        const slideTop = this.slider.querySelector('.nut-slider__top');
        const slideCenter = this.slider.querySelector('.nut-slider__center');
        const slideBottom = this.slider.querySelector('.nut-slider__bottom');
    
        const moveSlide = (slide, slideClass) => {
            if(slide.previousElementSibling === null) {
                this.slides[this.slides.length - 1].classList.add(slideClass);
            } else {
                slide.previousElementSibling.classList.add(slideClass);
            }
            slide.classList.remove(slideClass);
        }
    
        moveSlide(slideTop, 'nut-slider__top');
        moveSlide(slideCenter, 'nut-slider__center');
        moveSlide(slideBottom, 'nut-slider__bottom');
    
        this.rotateXSlider(this.sliderRotateCounter -= 60);
        this.vibrate(200);
    }
    
    rotateXSlider(rotate) {
        this.slider.style.transform = `rotateX(${rotate}deg)`;
    }
    
    init() {
        this.createCircle();
        this.initShowSlide();
        this.touchHandler();
        this.slider.classList.add('nut-slider__init');
    }
}

const slider = new NutSlider(document.querySelector('.nut-slider'), 7);
slider.init();
