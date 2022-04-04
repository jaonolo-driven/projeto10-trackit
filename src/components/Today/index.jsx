import axios from "axios"
import Header from "../Header"
import Footer from "../Footer"
import { useContext, useState, useEffect } from "react"
import UserContext from "../../contexts/UserContext"

import styled from 'styled-components'
import TodayCard from "../TodayCard"

const Today = () => {
    const {token} = useContext(UserContext)
    const [habits, setHabits] = useState([])

    const queryHabits = () => 
        axios
            .get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', { headers: {'Authorization': `Bearer ${token.token}`}})
            .then(({data}) => setHabits(data))
            .catch(console.error)

    useEffect(queryHabits, [])

    const todayDate = new Date()
    const weekday = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const completed = habits.filter(e => e.done).length

    return <> 
        <Header profile={token.image}/>
        <PageContainer>
            <div>
                <h1>{weekday[todayDate.getDay()]}, {`${todayDate.getDate()}`.padStart(2, '0')}/{`${todayDate.getMonth()}`.padStart(2, '0')}</h1>
                {habits.length !== 0 ? <h2>
                    {completed === 0 ? 'Nenhum hábito concluído ainda' : <span className='selected'>{(completed/habits.length)*100}% dos hábitos concluídos</span>}
                </h2> : <></>}
            </div>
            {habits.map(e => <TodayCard queryHabits={queryHabits} data={e}/>)}
            {habits.length === 0 ?
                <p>
                    Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
                </p>
            : <></>}
        </PageContainer>
        <Footer/>
    </>
}

const PageContainer = styled.main`
    background-color: #F2F2F2;
    padding: 92px 18px 92px 18px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 100vh;

    span.selected {
        color: #8FC549
    }

    h1 {
        color: #126BA5;
        font-size: 23px;
    }

    > div {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-direction: column;
        gap: 6px
    }

    > p {
        margin-top: 8px;
        font-size: 18px;
        color: #666666;
        line-height: 22px;
    } 
`

export default Today