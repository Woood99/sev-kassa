// ========================================================================================


// Определение операционной системы на мобильных
// import { mobileCheck } from "./functions/mobile-check";
// console.log(mobileCheck())


// ========================================================================================


// Определение ширины экрана

import {
    isMobile,
    isTablet,
    isDesktop
} from './functions/check-viewport';
// if (isDesktop()) {
//   console.log('desktop')
// } else if (isTablet()) {
//     console.log('tablet')
// } else if (isMobile()) {
//     console.log('isMobile')
// }


// ========================================================================================


// Реализация бургер-меню
import {
    burger
} from './functions/burger';


// ========================================================================================


// Реализация остановки скролла (не забудьте вызвать функцию)
// import { disableScroll } from './functions/disable-scroll';

// Реализация включения скролла (не забудьте вызвать функцию)
// import { enableScroll } from './functions/enable-scroll';


// ========================================================================================


// Реализация модального окна
// import GraphModal from 'graph-modal';
// const modal = new GraphModal();


// ========================================================================================


// Подключение табов
// import { myTabs } from './functions/tabs'
// myTabs();


// ========================================================================================


// Получение высоты шапки сайта (не забудьте вызвать функцию)
import {
    getHeaderHeight,
    getTopInfoHeight
} from './functions/get-block-height';
getHeaderHeight();
getTopInfoHeight();
window.addEventListener('resize', () => {
    getHeaderHeight();
    getTopInfoHeight();
});

// ========================================================================================


// Подключение плагина кастом-скролла
// import 'simplebar';


// ========================================================================================


// Подключение файла со слайдерами
import "./functions/sliders";


// ========================================================================================



// Подключение анимаций по скроллу
// import AOS from 'aos';
// AOS.init();


// ========================================================================================



// Подключение параллакса блоков при скролле
// import Rellax from 'rellax';
// const rellax = new Rellax('.rellax');


// ========================================================================================


// Подключение плавной прокрутки к якорям
// import SmoothScroll from 'smooth-scroll';
// const scroll = new SmoothScroll('a[href*="#"]');


// ========================================================================================


// Подключение событий свайпа на мобильных
// import 'swiped-events';
// document.addEventListener('swiped', function(e) {
//     console.log(e.target);
//     console.log(e.detail);
//     console.log(e.detail.dir);
// });


// ========================================================================================



// Подключение spollers
// import * as spollersFunc from "./functions/spollers";
// spollersFunc.spollers();


// ========================================================================================


// Подключение галереи

// Документация: https://www.lightgalleryjs.com/docs/
// Сниппет(HTML): gallery

// Подключение базового набора функционала
// import lightGallery from 'lightgallery';

// Плагины
// lgZoom, lgAutoplay, lgComment, lgFullscreen, lgHash, lgPager, lgRotate, 
// lgShare, lgThumbnail, lgVideo, lgMediumZoom
// import lgFullscreen from 'lightgallery/plugins/fullscreen/lg-fullscreen.min.js';

// Запуск
// const galleries = document.querySelectorAll('#galleryID');
// galleries.forEach(gallery => {
//     lightGallery(gallery, {
//         // plugins: [lgFullscreen],
//         licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
//         speed: 500,
//     });
// });



// ========================================================================================



// Модуль звездного рейтинга 
import * as ratingFunc from "./functions/rating";
ratingFunc.formRating();


// ========================================================================================


/* Динамический адаптив */
import "./functions/dynamic-adapt";


// ========================================================================================


// Фикс фулскрин-блоков
import './functions/fix-fullheight';


// ========================================================================================