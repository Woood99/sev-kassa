import {
    disableScroll
} from '../functions/disable-scroll';
import {
    enableScroll
} from '../functions/enable-scroll';


const modal = (modalHTML, container, unifyingClass, speed = 300) => {
    if (document.querySelectorAll(container).length <= 0 && modalHTML) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        const modalEl = document.querySelector(container);
        const modalContainerEl = modalEl.querySelector(`${unifyingClass}__container`);
        const modalCloseEl = modalEl.querySelector(`${unifyingClass}__close`);
        const settingsModal = {
            modal: modalEl,
            container: modalContainerEl,
            isOpen: false,
            speed: speed,
            animation: 'fade'
        };
        setTimeout(() => {
            modalOpen(settingsModal);
        }, 1);
        modalCloseEl.addEventListener('click', () => {
            modalClose(settingsModal);
        });
        modalEl.addEventListener('click', (e) => {
            if (e.target.classList.contains(container.replace(/^\./, ""))) {
                modalClose(settingsModal);
            }
        })
        window.addEventListener('keydown', (e) => {
            if (e.keyCode == 27) {
                modalClose(settingsModal);
            }
        })
    }

    function modalClose(settingsModal) {
        if (settingsModal.isOpen) {
            settingsModal.container.classList.remove('animate-open');
            settingsModal.container.classList.remove(settingsModal.animation);
            settingsModal.modal.classList.remove('is-open');
            settingsModal.container.classList.remove('open');
            enableScroll();
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            setTimeout(() => {
                settingsModal.modal.remove();
            }, settingsModal.speed);
            settingsModal.isOpen = false;
        }
    }

    function modalOpen(settingsModal) {
        if (!settingsModal.isOpen) {
            settingsModal.container.scrollTo(0, 0);
            settingsModal.modal.style.setProperty('--transition-time', `${settingsModal.speed / 1000}s`);
            settingsModal.modal.classList.add('is-open');
            document.body.style.scrollBehavior = 'auto';
            document.documentElement.style.scrollBehavior = 'auto';
            disableScroll();
            settingsModal.container.classList.add('open');
            settingsModal.container.classList.add(settingsModal.animation);
            setTimeout(() => {
                settingsModal.container.classList.add('animate-open');
            }, settingsModal.speed);
            settingsModal.isOpen = true;
        }
    }
}
export default modal;
