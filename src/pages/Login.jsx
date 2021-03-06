import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { validateLogin } from "../validate";
import { EMAIL, PASSWORD } from '../redux/constants/constants';
import { email, password } from '../redux/actions/actions';
import { UserContext } from "../App";
import {loginUser} from "../API/api"
import { connect } from 'react-redux';

const Login = () => {

    const state = useSelector(state => state.auth);
    const [data, setData] = useState(state)
    const [formValues, setFormValues] = useState(data);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateLogin(formValues));
        setIsSubmit(true);
        loginUser(formValues)
        navigator()
    }

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
                <div className="notification">???????????????? ?????????? - ?????????????? "????????????????????"</div>
            ) : (
                <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
            )}

            <form onSubmit={handleSubmit}>
                <h1>??????????</h1>
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
                        <label>????????????</label>
                        <input
                            type="password"
                            name={`password`}
                            placeholder="????????????"
                            value={formValues.password}
                            onChange={handlerPassword}
                        />
                    </div>
                    <p>{formErrors.password}</p>
                    {
                        Object.keys(formErrors).length === 0 && isSubmit
                            ? <button
                                onClick={() => {
                                    if (user.loggedIn) return;
                                    setUser({ loggedIn: true });

                                    if (location.state?.from) {
                                        navigate(location.state.from);
                                    }
                                }} >????????????????????</button>
                            : <button>??????????</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default connect(null, { loginUser })(Login);