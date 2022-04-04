import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import styled from 'styled-components'

import { UserContext } from "../../contexts/UserContext"
import Header from "../Header"
import Footer from "../Footer"

const PrivateScreens = () => {
    const {user} = useContext(UserContext)

    if(user === null)
        return <Navigate to='/'/>

    return <>
        <Header profile={user.image}/>
        <PageContainer>
            <Outlet/>
        </PageContainer>
        <Footer/>
    </>
}

export default PrivateScreens

const PageContainer = styled.main`
    background-color: #F2F2F2;
    padding: 92px 18px 92px 18px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 100vh;

    h1 {
        color: #126BA5;
        font-size: 23px;
    }

    > p {
        margin-top: 8px;
        font-size: 18px;
        color: #666666;
        line-height: 22px;
    }

    span.selected {
        color: #8FC549
    }
`