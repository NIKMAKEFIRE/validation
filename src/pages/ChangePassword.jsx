import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validatePassword } from "../validate"
import { CONFIRM_PASSWORD, OLD_PASSWORD, PASSWORD } from "../redux/constants/constants";
import { confirmPassword, oldPassword, password } from "../redux/actions/actions";
import {passwordChangeUser} from "../API/api"
import { connect } from 'react-redux';

const ChangePassword = () => {

    const state = useSelector(state => state.auth);
    const [data, setData] = useState(state)
    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handlerOldPassword = (e) => {
        dispatch(oldPassword(OLD_PASSWORD, e.target.value));
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validatePassword(formValues));
        passwordChangeUser(formValues)
        setIsSubmit(true);
        navigator()
    }

    const navigator = () => {
        return Object.keys(formErrors).length === 0 && isSubmit ? navigate('/main') : null
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
                <div className="notification">???????????????? ?????????? ???????????? - ?????????????? "????????????????????"</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}

            <form onSubmit={handleSubmit}>
                <h1>?????????????? ????????????</h1>
                <div>
                    <label>???????????? ????????????</label>
                    <input
                        type="text"
                        name="oldPassword"
                        placeholder="???????????? ????????????"
                        value={formValues.oldPassword}
                        onChange={handlerOldPassword}
                    />
                    <p>{formErrors.oldPassword}</p>
                    <div>
                        <label>?????????? ????????????</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="?????????? ????????????"
                            value={formValues.password}
                            onChange={handlerPassword}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    <div>
                        <label>?????????????????????????? ????????????</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="?????????????????????????? ????????????"
                            value={formValues.confirmPassword}
                            onChange={handlerConfirmPassword}
                        />
                    </div>
                    <p>{formErrors.confirmPassword}</p>
                    <button>
                        {
                            Object.keys(formErrors).length === 0 && isSubmit
                                ? '????????????????????'
                                : '??????????????????'
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default connect(null, { passwordChangeUser })(ChangePassword);