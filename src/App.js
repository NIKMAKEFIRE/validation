import React, { useState, createContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Registration from './pages/Registration'
import ChangePassword from './pages/ChangePassword'
import Main from './pages/Main'
import Navbar from './components/Navbar'
import { useSelector } from 'react-redux'
import ProtectedRoutes from './ProtectedRoutes'

export const UserContext = createContext();

const App = () => {
    const [user, setUser] = useState({ loggedIn: false });
    const state = useSelector(state => state.auth);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Navbar state={state} />
            <Routes>
                <Route element={<ProtectedRoutes />} />
                <Route path="/" element={<Registration />} />
                <Route path="/password" element={<ChangePassword />} />
                <Route path="/login" element={<Login />} />
                <Route path="/main" element={<Main />} />
            </Routes>
        </UserContext.Provider>
    )
}

export default App