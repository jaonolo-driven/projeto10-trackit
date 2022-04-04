import axios from "axios"
import Header from "../Header"
import { useContext, useState, useEffect } from "react"
import UserContext from "../../contexts/UserContext"

import HabitsCard from "../HabitsCard"

import styled from 'styled-components'

const Habits = () => {
    const {token} = useContext(UserContext)
    const [creating, setCreating] = useState(false)
    const [habits, setHabits] = useState([])

    useEffect(() => 
        axios
            .get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', { headers: {'Authorization': `Bearer ${token.token}`}})
            .then(({data}) => setHabits(data))
            .catch(console.error)            
    )

    return  <> 
        <Header profile={token.image}/>
        <PageContainer>
            <div>
                <h1>Meus Hábitos</h1>
                <button onClick={() => setCreating(!creating)}>+</button>
            </div>
            {habits.map(e => <HabitsCard data={e}/>)}
            {creating ? <HabitsCard create={true}/> : <></>}
            {habits ?
                <p>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </p>
            : <></>}
        </PageContainer>
    </>
}

const PageContainer = styled.main`
    background-color: #F2F2F2;
    padding: 92px 18px 22px 18px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 100vh;

    h1 {
        color: #126BA5;
        font-size: 23px;
    }

    > div {
        display: flex;
        width: 100%;
        justify-content: space-between;

        > button {
            padding: 0 12px;
            background-color: #52B6FF;
            border: none;
            border-radius: 5px;
            color: white;
        }
    }

    > p {
        margin-top: 8px;
        font-size: 18px;
        color: #666666;
        line-height: 22px;
    } 
`

export default Habits