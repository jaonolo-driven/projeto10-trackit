import axios from 'axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import LoginForm from '../Login/LoginForm'
import logo from '../../assets/logo.svg'

const Register = () => {
    const navigate = useNavigate()

    const formData = {
        input: [
            {text: 'email', value: 'email'},
            {text: 'senha', value: 'password'},
            {text: 'nome', value: 'name'},
            {text: 'foto', value: 'image'}
        ],
        button: 'Cadastrar',
        redirect: {text: 'Já tem uma conta? Faça login!', value: '/'}
    }

    const registerUser = data => {
        axios
            .post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', data)
            .then(() => {
                alert('Usuário criado com sucesso!')
                navigate('/')
            })
            .catch(response => console.log(response)) 
    }

    return <PageContainer>
        <img src={logo} alt="logo" />
        <LoginForm submit={registerUser} page={formData}/>
    </PageContainer>
}

const PageContainer = styled.main`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 32px;
    padding-top: 68px
`

export default Register