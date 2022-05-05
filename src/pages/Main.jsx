import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Main = () => {
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserContext);
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Вы вошли в аккаунт</h1>
            <button
                onClick={() => {
                    if (!user.loggedIn) return;
                    setUser({ loggedIn: false });
                    navigate('/login')
                }}>Выйти из аккаунта</button>
            <button style={{ marginLeft: '10px' }} onClick={() => navigate('/password')}>Сменить пароль</button>
        </div>
    )
}

export default Main