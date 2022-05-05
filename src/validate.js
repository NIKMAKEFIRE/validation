export const validatePassword = (values) => {
    const errors = {};
    const regex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{1,}$/
    if (!values.oldPassword) {
        errors.oldPassword = "Обязательное поле!";
    } else if (!regex.test(values.oldPassword)) {
        errors.oldPassword = "Пароль должен иметь одну заглавную букву!";
    } else if (values.oldPassword.length < 4 || values.oldPassword.length > 10) {
        errors.oldPassword = "Пароль должен содержать от 4 до 10 символов";
    }
    if (!values.password) {
        errors.password = "Обязательное поле!";
    } else if (!regex.test(values.password)) {
        errors.password = "Пароль должен иметь одну заглавную букву!";
    } else if (values.password.length < 4 || values.password.length > 10) {
        errors.password = "Пароль должен содержать от 4 до 10 символов";
    } else if (values.password !== values.confirmPassword) {
        errors.password = "Пароли должны совпадать";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Обязательное поле!";
    } else if (!regex.test(values.confirmPassword)) {
        errors.confirmPassword = "Пароль должен иметь одну заглавную букву!";
    } else if (values.confirmPassword.length < 4 || values.confirmPassword.length > 10) {
        errors.confirmPassword = "Пароль должен содержать от 4 до 10 символов";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Пароли должны совпадать";
    }
    return errors;
};

export const validateLogin = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexP = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{1,}$/
    if (!values.email) {
        errors.email = "Введите корректный email!";
    } else if (!regex.test(values.email)) {
        errors.email = "Это недопустимый формат электронной почты!";
    }
    if (!values.password) {
        errors.password = "Обязательное поле!";
    } else if (!regexP.test(values.password)) {
        errors.password = "Пароль должен иметь одну заглавную букву!";
    } else if (values.password.length < 4 || values.password.length > 10) {
        errors.password = "Пароль должен содержать от 4 до 10 символов";
    }
    return errors;
};

export const validateRegistration = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexP = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{1,}$/
    if (!values.email) {
        errors.email = "Введите корректный email!";
    } else if (!regex.test(values.email)) {
        errors.email = "Это недопустимый формат электронной почты!";
    }
    if (!values.password) {
        errors.password = "Обязательное поле!";
    } else if (!regexP.test(values.password)) {
        errors.password = "Пароль должен иметь одну заглавную букву!";
    } else if (values.password.length < 4 || values.password.length > 10) {
        errors.password = "Пароль должен содержать от 4 до 10 символов";
    } else if (values.password !== values.confirmPassword) {
        errors.password = "Пароли должны совпадать";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Обязательное поле!";
    } else if (!regexP.test(values.confirmPassword)) {
        errors.confirmPassword = "Пароль должен иметь одну заглавную букву!";
    } else if (values.confirmPassword.length < 4 || values.confirmPassword.length > 10) {
        errors.confirmPassword = "Пароль должен содержать от 4 до 10 символов";
    } else if (values.confirmPassword !== values.password) {
        errors.confirmPassword = "Пароли должны совпадать";
    }
    return errors;
};