import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import Login from "../Login"
import Register from "../Register"
import Habits from "../Habits"
import Today from "../Today"
import { UserContext, TodayContext } from "../../contexts/UserContext"

import './reset.css'
import './globals.css'

const App = () => {
    const [token, setToken] = useState('');
    const [today, setToday] = useState(0);

    return (
        <UserContext.Provider value={{token, setToken}}>
            <TodayContext.Provider value={{today, setToday}}>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<Login/>}/>
                        <Route path='/cadastro' element={<Register/>}/>
                        <Route path='/habitos' element={<Habits/>}/>
                        <Route path='/hoje' element={<Today/>}/>
                    </Routes>
                </BrowserRouter>
            </TodayContext.Provider>
        </UserContext.Provider>
    ) 
}
    

export default App