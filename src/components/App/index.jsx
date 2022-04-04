import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from 'react'
import Login from "../Login"
import Register from "../Register"
import Habits from "../Habits"
import Today from "../Today"
import PrivateScreens from "../PrivateScreens"
import PublicScreens from "../PublicScreens"
import { UserContext, TodayContext } from "../../contexts/UserContext"

import './reset.css'
import './globals.css'

const App = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [today, setToday] = useState(0);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <TodayContext.Provider value={{today, setToday}}>
                <BrowserRouter>
                    <Routes>
                        <Route element={<PublicScreens/>} >
                            <Route path='/' element={<Login/>}/>
                            <Route path='/cadastro' element={<Register/>}/>
                        </Route>
                        <Route element={<PrivateScreens/>} >
                            <Route path='/habitos' element={<Habits/>}/>
                            <Route path='/hoje' element={<Today/>}/>
                            <Route path='/historico' element={<p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>}/>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </TodayContext.Provider>
        </UserContext.Provider>
    ) 
}
    

export default App