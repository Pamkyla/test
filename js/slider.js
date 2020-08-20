const defaultSettings = {
    slideWidth: 300,
    slideHeight: '',
    maxSlides: 1,
    navs: true,
    loop: true,
    autoplay: false,
    timeout: 4000,
    dots: false,
}

let moveNum = 0;

let customSlider = document.querySelector('.custom_slider');


customSlider.customSlider = function (sliderSettings = {}) {
    const slidesOffset = sliderSettings.slideWidth || defaultSettings.slideWidth;
    const slideHeight = sliderSettings.slideHeight || defaultSettings.slideHeight;
    const maxSlides = sliderSettings.maxSlides || defaultSettings.maxSlides;
    const navs = sliderSettings.navs || defaultSettings.navs;
    const loop = sliderSettings.loop || defaultSettings.loop;
    const autoplay = sliderSettings.autoplay || defaultSettings.autoplay;
    const timeout = sliderSettings.timeout || defaultSettings.timeout;
    const dots = sliderSettings.dots || defaultSettings.dots;
    const margin = sliderSettings.margin || defaultSettings.margin;
    const onHover = sliderSettings.onHover || defaultSettings.onHover;

    const slides = customSlider.querySelectorAll('img');

    buildSlider(slidesOffset, slideHeight, slides, navs, dots, margin);

    let outerContainer = customSlider.querySelector('.outer_container');
    outerContainer.style.width = `${slidesOffset * maxSlides}px`;

    let nextSlideBtn = document.querySelector('.custom_slider .next_slide');
    let prevSlideBtn = document.querySelector('.custom_slider .prev_slide');

    nextSlideBtn.addEventListener('click', nextSlideClick);
    prevSlideBtn.addEventListener('click', prevSlideClick);

    if (autoplay == true) {
        let autoClick = new Event("click");
        setInterval(() => nextSlideBtn.dispatchEvent(autoClick), timeout);
    }


    function nextSlideClick() {
        let customSlider = this.closest('.custom_slider');
        let innerContainer = customSlider.querySelector('.inner_container');
        moveNum -= slidesOffset;

        if (loop) {

            if (moveNum > -slidesOffset * (slides.length)) {
                innerContainer.style.transform = `translate(${moveNum}px, 0)`;
            } else {
                innerContainer.style.transform = `translate(0px, 0)`;;
                moveNum = 0;
            }
        }

        moveNum = Math.max(moveNum, -slidesOffset * (slides.length - 1));
        innerContainer.style.transform = `translate(${moveNum}px, 0)`;
    }

    function prevSlideClick() {
        let customSlider = this.closest('.custom_slider');
        let innerContainer = customSlider.querySelector('.inner_container');
        moveNum += slidesOffset;

        if (loop) {

            if (moveNum <= 0) {
                innerContainer.style.transform = `translate(${moveNum}px, 0)`;
            } else {
                innerContainer.style.transform = `translate (${-slidesOffset * (slides.length -1)}px, 0)`;
                moveNum = -slidesOffset * (slides.length - 1);
            }
        }

        moveNum = Math.min(moveNum, 0)
        innerContainer.style.transform = `translate(${moveNum}px, 0)`;
    }
}



function buildSlider(slidesOffset, slideHeight, slides, navs, dots, margin) {
    slides.forEach(item => {
        item.classList.add('one_slide');
        item.style.width = `${slidesOffset}px`;
        item.style.height = `${slideHeight}px`;
    });


    customSlider.innerHTML = `        
        <div class="outer_container">
            <div class="inner_container">
                ${customSlider.innerHTML}
            </div>
        </div>
        <div class="navs">
            <a href="#" class="prev_slide">⇦</a>
            <a href="#" class="next_slide">⇨</a>
        </div>`



    if (dots) {
        let dotsMenu = document.createElement('div');
        dotsMenu.classList.add('dots_menu');
        customSlider.append(dotsMenu);

        for (let i = 0; i < slides.length; i++) {
            let score = i;
            let btn = document.createElement('button');
            btn.dataset.score = `${score}`;
            btn.classList.add('dots');
            dotsMenu.append(btn);
        }

        let btn = document.querySelectorAll('.dots');
        for (dot of btn) {
            addEventListener('click', dotsClick);
        }

    }

    function dotsClick(dotsMenu) {
        let tg = dotsMenu.target.dataset.score;
        let innerContainer = customSlider.querySelector('.inner_container');
        let width = slidesOffset;
        innerContainer.style.transform = `translate(${tg * -width}px, 0)`;
    };



    if (navs == false) {
        document.querySelector('.navs').style.visibility = 'hidden';
    }
}