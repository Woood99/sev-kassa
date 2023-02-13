import {
    validateForms
} from '../functions/validate-forms';
const askQuestionValidateRules1 = [{
        ruleSelector: '.ask-question__input--name',
        rules: [{
                rule: 'minLength',
                value: 3,
                errorMessage: 'Имя должно состоять как минимум из :value символов'
            },
            {
                rule: 'required',
                value: true,
                errorMessage: 'Заполните имя!'
            }
        ]
    },
    {
        ruleSelector: '.ask-question__input--phone',
        tel: true,
        telError: 'Введите корректный телефон',
        rules: [{
            rule: 'required',
            value: true,
            errorMessage: 'Заполните телефон!'
        }]
    },
];
const askQuestionValidateRules2 = [{
        ruleSelector: '.ask-question__input--name',
        rules: [{
                rule: 'minLength',
                value: 3,
                errorMessage: 'Имя должно состоять как минимум из :value символов'
            },
            {
                rule: 'required',
                value: true,
                errorMessage: 'Заполните имя!'
            }
        ]
    },
    {
        ruleSelector: '.ask-question__input--phone',
        tel: true,
        telError: 'Введите корректный телефон',
        rules: [{
            rule: 'required',
            value: true,
            errorMessage: 'Заполните телефон!'
        }]
    },
];

function askQuestion() {
    if (document.querySelector('.ask-question__form')) {
        validateForms(`.ask-question--one .ask-question__form`, askQuestionValidateRules1);
        validateForms(`.ask-question--two .ask-question__form`, askQuestionValidateRules2);
    }
}

export default askQuestion;
