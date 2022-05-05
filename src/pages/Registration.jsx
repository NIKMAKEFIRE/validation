import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateRegistration } from "../validate";
import { CONFIRM_PASSWORD, EMAIL, PASSWORD } from "../redux/constants/constants";
import { confirmPassword, email, password } from "../redux/actions/actions";
import {registrationUser} from "../API/api"
import { connect } from 'react-redux';

const Registration = () => {

    const state = useSelector(state => state.auth);
    const [data, setData] = useState(state)
    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handlerEmail = (e) => {
        dispatch(email(EMAIL, e.target.value));
        const { name, value } = e.target;
        setData({
            ...data,
            [e.target.name]: value
        })
        setFormValues({ ...formValues, [name]: value });
    }

    const handlerPassword = (e) => {
        dispatch(password(PASSWORD, e.target.value));
        const { name, value } = e.target;
        setData({
            ...data,
            [e.target.name]: value
        })
        setFormValues({ ...formValues, [name]: value });
    }

    const handlerConfirmPassword = (e) => {
        dispatch(confirmPassword(CONFIRM_PASSWORD, e.target.value));
        const { name, value } = e.target;
        setData({
            ...data,
            [e.target.name]: value
        })
        setFormValues({ ...formValues, [name]: value });
    }

    const navigator = () => {
        return Object.keys(formErrors).length === 0 && isSubmit ? navigate('/login') : null
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateRegistration(formValues));
        setIsSubmit(true);
        registrationUser(formValues)
        navigator()
    }

    useEffect(() => {
        console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    }, [formErrors]);

    return (
        <div className="container">
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <div className="notification">Успешная регистрация - нажмите "продолжить"</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}

            <form onSubmit={handleSubmit}>
                <h1>Регистрация</h1>
                <div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handlerEmail}
                        />
                    </div>
                    <p>{formErrors.email}</p>
                    <div>
                        <label>Пароль</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            value={formValues.password}
                            onChange={handlerPassword}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <div>
                        <label>Подтверждение пароля</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Подтверждение пароля"
                            value={formValues.confirmPassword}
                            onChange={handlerConfirmPassword}
                        />
                    </div>
                    <p>{formErrors.confirmPassword}</p>
                    <button>
                        {
                            Object.keys(formErrors).length === 0 && isSubmit
                                ? 'Продолжить'
                                : 'Зарегестрироваться'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default connect(null, { registrationUser })(Registration);