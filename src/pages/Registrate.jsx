import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Registrate() {

    const [data, setData] = useState({
        username: "",
        email: "",
        password1: "",
        password2: "",
        keyword: ""
    })
    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector(state => state.authReducer)
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [e.target.name]: value
        })
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username: data.username,
            email: data.email,
            password1: data.password1,
            password2: data.password2,
            keyword: data.keyword,
        }
        axios.post("http://188.166.119.86:8080/api/user/register/", userData).then((response) => {
            console.log(response.status);
            console.log(response.data.token);
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log("server responded");
            } else if (error.request) {
                console.log("network error");
            } else {
                console.log(error);
            }
        })
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        // navigate('/confirm')
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Обязательное поле!";
        }
        if (!values.email) {
            errors.email = "Введите корректный email!";
        } else if (!regex.test(values.email)) {
            errors.email = "Это недопустимый формат электронной почты!";
        }
        if (!values.password1) {
            errors.password1 = "Обязательное поле!";
        } else if (values.password1.length < 8) {
            errors.password1 = "Пароль должен содержать не менее 8 символов";
        } else if (values.password1.length > 20) {
            errors.password1 = "Пароль не должен превышать 20 символов";
        }
        if (!values.password2) {
            errors.password2 = "Обязательное поле!";
        } else if (values.password2.length < 8) {
            errors.password2 = "Пароль должен содержать не менее 8 символов";
        } else if (values.password2.length > 20) {
            errors.password2 = "Пароль не должен превышать 20 символов";
        }
        if (!values.keyword) {
            errors.keyword = "Обязательное поле!";
        }
        return errors;
    };

    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div>Успешная регистрация</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}

            <form onSubmit={handleSubmit}>
                <h1>Форма входа</h1>
                <div>
                        <label>Имя пользователя</label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Имя пользователя"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                    <p>{formErrors.username}</p>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.email}</p>
                    <div>
                        <label>Пароль</label>
                        <input
                            type="password"
                            name="password1"
                            placeholder="Пароль"
                            value={formValues.password1}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password1}</p>
                    <div>
                        <label>Подтверждение пароля</label>
                        <input
                            type="password"
                            name="password2"
                            placeholder="Пароль"
                            value={formValues.password2}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password2}</p>
                    <div>
                        <label>Контрольное слово</label>
                        <input
                            type="text"
                            name="keyword"
                            placeholder="Контрольное слово"
                            value={formValues.keyword}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.keyword}</p>
                    <button>Зарегестрироваться</button>
                </div>
            </form>
        </div>
    );
}

export default Registrate;