import React from 'react'
import { useNavigate } from "react-router-dom";

const Main = () => {
    const navigate = useNavigate()
    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <button onClick={() => navigate('/login')}>Логин</button>
            <button style={{ marginLeft: '10px' }} onClick={() => navigate('/')}>Регистрация</button>
        </div>
    )
}

export default Main