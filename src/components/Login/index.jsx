import axios from 'axios'
import styled from 'styled-components'

import LoginForm from './LoginForm'
import logo from '../../assets/logo.svg'

const Login = () => {
    const formData = {
        input: [
            {text: 'email', value: 'email'},
            {text: 'senha', value: 'password'}
        ],
        button: 'Entrar',
        redirect: {text: 'Não tem uma conta? Cadastre-se!', value: '/cadastro'}
    }

    const loginUser = data => {
        axios
            .post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', data)
            .then(({data}) => console.log(data.token))
            .catch(response => console.log(response)) 
    }

    return <PageContainer>
        <img src={logo} alt="logo" />
        <LoginForm submit={loginUser} page={formData}/>
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

export default Login