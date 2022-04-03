import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LoginForm = ({submit: loginUser}) => {
    const [data, setData] = useState(null)

    const handleSubmit = event => {
        loginUser(data)
        event.preventDefault()
    }

    return (
        <Form>
            <input onChange={({target}) => setData({...data, email: target.value})} type="text" placeholder="email"/>
            <input onChange={({target}) => setData({...data, password: target.value})} type="text" placeholder="senha"/>
            <button type="submit" onClick={handleSubmit}>Entrar</button>
            <Link to="/"><p>Não tem uma conta? Cadastre-se!</p></Link>
        </Form>
    )
}

export default LoginForm

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 6px;

    input, button {
        width: 300px;
        height: 45px;
        border-radius: 5px;
        border: none;
    }

    input {
        border: solid 1px #D4D4D4;
        padding: 11px;
        font-size: 20px;
        ::placeholder {
            color: #DBDBDB;
        }
    }

    button {
        font-size: 21px;
        color: #ffffff;
        background-color: #52B6FF;
    }

    img {
        width: 180px;
    }

    p {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #52B6FF;    
    }

    a {
        :visited {
            color: #52B6FF;
        }
    }
`