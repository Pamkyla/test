let Sliders = document.querySelectorAll('.custom_slider');
for (mySlider of Sliders) {
    mySlider.customSlider()
}

let popup = document.querySelector('.popup');

function thanks() {
    popup.style.display = 'block';
    return false;
}

function Close() {
    popup.style.display = 'none';
}
document.addEventListener('wheel', scroll);

Num = 0;

let carousel = document.querySelector('.carousel');
let swamp = document.querySelector('.swamp');
let form = document.querySelector('.form');

function scroll(event) {
    Num = Num + event.deltaY;
    switch (Num) {
        case 0:
            carousel.style.zIndex = 5;
            swamp.style.zIndex = 0;
            form.style.zIndex = 0;
            break;
        case 125:
            carousel.style.zIndex = 0;
            swamp.style.zIndex = 5;
            form.style.zIndex = 0;
            break;
        case 250:
            carousel.style.zIndex = 0;
            swamp.style.zIndex = 0;
            form.style.zIndex = 5;
            break;
        case 375:
            Num = 0;
            carousel.style.zIndex = 5;
            swamp.style.zIndex = 0;
            form.style.zIndex = 0;
            break;
        case -125:
            Num = 250;
            carousel.style.zIndex = 0;
            swamp.style.zIndex = 0;
            form.style.zIndex = 5;
            break;


        default:
            console.log('error');
            break;
    }
}

function parallax(event) {
    let stikyForm = document.querySelector('form');
    stikyForm.style.transform = `translateY(${event.clientY*50/1000}px)`;
    form.style.transform = `translateY(${event.clientY*15/1000}px)`;
}

form.addEventListener('mousemove', parallax);

function createFrog(event) {

    let frog = document.createElement('div');
    frog.classList.add('frog');
    console.log(event.offsetX);
    console.log(event.clientX);
    frog.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    swamp.append(frog);

}

function hunt(event) {
    let frogs = document.querySelectorAll('.frog');
    for (const frog of frogs) {
        frog.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
    }
}

swamp.addEventListener('click', createFrog);
swamp.addEventListener('mousemove', hunt);