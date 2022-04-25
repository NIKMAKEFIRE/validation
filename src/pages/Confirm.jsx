import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti'
import { useDispatch, useSelector } from "react-redux";

function Confirm() {
    const [success, setSuccess] = useState(false);
    const [data, setData] = useState({
        code: "",
        email: "",
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
            code: data.code,
            email: data.email,
        }
        axios.post("http://188.166.119.86:8080/api/user/login/", userData).then((response) => {
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
        // navigate('/login')
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            errors.email = "Введите корректный email!";
        } else if (!regex.test(values.email)) {
            errors.email = "Это недопустимый формат электронной почты!";
        }
        if (!values.code) {
            errors.code = "Обязательное поле!";
        }
        return errors;
    };

    if (success) {
        return <Confetti />
    }

    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div>Успешная валидация</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}

            <form onSubmit={handleSubmit}>
                <h1>Форма входа</h1>
                <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                    <p>{formErrors.email}</p>
                    <div>
                        <label>Код подтверждения</label>
                        <input
                            type="text"
                            name="code"
                            placeholder="Код подтверждения"
                            value={formValues.code}
                            onChange={handleChange}
                        />
                    </div>
                    <p>{formErrors.code}</p>
                    <button>Отправить</button>
                </div>
            </form>
        </div>
    );
}

export default Confirm