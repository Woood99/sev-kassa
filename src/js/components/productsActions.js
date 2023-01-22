import quantity from './quantity';
import readCompletely from './readCompletely';
import {
    disableScroll
} from '../functions/disable-scroll';
import {
    enableScroll
} from '../functions/enable-scroll';
import Choices from 'choices.js';
const productsActions = () => {
    const productsContainer = document.querySelector('.popular-products__list');
    getProducts();
    async function getProducts() {
        const response = await fetch('./products.json');
        if (response.ok) {
            const productsArray = await response.json();
            productsGeneration(productsArray);
            quantity('.popular-products__list', 50);
            productsMore();
            productModalCheck(productsArray);
        }
    }

    function deliverySelect(el) {
        const elements = document.querySelectorAll(el);
        elements.forEach(el => {
            const choices = new Choices(el, {
                searchEnabled: false,
                itemSelectText: '',
            })
        });
    }

    function productsGeneration(productsArray) {
        productsArray.forEach(product => {
            const productHTML = `
            <li class="popular-products__item product-card" data-product-id="${product.id}">
                    <img class="product-card__img" src="${product.imgSrc}" alt="${product.title}">
                    <div class="product-card__content">
                        <h3 class="product-card__title">
                            ${product.title}
                        </h3>
                        <span class="product-card__duration">
                            ${product.duration}
                        </span>
                        <div class="product-card__row">
                            <span class="product-card__price">
                                ${product.price}
                            </span>
                            <div class="product-card__quantity quantity quantity--primary">
                                <div class="quantity__button quantity__button_minus"></div>
                                <div class="quantity__input">
                                    <input type="text" value="1">
                                </div>
                                <div class="quantity__button quantity__button_plus"></div>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-reset btn-secondary product-card__btn">Купить</button>
                    </div>
                </li>
            `;
            productsContainer.insertAdjacentHTML('beforeend', productHTML);
        });
    }

    function productsMore() {
        const btnMore = document.querySelector('.popular-products__more');
        const items = document.querySelectorAll('.popular-products__item');
        let counter = 0;
        let increaseNumber = 4;
        items.forEach(item => {
            if (window.getComputedStyle(item).getPropertyValue('display') !== 'none') {
                counter++;
            }
        })
        btnMore.addEventListener('click', () => {
            if (window.innerWidth <= 1024 && window.innerWidth > 576) {
                increaseNumber = 3;
            } else {
                increaseNumber = 4;
            }
            counter += increaseNumber;
            const array = Array.from(document.querySelector('.popular-products__list').children);
            const visItems = array.slice(0, counter);
            visItems.forEach(el => el.classList.add('is-visible'));
            if (visItems.length === items.length) {
                btnMore.classList.add('hide');
            }
        });

    }

    function productModalCheck(productsArray) {
        const productsList = document.querySelector('.popular-products__list');
        productsList.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('product-card__btn')) {
                const productCard = target.closest('.product-card');
                for (let item of productsArray) {
                    if (parseInt(productCard.dataset.productId) === item.id) {
                        productModalGeneration(item, productCard);
                        quantity('.product-modal', 50);
                        readCompletely('.product-settings', '.product-settings__btn', '.product-settings__item', 8);
                        deliverySelect('.product-modal__select');
                        break;
                    }
                }
            }
        });
    }

    function productModalGeneration(itemData, productCard) {
        const productQuantity = productCard.querySelector('.quantity__input input').value;
        let benefitsHTML = '';
        itemData.benefits.forEach(el => {
            if (el.value) {
                benefitsHTML += `
                <div class="product-modal__benefits">
                    <svg>
                        <use xlink:href="img/sprite.svg#${el.icon}"></use>
                    </svg>
                    <span>${el.text}</span>
                </div>
                `;
            }
        });
        let modalHTML;
        if (window.innerWidth > 768) {
            modalHTML = `
            <div class="product-modal">
            <div class="product-modal__container" data-product-modal-pid="${itemData.id}">
                <button class="btn-reset product-modal__close" aria-label="Закрыть модальное окно">
                     <svg>
                         <use xlink:href="img/sprite.svg#close"></use>
                     </svg>
                </button>
                <form class="product-modal__content" action="#">
                    <div class="product-modal__left">
                        <div class="product-modal__img">
                             <img src="${itemData.imgSrc}" alt="${itemData.title}">
                        </div>
                        <div class="product-modal__labels">
                            <input type="text" name="фио" class="input-reset product-modal__input" placeholder="ФИО">
                            <input type="tel" name="Телефон" class="input-reset product-modal__input" placeholder="Телефон">
                            <input type="email" name="E-mail" class="input-reset product-modal__input" placeholder="E-mail">
                            <select class="product-modal__select" name="delivery">
                                <option value="">Выберите способ доставки</option>
                                <option value="email">На электронную почту</option>
                                <option value="whatsapp">На WhatsApp</option>
                            </select>
                            <div class="product-modal__payment">
                                <svg>
                                    <use xlink:href="img/sprite.svg#payment"></use>
                                </svg>
                                <span>Онлайн оплата</span>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-reset btn-primary product-modal__btn">Оформить заказ</button>
                        <p class="product-modal__policy">
                            Нажимая кнопку "Оформить заказ", вы соглашаетесь с политикой обработки персональных данных
                        </p>
                    </div>
                    <div class="product-modal__right">
                        <h2 class="product-modal__title">${itemData.title}</h2>
                        <div class="product-modal__row product-modal__row--one">
                            <span class="product-modal__duration">${itemData.duration}</span>
                            <div class="product-modal__vendor-code">
                                Артикул: <span>${itemData.vendorCode}</span>
                            </div>
                        </div>
                        <div class="product-modal__row product-modal__row--two">
                            <span class="product-modal__price">
                              ${itemData.price}
                            </span>
                            <div class="product-modal__quantity quantity quantity--primary">
                                <div class="quantity__button quantity__button_minus"></div>
                                <div class="quantity__input">
                                    <input type="text" value="${productQuantity}">
                                </div>
                                <div class="quantity__button quantity__button_plus"></div>
                            </div>
                        </div>
                        <div class="product-modal__row product-modal__row--three">
                             ${benefitsHTML}
                        </div>
                        <p class="product-modal__hint">
                            Активация услуг ОФД происходит в личном кабинете на сайте. Подробнее можно ознакомиться <a
                                href="#">здесь</a>
                        </p>
                        <div class="product-modal__settings product-settings">
                            <span class="product-settings__title">Настройки для кассы:</span>
                            <ul class="list-reset product-settings__list">
                                <li class="product-settings__item">
                                    Сервер ОФД — <span>${itemData.ofdServer};</span>
                                </li>
                                <li class="product-settings__item">
                                    DNS — <span>${itemData.dns};</span>
                                </li>
                                <li class="product-settings__item">
                                    Порт — <span>${itemData.port};</span>
                                </li>
                                <li class="product-settings__item">
                                    Таймаут — <span>${itemData.timeOut};</span>
                                </li>
                                <li class="product-settings__item">
                                    Таймер соединения с ОФД — <span>${itemData.connectTimerOfd};</span>
                                </li>
                                <li class="product-settings__item">
                                    Таймер опроса ФН — <span>${itemData.pollingTimerFn};</span>
                                </li>
                                <li class="product-settings__item">
                                    ИНН ОФД — <span>${itemData.tinOfd};</span>
                                </li>
                                <li class="product-settings__item">
                                    Имя ОФД — <span>${itemData.nameOfd};</span>
                                </li>
                                <li class="product-settings__item">
                                    URL ОФД — <span>${itemData.urlOfd};</span>
                                </li>
                                <li class="product-settings__item">
                                    URL налогового органа — <span>${itemData.urlTax};</span>
                                </li>
                            </ul>
                            <button type="submit" class="btn btn-reset product-settings__btn">Читать полностью</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        `;
        } else {
            modalHTML = `
            <div class="product-modal">
            <div class="product-modal__container" data-product-modal-pid="${itemData.id}">
                <button class="btn-reset product-modal__close" aria-label="Закрыть модальное окно">
                     <svg>
                         <use xlink:href="img/sprite.svg#close"></use>
                     </svg>
                </button>
                <form class="product-modal__content" action="#">
                        <div class="product-modal__img">
                             <img src="${itemData.imgSrc}" alt="${itemData.title}">
                        </div>
                        <h2 class="product-modal__title">${itemData.title}</h2>
                        <div class="product-modal__row product-modal__row--one">
                            <span class="product-modal__duration">${itemData.duration}</span>
                            <div class="product-modal__vendor-code">
                                Артикул: <span>${itemData.vendorCode}</span>
                            </div>
                        </div>
                        <div class="product-modal__row product-modal__row--two">
                            <span class="product-modal__price">
                              ${itemData.price}
                            </span>
                            <div class="product-modal__quantity quantity quantity--primary">
                                <div class="quantity__button quantity__button_minus"></div>
                                <div class="quantity__input">
                                    <input type="text" value="${productQuantity}">
                                </div>
                                <div class="quantity__button quantity__button_plus"></div>
                            </div>
                        </div>
                        <div class="product-modal__row product-modal__row--three">
                             ${benefitsHTML}
                        </div>
                        <div class="product-modal__labels">
                            <input type="text" name="фио" class="input-reset product-modal__input" placeholder="ФИО">
                            <input type="tel" name="Телефон" class="input-reset product-modal__input" placeholder="Телефон">
                            <input type="email" name="E-mail" class="input-reset product-modal__input" placeholder="E-mail">
                            <select class="product-modal__select" name="delivery">
                                <option value="">Выберите способ доставки</option>
                                <option value="email">На электронную почту</option>
                                <option value="whatsapp">На WhatsApp</option>
                            </select>
                            <div class="product-modal__payment">
                                <svg>
                                    <use xlink:href="img/sprite.svg#payment"></use>
                                </svg>
                                <span>Онлайн оплата</span>
                            </div>
                        </div>
                        <button type="submit" class="btn btn-reset btn-primary product-modal__btn">Оформить заказ</button>
                        <p class="product-modal__policy">
                            Нажимая кнопку "Оформить заказ", вы соглашаетесь с политикой обработки персональных данных
                        </p>
                        <p class="product-modal__hint">
                            Активация услуг ОФД происходит в личном кабинете на сайте. Подробнее можно ознакомиться <a
                                href="#">здесь</a>
                        </p>
                        <div class="product-modal__settings product-settings">
                        <span class="product-settings__title">Настройки для кассы:</span>
                        <ul class="list-reset product-settings__list">
                            <li class="product-settings__item">
                                Сервер ОФД — <span>${itemData.ofdServer};</span>
                            </li>
                            <li class="product-settings__item">
                                DNS — <span>${itemData.dns};</span>
                            </li>
                            <li class="product-settings__item">
                                Порт — <span>${itemData.port};</span>
                            </li>
                            <li class="product-settings__item">
                                Таймаут — <span>${itemData.timeOut};</span>
                            </li>
                            <li class="product-settings__item">
                                Таймер соединения с ОФД — <span>${itemData.connectTimerOfd};</span>
                            </li>
                            <li class="product-settings__item">
                                Таймер опроса ФН — <span>${itemData.pollingTimerFn};</span>
                            </li>
                            <li class="product-settings__item">
                                ИНН ОФД — <span>${itemData.tinOfd};</span>
                            </li>
                            <li class="product-settings__item">
                                Имя ОФД — <span>${itemData.nameOfd};</span>
                            </li>
                            <li class="product-settings__item">
                                URL ОФД — <span>${itemData.urlOfd};</span>
                            </li>
                            <li class="product-settings__item">
                                URL налогового органа — <span>${itemData.urlTax};</span>
                            </li>
                        </ul>
                        <button type="submit" class="btn btn-reset product-settings__btn">Читать полностью</button>
                    </div>
                </form>
            </div>
         </div>
        `;
        }
        if (document.querySelectorAll('.product-modal').length <= 0 && modalHTML) {
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            const productModal = document.querySelector('.product-modal');
            const productModalContainer = productModal.querySelector('.product-modal__container');
            const productModalCloseEl = productModal.querySelector('.product-modal__close');
            const settingsModal = {
                isOpen: false,
                speed: 300,
                animation: 'fade'
            };
            setTimeout(() => {
                productModalOpen();
            }, 1);
            productModalCloseEl.addEventListener('click', () => {
                productModalClose();
            });
            productModal.addEventListener('click', (e) => {
                if (e.target.classList.contains('product-modal')) {
                    productModalClose();
                }
            })
            window.addEventListener('keydown', (e) => {
                if (e.keyCode == 27) {
                    productModalClose();
                }
            })

            function productModalClose() {
                if (settingsModal.isOpen) {
                    productModalContainer.classList.remove('animate-open');
                    productModalContainer.classList.remove(settingsModal.animation);
                    productModal.classList.remove('is-open');
                    productModalContainer.classList.remove('open');
                    enableScroll();
                    document.body.style.scrollBehavior = 'auto';
                    document.documentElement.style.scrollBehavior = 'auto';
                    setTimeout(() => {
                        productModal.remove();
                    }, settingsModal.speed);
                    settingsModal.isOpen = false;
                }
            }

            function productModalOpen() {
                if (!settingsModal.isOpen) {
                    productModalContainer.scrollTo(0, 0);
                    productModal.style.setProperty('--transition-time', `${settingsModal.speed / 1000}s`);
                    productModal.classList.add('is-open');
                    document.body.style.scrollBehavior = 'auto';
                    document.documentElement.style.scrollBehavior = 'auto';
                    disableScroll();
                    productModalContainer.classList.add('open');
                    productModalContainer.classList.add(settingsModal.animation);
                    setTimeout(() => {
                        productModalContainer.classList.add('animate-open');
                    }, settingsModal.speed);
                    settingsModal.isOpen = true;
                }
            }
        }
    }
}

export default productsActions;
