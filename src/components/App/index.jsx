import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import Login from "../Login"
import Register from "../Register"
import Habits from "../Habits"
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
                    <Route path='/cadastro' element={<Register/>}/>
                    <Route path='/habitos' element={<Habits/>}/>
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    ) 
}
    

export default App