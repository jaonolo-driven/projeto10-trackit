import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import Login from "../Login"
import UserContext from "../../contexts/UserContext"

import './reset.css'
import './globals.css'

const App = () => {
    const [token, setToken] = useState('');

    return (
        <UserContext.Provider value={{token, setToken}}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    ) 
}
    

export default App