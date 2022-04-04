import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import styled from 'styled-components'

import { UserContext } from "../../contexts/UserContext"

const PublicScreens = () => {
    const {user} = useContext(UserContext)

    if(user !== null)
        return <Navigate to='/habitos'/>

    return <>
        <PageContainer>
            <Outlet/>
        </PageContainer>
    </>
}

export default PublicScreens

const PageContainer = styled.main`
`