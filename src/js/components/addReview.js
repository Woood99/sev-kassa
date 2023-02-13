import modal from './modal';
import * as ratingFunc from "../functions/rating";
import gettingDate from './gettingDate';
import {
    validateForms
} from '../functions/validate-forms';
import {
    enableScroll
} from '../functions/enable-scroll';

function addReview() {
    const addReviewValidateRules = [{
            ruleSelector: '.add-review__input--name',
            rules: [{
                    rule: 'minLength',
                    value: 3,
                    errorMessage: 'Имя должно состоять как минимум из :value символов',
                },
                {
                    rule: 'required',
                    value: true,
                    errorMessage: 'Заполните имя!'
                }
            ]
        },
        {
            ruleSelector: '.add-review__input--textarea',
            rules: [{
                    rule: 'minLength',
                    value: 20,
                    errorMessage: 'Текст должен содержать не менее :value символов'
                },
                {
                    rule: 'required',
                    value: true,
                    errorMessage: 'Введите текст!'
                }
            ]
        },
        {
            ruleSelector: '.add-review__input--email',
            rules: [{
                    rule: 'required',
                    errorMessage: 'Введите свой email',
                },
                {
                    rule: 'email',
                    errorMessage: 'Email указан некорректно!',
                }
            ]
        },
    ];
    const btn = document.querySelector('.reviews__btn');
    btn.addEventListener('click', () => {
        const modalHTML = `
        <div class="add-review modal-primary">
        <div class="add-review__container modal-primary__container">
            <button class="btn-reset modal-primary__close add-review__close" aria-label="Закрыть модальное окно">
                <svg>
                    <use xlink:href="img/sprite.svg#close"></use>
                </svg>
            </button>
            <form class="add-review__content modal-primary__content" action="#">
                <h2 class="add-review__title">Добавить отзыв</h2>
                <div class="add-review__row">
                    <span>Ваша оценка</span>
                    <div class="add-review__rating rating rating_set">
                        <div class="rating__body">
                            <div class="rating__active"></div>
                            <div class="rating__items">
                                <input type="radio" class="rating__item" value="1" name="rating">
                                <input type="radio" class="rating__item" value="2" name="rating">
                                <input type="radio" class="rating__item" value="3" name="rating">
                                <input type="radio" class="rating__item" value="4" name="rating">
                                <input type="radio" class="rating__item" value="5" name="rating">
                            </div>
                        </div>
                        <div class="rating__value">0</div>
                    </div>
                </div>
                <div class="add-review__labels">
                    <label class="add-review__label label-validate label-validate--aqua">
                        <input type="text" name="Имя" class="input-reset input-primary input-primary--border add-review__input add-review__input--name" placeholder="Имя">
                    </label>
                    <label class="add-review__label label-validate label-validate--aqua">
                        <input type="email" name="E-mail" class="input-reset input-primary input-primary--border add-review__input add-review__input--email" placeholder="E-mail">
                    </label>
                    <label class="add-review__label label-validate label-validate--aqua">
                        <textarea class="input-reset input-primary input-primary--border add-review__input add-review__input--textarea" placeholder="Текст отзыва"></textarea>
                    </label>
                </div>
                <button type="submit" class="btn btn-reset btn-primary add-review__btn">Добавить отзыв</button>
            </form>
        </div>
    </div>
        `;
        modal(modalHTML, '.add-review', '.modal-primary', 300);
        const addReviewModal = document.querySelector('.add-review');
        if (addReviewModal) {
            validateForms(`.add-review__content`, addReviewValidateRules, false, sendEmail);
            ratingFunc.formRating();
        }

        function sendEmail() {
            const form = document.querySelector('.add-review__content');
            const formData = {
                rating: form.querySelector('.rating__value').textContent == 0 ? 1 : form.querySelector('.rating__value').textContent,
                name: form.querySelector('.add-review__input--name').value,
                email: form.querySelector('.add-review__input--email').value,
                text: form.querySelector('.add-review__input--textarea').value,
                day: gettingDate().day,
                month: gettingDate().month,
                year: gettingDate().year,
                date: gettingDate().currentDate,
            };
            const reviewsWrapper = document.querySelector('.reviews__list');
            const reviewHTML = `
            <div class="swiper-slide reviews__item review-item">
                <div class="review-item__img">
                    <img src="./img/review-1.jpg" alt="${formData.name}">
                </div>
                <p class="review-item__text">
                    ${formData.text}
                </p>
                <div class="review-item__info">
                    <span class="review-item__name">
                    ${formData.name}
                    </span>
                    <div class="review-item__rating rating">
                      <div class="rating__body">
                          <div class="rating__active" style="width: 84%;"></div>
                          <div class="rating__items">
                              <input type="radio" class="rating__item" value="1" name="rating">
                              <input type="radio" class="rating__item" value="2" name="rating">
                              <input type="radio" class="rating__item" value="3" name="rating">
                              <input type="radio" class="rating__item" value="4" name="rating">
                              <input type="radio" class="rating__item" value="5" name="rating">
                          </div>
                      </div>
                      <div class="rating__value">${formData.rating}</div>
                    </div>
                    <time class="review-item__time" datetime="${formData.year}-${formData.month}-${formData.day}">${formData.date}</time>
                </div>
            </div>
            `;
            reviewsWrapper.querySelector('.swiper-wrapper').insertAdjacentHTML('afterbegin', reviewHTML);
            ratingFunc.formRating();

            if (addReviewModal) {
                addReviewModal.querySelector('.add-review__container').classList.remove('animate-open');
                addReviewModal.querySelector('.add-review__container').classList.remove('fade');
                addReviewModal.classList.remove('is-open');
                addReviewModal.querySelector('.add-review__container').classList.remove('open');
                enableScroll();
                document.body.style.scrollBehavior = 'auto';
                document.documentElement.style.scrollBehavior = 'auto';
                setTimeout(() => {
                    addReviewModal.remove();
                }, 300);
            }
        }
    });
}

export default addReview;
