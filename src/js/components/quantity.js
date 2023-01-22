const quantity = (containerEl, maxValue = 10) => {
    const container = document.querySelectorAll(containerEl);
    container.forEach(el => {
        el.addEventListener('click', (e) => {
            const target = e.target;
            if (target.closest('.quantity__button')) {
                let value = parseInt(target.closest('.quantity').querySelector('input').value);
                if (target.classList.contains('quantity__button_plus')) {
                    if (value >= maxValue) {
                        value = maxValue;
                    } else {
                        value++;
                    }
                    if (value < 1 || Number.isNaN(value)) {
                        value = 1;
                    }
                } else {
                    if (value > maxValue) {
                        value = maxValue;
                    } else {
                        --value;
                    }
                    if (value < 1 || Number.isNaN(value)) {
                        value = 1;
                    }
                }
                target.closest('.quantity').querySelector('input').value = value;
            }
        })
        el.addEventListener('keyup', (e) => {
            const target = e.target;
            if (target.closest('.quantity__input')) {
                let value = parseInt(e.target.value);
                if (value > maxValue) {
                    value = maxValue;
                }
                if (value < 1 || Number.isNaN(value)) {
                    value = 1;
                }
                target.value = value;
            }
        })
    });
}

export default quantity;
