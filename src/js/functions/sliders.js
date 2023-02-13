// =========================================================================================



import Swiper, {
    Navigation,
    Pagination
} from 'swiper';
Swiper.use([Navigation, Pagination]);



// =========================================================================================




function initSliders() {




    if (document.querySelector('.reviews__list')) {
        new Swiper('.reviews__list', {

            // effect: 'fade',
            // autoplay: {
            // 	delay: 3000,
            // 	disableOnInteraction: false,
            // },

            observer: true,
            observeParents: true,
            slidesPerView: 1.1,
            spaceBetween: 10,
            speed: 800,
            // touchRatio: 0,
            // simulateTouch: false,
            // loop: true,
            // preloadImages: false,
            // lazy: true,


            // pagination: {
            // 	el: '.slider-quality__pagging',
            // 	clickable: true,
            // },

            navigation: {
                prevEl: '.reviews__arrow--prev',
                nextEl: '.reviews__arrow--next',
            },


            breakpoints: {
                768: {
                    slidesPerView: 1.4,
                    spaceBetween: 20,
                },
                1150: {
                    slidesPerView: 2.5,
                    spaceBetween: 30,
                },
            },


            on: {

            }
        });
    }




}






// =========================================================================================





window.addEventListener("load", function (e) {
    initSliders();
});





// =========================================================================================
