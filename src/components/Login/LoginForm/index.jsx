import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const LoginForm = ({submit, page}) => {
    const [data, setData] = useState(null)

    const handleSubmit = event => {
        submit(data)
        event.preventDefault()
    }

    const changeData = (value, a) => {
        const newData = {...data}
        newData[a] = value
        setData(newData)
    }

    return (
        <Form>
            {page.input.map(e => <input onChange={({target}) => changeData(target.value, e.value)} type="text" placeholder={e.text}/>)}
            <button type="submit" onClick={handleSubmit}>{page.button}</button>
            <Link to={page.redirect.value}><p>{page.redirect.text}</p></Link>
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