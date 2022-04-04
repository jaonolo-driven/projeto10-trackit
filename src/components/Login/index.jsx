import axios from 'axios'
import styled from 'styled-components'

import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

import LoginForm from './LoginForm'
import logo from '../../assets/logo.svg'

const Login = () => {
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)

    const {setUser} = useContext(UserContext)

    const formData = {
        input: [
            {text: 'email', value: 'email'},
            {text: 'senha', value: 'password'}
        ],
        button: 'Entrar',
        redirect: {text: 'Não tem uma conta? Cadastre-se!', value: '/cadastro'}
    }

    const loginUser = data => {
        setUpdate(true)
        axios
            .post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', data)
            .then(({data}) => {
                setUser(data)
                localStorage.setItem("user", JSON.stringify(data))
                navigate('/habitos')
            })
            .catch(response => {
                alert(response)
                setUpdate(false)
            }) 
    }

    return <PageContainer>
        <img src={logo} alt="logo" />
        <LoginForm submit={loginUser} page={formData} update={update}/>
    </PageContainer>
}

const PageContainer = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 32px;
    padding-top: 68px;
`

export default Login