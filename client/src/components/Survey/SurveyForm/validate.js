const validate = values => {
    const errors = {}
    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.limit && !values.specifyRecipients) {
        errors.limit = 'This is a required field'
    }
    if (values.limit <= 0 || values.limit > 9999) {
        errors.limit = 'Select number between 1 and 9999'
    }
    if (!values.title) {
        errors.title = 'Title is required'
    }
    if (!values.body) {
        errors.body = 'Email body is required'
    }
    if (!values.subject) {
        errors.subject = 'Email subject is required'
    }

    if (!values.questions || !values.questions.length) {
        errors.questions = { _error: 'At least one member must be entered' }
    } else {
        const questionsArrayErrors = [];
        values.questions.forEach((question, index) => {
            const questionErrors = {};
            if (!question.question || !question.question.length) {
                questionErrors.question = 'Required';
                questionsArrayErrors[index] = questionErrors
            }

            if (question && question.answers && question.answers.length) {
                const answerArrayErrors = [];
                question.answers.forEach((answer, answerIndex) => {
                    if (!answer || !answer.length) {
                        answerArrayErrors[answerIndex] = 'Required'
                    }
                });
                if (answerArrayErrors.length) {
                    questionErrors.answers = answerArrayErrors;
                    questionsArrayErrors[index] = questionErrors
                }
            }
        });
        if (questionsArrayErrors.length) {
            errors.questions = questionsArrayErrors
        }
    }

    return errors
};

export default validate
