import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Registrate from './pages/Registrate'
import Confirm from './pages/Confirm'
import Main from './pages/Main'

const Cont = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Registrate />} />
                <Route path="/confirm" element={<Confirm />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </>
    )
}

export default Cont