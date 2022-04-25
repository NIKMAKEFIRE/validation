import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Login() {

    const [data, setData] = useState({
        login: "",
        password: "",
    })
    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector(state => state.authReducer)

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
            login: data.login,
            password: data.password,
        }
        axios.post("http://188.166.119.86:8080/api/user/pre-login/", userData).then((response) => {
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
        // navigate('/main')
    }

    const navigate = useNavigate()

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);
    const validate = (values) => {
        const errors = {};
        if (!values.login) {
            errors.login = "Обязательное поле!";
        }
        if (!values.password) {
            errors.password = "Обязательное поле!";
        } else if (values.password.length < 8) {
            errors.password = "Пароль должен содержать не менее 8 символов";
        } else if (values.password.length > 20) {
            errors.password = "Пароль не должен превышать 20 символов";
        }
        return errors;
    };

    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div>Успешный логин</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}

            <form onSubmit={handleSubmit}>
                <h1>Логин</h1>
                <div>
                    <label>Логин</label>
                    <input
                        type="text"
                        name="login"
                        placeholder="Логин"
                        value={formValues.login}
                        onChange={handleChange}
                    />
                    <p>{formErrors.login}</p>
                    <div>
                        <label>Пароль</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <button>Войти</button>
                </div>
            </form>
        </div>
    );
}

export default Login;